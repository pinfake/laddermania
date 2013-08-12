if (Meteor.isClient) {
    Template.dash.currentLadder = function () {
        return Meteor.user().profile.currentLadder;
    }

    Template.ladderMain.currentLadder = function () {
        return Ladders.findOne({ _id: Meteor.user().profile.currentLadder });
    }

    Template.ladderMain.rendered = function () {
    }

    Template.ladderPositions.scores = function () {
        var scores = Scores.findOne({_id: Meteor.user().profile.currentLadder });
        console.log(scores);

        if (scores == undefined) return false;
        if (scores.players == undefined || scores.players.length < 1) return false;

        scores.players.sort(function (a, b) {
            if (a.score > b.score) return -1;
            if (a.score < b.score) return 1;
            if (a.nickname > b.nickname) return 1;
            if (a.nickname < b.nickname) return -1;
            return 0;
        });

        for (var i = 0; i < scores.players.length; i++) {
            scores.players[i].position = i + 1;
        }

        return scores.players;
    };

    Template.modalLadderAddPlayer.players = function () {
        var players = Players.find({}, {sort: {nickname: 1}});
        if (players.count() < 1) return false;
        return( players );
    };

    Template.modalLadderAddPlayer.events = ({
        'click #addPlayerButton': function () {
            var playerIds = $('#playersInput').select2("val");
            for (var i = 0; i < playerIds.length; i++) {
                var player = Players.findOne({_id: playerIds[i]});
                Scores.update(
                    {
                        _id: Meteor.user().profile.currentLadder
                    },
                    { $push: {
                        players: { id: player._id, nickname: player.nickname, score: 0 }
                    }
                    }
                );
            }
            // This is hack to prevent select2 to become zombie when
            // this event is fired by an enter keypress
            $('#playersInput').select2("val", null);
            $('#playersInput').select2("enable", false);
            $('#playersInput').select2("enable", true);
        },
        'click #insertPlayerButton': function () {

            $('#playersInput').select2("val", null);
            $('#playersInput').select2("enable", false);
            $('#playersInput').select2("enable", true);
            $('#newPlayerModal').modal('show');
        }
    });

    Template.ladderPositions.rendered = function () {
        $("span.badge[data-position='1']").addClass('badge-important');
        $("span.badge[data-position='2']").addClass('badge-warning');
        $("span.badge[data-position='3']").addClass('badge-info');
    }

    Template.modalLadderAddPlayer.rendered = function () {
        $("#newLadderPlayerForm #playersInput").select2({
            multiple: true,
            minimumInputLength: 2,
            placeholder: "Enter nicknames here...",
            query: function (query) {
                var found = Players.find({ nickname: { $regex: query.term, $options: 'i' } }).fetch();
                var data = {results: []}
                for (i = 0; i < found.length; i++) {
                    data.results.push({id: found[i]._id, text: found[i].nickname});
                }
                query.callback(data);
            }
        });
    }

}