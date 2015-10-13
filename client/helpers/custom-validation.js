$.validator.addMethod( 'teamExists', function ( value ) {
  var formatted = formatSlug( value );
  var unique    = Teams.findOne( {
    'slug': formatted
    }, {
      fields: {
        'slug': 1
      }
    } );
    return unique ? false : true;
} );

