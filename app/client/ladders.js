if (Meteor.isClient) {
    Template.newLadderModal.events({
        'click #newLadderButton': function () {
            var name = $('#newLadderForm #name').val();
            var id = Ladders.insert({name: name});
            Meteor.users.update( Meteor.userId(), {
                $set: {
                    "profile.currentLadder": id
                }
            });
            Scores.insert({_id: id});
        }
    });

    Template.ladders.ladders = function () {
        var ladders = Ladders.find({}, {sort: {name: 1}});
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
        }
    });
}
