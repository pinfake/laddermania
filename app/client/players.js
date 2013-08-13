if( Meteor.isClient ) {

    console.log( Belt.Gravatar.urlFromEmail('imota@antevenio.com') );

    Template.players.players = function () {
        var players = Players.find({userId: Meteor.userId()}, {sort: {nickname: 1}});
        if (players.count() < 1) return false;
        return( players );
    };

    Template.newPlayerModal.events({
        'click #newPlayerButton': function () {
            var validationObject = Mesosphere.newPlayerForm.validate($('#newPlayerForm').serializeArray());
            console.log( validationObject );
            if( validationObject.errors ) return;
            $('#newPlayerModal').modal('hide');
            Players.insert({
                userId: Meteor.userId(),
                nickname: validationObject.formData.nickname,
                email: validationObject.formData.email
            });
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