if( Meteor.isClient ) {

    //console.log( Belt.Gravatar.urlFromEmail('imota@antevenio.com') );
    Meteor.subscribe( "players" );

    Template.players.players = function () {
        var players = Players.find({});
        if (players.count() < 1) return false;
        return( players );
    };

    Template.newPlayerModal.events({
        'click #newPlayerButton': function () {
            var formData = $('#newPlayerForm').serializeArray();
            var validationObject = Mesosphere.newPlayerForm.validate(formData);
            if( validationObject.errors ) return;
            Meteor.call( 'addPlayer', formData );
            $('#newPlayerModal').modal('hide');
        }
    });

    Template.player.events({
        'click .removePlayer': function (event) {
            var element = event.currentTarget;
            var id = $(element).attr('data-id');
            Meteor.call( 'removePlayer', id );
        }
    });
}