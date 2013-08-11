if (Meteor.isClient) {
    Template.newLadderModal.events({
        'click #newLadderButton': function () {
            var name = $('#newLadderForm #name').val();
            var id = Ladders.insert({name: name});
            var current = Ladders.findOne({_id: id});
            Session.set('currentLadder', current);
            Users.update({ _id: Session.get('user')._id },
                { $set: {
                    currentLadder: id
                }}
            );
            Scores.insert({_id: id});
        }
    });

    Template.ladders.ladders = function () {
        var ladders = Ladders.find({}, {sort: {name: 1}});
        if (ladders.count() < 1) return false;
        //var sel = ladders.find({_id: Session.get('currentLadder')._id });
        return( ladders );
    };

    Template.ladders.rendered = function () {
        $("tr.selectLadder[data-id='" + Session.get('currentLadder')._id + "']").addClass('success');
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
            var currentLadder = Ladders.findOne({_id: id});
            $("tr.selectLadder[data-id='" + Session.get('currentLadder')._id + "']").removeClass('success');
            Session.set('currentLadder', currentLadder);
            Users.update({ _id: Session.get('user')._id },
                { $set: {
                    currentLadder: id
                }}
            );
            $("tr.selectLadder[data-id='" + Session.get('currentLadder')._id + "']").addClass('success');
        }
    });
}
