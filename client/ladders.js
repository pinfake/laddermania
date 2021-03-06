if (Meteor.isClient) {
    Meteor.subscribe("ladders");

    Template.newLadderModal.events({
        'click #newLadderButton': function () {
            var formData = $('#newLadderForm').serializeArray();
            var validationObject = Mesosphere.newLadderForm.validate(formData);
            if (validationObject.errors) return;
            $('#newLadderModal').modal('hide');
            Meteor.call('addLadder', formData, function (error, result) {
                if (!error) {
                    Meteor.call('selectLadder', result);
                    Session.set('section', 'dash');
                    Meteor.subscribe("scores", result);
                }
            });
        }
    });

    Template.newLadderModal.rendered = function () {
        $('#newLadderForm #game').select2({
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
    };

    Template.ladders.ladders = function () {
        var ladders = Ladders.find({});
        if (ladders.count() < 1) return false;
        return( ladders );
    };

    Template.ladders.rendered = function () {
        $("tr.selectLadder[data-id='" + Meteor.user().profile.currentLadder + "']").addClass('success');
    }

    Template.ladder.events({
        'click .removeLadder': function (event) {
            var id = $(event.currentTarget).attr('data-id');
            bootbox.dialog({
                message: "<p>Removing a ladder will destroy all associated settings, matches, positions, etc.</p>\n"+
                         "<p>Are you sure you want to do this?</p>",
                title: "Warning!!!",
                buttons: {
                    cancel: {
                        label: "Cancel",
                        className: "btn"
                    },
                    ok: {
                        label: "Ok",
                        className: "btn-danger",
                        callback: function() {
                            console.log( 'id vale ' );
                            console.log( id );
                            Meteor.call('removeLadder', id);
                        }
                    }
                }
            });
        },
        'click tr.selectLadder': function (event) {
            if ($(event.target).is('i')) return;
            var element = event.currentTarget;
            var id = $(element).attr('data-id');

            Meteor.call('selectLadder', id);
            $("tr.selectLadder[data-id='" + Meteor.user().profile.currentLadder + "']").removeClass('success');
            Meteor.subscribe("scores", id);
            $("tr.selectLadder[data-id='" + id + "']").addClass('success');
            Session.set('section', 'dash');

        }
    });
}
