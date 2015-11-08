API = {
  authentication: function( apiKey ) {
    var getUser = APIKeys.findOne( { "key": apiKey }, { fields: { "owner": 1 } } ); // we pass a fields projection to get just the owner
    // does our API key exist?
    if ( getUser ) { // findOne doesn't return as undefined but rather as an object, we then return the owner field
      // it does exist, grab the owner of it
      return getUser.owner;
    } else {
      // if API key doens't exist, return false
      return false;
    }
  },
  connection: function( request ) {
    var getRequestContents = API.utility.getRequestContents( request ),
        apiKey             = getRequestContents.api_key,
        validUser          = API.authentication( apiKey );

    if ( validUser ) {
      delete getRequestContents.api_key;
      return { 
        owner: validUser, 
        data: getRequestContents 
      };
    } else {
      return {
        error: 401,
        message: "Invalid API key."
      };
    }
  },
  handleRequest: function( context, resource, method ) {
    var connection = API.connection( context.request );
    if ( !connection.error ) {
      // We use bracket notation to allow for variable object/method names
      // like API.methods.pizza.GET( context, connection );
      // or   API.methods.tacos.PUT( context, connection );
      API.methods[ resource ][ method ]( context, connection );
    } else {
      API.utility.response( context, 401, connection );
    }
  },
  methods: {
    pizza: {
      GET: function( context, connection ) {
        // hasData() - designed to help us figure out whether or not our user's request has any data associated with it
        // why do we care? - we need to know what type of response to give
        // with GET request we have TWO outcomes
        //  1) returning a specific piece of data
        //  2) returning a collection of data
        var hasQuery = API.utility.hasData( connection.data );

        if ( hasQuery ) {
          connection.data.owner = connection.owner;
          // Next, we fetch() the result of that query (turn it into an array)
          var getPizzas = Pizza.find( connection.data ).fetch();
          // does the array have any items?
          if ( getPizzas.length > 0 ) {
            // yes! we found something
            // return 200 status code (success)
            // and return our found array of pizza
            // our response method will convert that array of objects into a JSON string (using JSON.stringify)
            API.utility.response( context, 200, getPizzas );
          } else {
            // nothing found so return status code of 404 (not found)
            API.utility.response( context, 404, { error: 404, message: "No pizzas found, dude." } );
          }
        } else {
          // we have no parameters, so we just pass the owner and if he has any pizzas we return them all
          var getPizzas = Pizza.find( { "owner": connection.owner } ).fetch();
          API.utility.response( context, 200, getPizzas );
        }
      },
      POST: function( context, connection ) {
        var hasData     = API.utility.hasData( connection.data ),
            validData   = API.utility.validate( connection.data, { "name": String, "crust": String, "toppings": [ String ] } );
            // a toppings parameter with a type of Array that contains Strings
        
        // do we have data and is that data valid? 
        if ( hasData && validData ) {
          connection.data.owner = connection.owner;
          // insert the data
          var pizza = Pizza.insert( connection.data );
          // send back a postive message
          API.utility.response( context, 200, { "_id": pizza, "message": "Pizza successfully created!" } );
        } else {
          // no validated data so return 'forbidden' 403 status code
          API.utility.response( context, 403, { error: 403, message: "POST calls must have a name, crust, and toppings passed in the request body in the correct formats."} );
        }
      },
      PUT: function( context, connection ) {
        var hasQuery   = API.utility.hasData( connection.data ),
            validData  = API.utility.validate( connection.data, Match.OneOf(
              { "_id": String, "name": String },
              { "_id": String, "crust": String },
              { "_id": String, "toppings": [ String ] },
              { "_id": String, "name": String, "crust": String },
              { "_id": String, "name": String, "toppings": [ String ] },
              { "_id": String, "crust": String, "toppings": [ String ] },
              { "_id": String, "name": String, "crust": String, "toppings": [ String ] }
            ));
            // we need to pass all of the different variations of objects we might get from our user

      if ( hasQuery && validData ) {
        var pizzaId = connection.data._id;
        delete connection.data._id;

        var getPizza = Pizza.findOne( { "_id": pizzaId }, { fields: { "_id": 1 } });

        if ( getPizza ) {
          Pizza.update( { "_id": pizzaId }, { $set: connection.data } );
          API.utility.response( context, 200, { "message": "Pizza successfully updated" } );
        } else {
          API.utility.response( context, 404, { "message": "Can't update a non-existent pizza, homeslice." } );
        }
      } else {
        API.utility.response( context, 403, { error: 403, message: "PUT calls must have a pizza ID and at lease a name, crust, or toppings passed in the request body in the correct formats (String, String, Array)." } );
      }
    },
      DELETE: function( context, connection ) {
        var hasQuery   = API.utility.hasData( connection.data ),
            validData  = API.utility.validate( connection.data, { "_id": String } );

        if ( hasQuery && validData ) {
          var pizzaId    = connection.data._id;
          var getPizza   = Pizza.findOne( { "_id": pizzaId }, { fields: { "_id": 1 } } );

          if ( getPizza ) {
            Pizza.remove( { "_id": pizzaId } );
            API.utility.response( context, 200, { "message": "Pizza removed" } );
          } else {
            API.utility.response( context, 404, { "message": "Can't delete a non-existent pizza, homeslice" } );
          }
        } else {
          API.utility.response( context, 403, { error: 403, message: "DELETE calls must have an _id (and only an _id) in the request body in the correct format (String)." } );
        }
      }
    }
  },
  resources: {},
  utility: {
    getRequestContents: function( request ) {
      switch( request.method ) {
        case "GET":
          // GET requests are expected to pass data in the query object
          return request.query;
        // POST, PUT, and DELETE are expected to pass data in the body object.
        case "POST":
        case "PUT":
        case "DELETE":
          return request.body;
      }
    },
    hasData: function( data ) {
      return Object.keys( data ).length > 0 ? true : false;
    },
    response: function( context, statusCode, data ) {
      context.response.setHeader( 'Content-Type', 'application/json' );
      context.response.statusCode = statusCode;
      context.response.end( JSON.stringify( data ) ); // converts a JavaScript value to a JSON string
    },
    validate: function( data, pattern ) {
      // similar to check() with 1 difference
      // instead of throwing an error and halting operations on the server
      //  it just returns true or false
      // we don't want to use check() because we could be handling lots of requests because check() could break the API for everyone else
      // Match.test() lets us handle each validation and response to that validation independently
      return Match.test( data, pattern );
    }
  }
};
