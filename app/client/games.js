if (Meteor.isClient) {
    Template.newGameModal.events({
        'click #newGameButton': function () {
            var validationObject = Mesosphere.newGameForm.validate($('#newGameForm').serializeArray());
            console.log( validationObject );
            if( validationObject.errors ) return;
            $('#newGameModal').modal('hide');
            var name = validationObject.formData.name;
            var id = Games.insert({
                userId: Meteor.userId(),
                name: name
            });
        }
    });

    Template.newGameModal.rendered = function() {
    }

    Template.games.games = function () {
        var games = Games.find({userId: Meteor.userId()}, {sort: {name: 1}});
        if (games.count() < 1) return false;
        return( games );
    };

    Template.game.events({
        'click .removeGame': function (event) {
            var element = event.currentTarget;
            console.log("Deleting game: ");
            console.log($(element));
            console.log($(element).attr('data-id'));

            var id = $(element).attr('data-id');

            Games.remove({ _id: id });
        }
    });
}
