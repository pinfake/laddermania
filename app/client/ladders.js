if (Meteor.isClient) {
    Template.newLadderModal.events({
        'click #newLadderButton': function () {
            console.log($('#newLadderForm').serializeArray());
            var validationObject = Mesosphere.newLadderForm.validate($('#newLadderForm').serializeArray());
            console.log( validationObject );
            if( validationObject.errors ) return;
            $('#newLadderModal').modal('hide');
            var id = Ladders.insert({
                userId: Meteor.userId(),
                name: validationObject.formData.name,
                description: validationObject.formData.description,
                game: validationObject.formData.game
            });
            Meteor.users.update( Meteor.userId(), {
                $set: {
                    "profile.currentLadder": id
                }
            });
            Scores.insert({_id: id});
            Session.set( 'section', 'dash' );
        }
    });

    Template.newLadderModal.rendered = function() {
        $("#newLadderForm #game").select2({
            minimumInputLength: 2,
            width: 'off',
            placeholder: "Choose a game...",
            query: function (query) {
                var found = Games.find({
                    userId: Meteor.userId(),
                    name: { $regex: query.term, $options: 'i' } }).fetch();
                var data = {results: []}
                for (i = 0; i < found.length; i++) {
                    data.results.push({id: found[i]._id, text: found[i].name});
                }
                query.callback(data);
            }
        });
    }

    Template.ladders.ladders = function () {
        var ladders = Ladders.find({userId: Meteor.userId()}, {sort: {name: 1}});
        if (ladders.count() < 1) return false;
        return( ladders );
    };

    Template.ladders.rendered = function () {
        $("tr.selectLadder[data-id='" + Meteor.user().profile.currentLadder + "']").addClass('success');
    }

    Template.ladder.events({
        'click .removeLadder': function (event) {
            var element = event.currentTarget;
            console.log("Deleting ladder: ");
            console.log($(element));
            console.log($(element).attr('data-id'));

            var id = $(element).attr('data-id');

            Ladders.remove({ _id: id });
            Scores.remove({ ladderId: id });
        },
        'click tr.selectLadder': function (event) {
            if ($(event.target).is('i')) return;
            var element = event.currentTarget;
            var id = $(element).attr('data-id');
            $("tr.selectLadder[data-id='" + Meteor.user().profile.currentLadder + "']").removeClass('success');

            Meteor.users.update( Meteor.userId(), {
                $set: {
                    "profile.currentLadder": id
                }
            });

            $("tr.selectLadder[data-id='" + id + "']").addClass('success');
            Session.set( 'section', 'dash' );
        }
    });
}
