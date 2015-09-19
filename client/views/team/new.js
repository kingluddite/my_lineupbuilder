Template.tAddTeam.rendered = function() {

}

Template.tAddTeam.helpers({
    checkIfTeamExists: function() {
        if (Meteor.user()) {
            var team = Teams.find({
                createdBy: Meteor.user()._id
            }).count();
            if (team > 0) {
                return true;
            } else {
                return false;
            }
        }
    }
});

Template.tAddTeam.events({

    'submit form#addTeamForm': function(evt) {
        evt.preventDefault();

        var team = {
            teamName: $(evt.target).find('[name=teamName]').val(),
            coachName: $(evt.target).find('[name=coachName]').val(),
            coachEmail: $(evt.target).find('[name=coachEmail]').val(),
            leagueName: $(evt.target).find('[name=leagueName]').val(),
            logoUrl: $(evt.target).find('[name=logoUrl]').val(),
            homeJerseyColor: $(evt.target).find('[name=homeJerseyColor]').val(),
            awayJerseyColor: $(evt.target).find('[name=awayJerseyColor]').val()
        };

        Meteor.call('addTeam', team, function(error, id) {
            if (error) {
                return alert(error.reason);
            }
        });
    }
});
