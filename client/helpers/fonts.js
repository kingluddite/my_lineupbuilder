/* connect google fonts to Meteor */
Meteor.startup(function() {

  WebFontConfig = {
    // google: { families: [ 'Roboto Slab:700,400:latin', 'Oswald:400', 'Mouse Memoirs' ] }
    google: { families: [ 'Roboto Slab:700,400:latin', 'Open Sans' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
    //console.log("async fonts loaded", WebFontConfig);
  })();

})
