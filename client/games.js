if (Meteor.isClient) {
    Meteor.subscribe( "games" );

    Template.newGameModal.events({
        'click #newGameButton': function () {
            var formData = $('#newGameForm').serializeArray();
            var validationObject = Mesosphere.newGameForm.validate(formData);
            if( validationObject.errors ) return;
            Meteor.call( 'addGame', formData);
            $('#newGameModal').modal('hide');
        }
    });

    Template.newGameModal.rendered = function() {
    }

    Template.games.games = function () {
        var games = Games.find({});
        if (games.count() < 1) return false;
        return( games );
    };

    Template.game.events({
        'click .removeGame': function (event) {
            var element = event.currentTarget;
            var id = $(element).attr('data-id');
            Meteor.call( 'removeGame', id );
        }
    });
}
