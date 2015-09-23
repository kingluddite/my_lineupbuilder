Template.FieldList.rendered = function() {
  $('.draggable').draggable();
  $('.droppable').droppable({
    // drop: function(event, ui) {
    //   $(this)
    //     .addClass('ui-state-highlight')
    //     .find('p')
    //     .html('dropped');
    //   console.log(ui);
    // }

  });
};

Template.FieldList.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cGame: function() {
    if (Meteor.user()) {
      return Games.findOne({
        _id: Session.get('sGameId')
      });
    }
  }
});
