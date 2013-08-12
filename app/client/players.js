if( Meteor.isClient ) {
    Template.players.players = function () {
        var players = Players.find({}, {sort: {nickname: 1}});
        if (players.count() < 1) return false;
        return( players );
    };

    Template.newPlayerModal.events({
        'click #newPlayerButton': function () {
            var validationObject = Mesosphere.newPlayerForm.validate($('#newPlayerForm').serializeArray());
            console.log( validationObject );
            if( validationObject.errors ) return;
            $('#newPlayerModal').modal('hide');
            Players.insert({nickname: validationObject.formData.nickname});
        }
    });

    Template.player.events({
        'click .removePlayer': function (event) {
            var element = event.currentTarget;
            var id = $(element).attr('data-id');

            Players.remove({ _id: id });
        }
    });
}