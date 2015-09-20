Template.tAddGame.rendered = function() {
    // $('#gameDatePicker').datepicker();
    this.$('.date-picker').datetimepicker();
    this.$('.time-picker').datetimepicker({
        format: 'LT'
    });
};



Template.tAddGame.helpers({
    checkIfGameExists: function() {
        if (Meteor.user()) {
            var game = Games.find({
                createdBy: Meteor.user()._id
            }).count();
            if (game > 0) {
                return true;
            } else {
                return false;
            }
        }
    }
});

Template.tAddGame.events({

    'submit form#addGameInfoForm': function(evt) {
        evt.preventDefault();

        var game = {
            gameDate: $(evt.target).find('[name=gameDate]').val(),
            gameTime: $(evt.target).find('[name=gameTime]').val(),
            opponentName: $(evt.target).find('[name=opponentName]').val(),
            fieldName: $(evt.target).find('[name=fieldName]').val(),
            directionsUrl: $(evt.target).find('[name=directionsUrl]').val()
        };

        Meteor.call('addGameInfo', game, function(error, id) {
            if (error) {
                return alert(error.reason);
            }
            $('.game-created').html('<i class="fa fa-check"></i> <span> Game Created</span>');
            $('.game-created span').css('text-decoration', 'line-through');
            $('.game-created').addClass('text-muted');
        });
    }
});
