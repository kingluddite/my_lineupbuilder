// use iron-router server side routing
// first, pass the url where our resource will be accessible at
// callback function called whenever our route is visited
// options parameter pointing the 'where' to server
//  we now have access to Node's request and response methods
//  what we'll use to communicate with HTTP requests
//  request (what we receive)
//  response (what we send back)
Router.route( '/api/v1/pizza', function() {
  // rule says from which domains a request is allowed to come from
  // we say * which means, we accept requests from everywhere
  this.response.setHeader( 'Access-Control-Allow-Origin', '*' );

  if ( this.request.method === "OPTIONS" ) {
    // let our request know which HTTP headers are safe to send with the request
    this.response.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
    // let our request know which type of HTTP requests we allow
    this.response.setHeader( 'Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS' );
    // End the response to the OPTIONS request passing an arbitrary message
    this.response.end( 'Set OPTIONS.' );
  } else {
    // like the post office clerk sorting mail
    //  who puts the letters (requests) into the right mailboxes (methods)
    // we pass 3 arguments (context, resource, method)
    API.handleRequest( this, 'pizza', this.request.method );
  }

}, { where: 'server' } );
