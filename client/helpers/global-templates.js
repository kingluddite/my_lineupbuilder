/*==================================================
=            Application Wide Templates            =
==================================================*/
/* apply to templates globally */

Template.body.events({
  'click .panel-heading span.clickable': function(evt) {
    // console.log('works');
    if ($(this).hasClass('panel-collapsed')) {
      // expand the panel
      $(this).parents('.panel').find('.panel-body').slideDown();
      $(this).removeClass('panel-collapsed');
      $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    } else {
      // collapse the panel
      $(this).parents('.panel').find('.panel-body').slideUp();
      $(this).addClass('panel-collapsed');
      $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    }
  }
});
