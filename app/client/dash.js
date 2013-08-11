if (Meteor.isClient) {
    Template.dash.currentLadder = function () {
        var current = Session.get('currentLadder');
        return( current );
    }

    Template.ladderMain.currentLadder = function () {
        var current = Session.get('currentLadder');
        return( current );
    }

    Template.ladderMain.rendered = function () {
    }

    Template.ladderPositions.scores = function () {
        var scores = Scores.findOne({_id: Session.get('currentLadder')._id });
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
                        _id: Session.get('currentLadder')._id
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
        }
    });

    Template.ladderPositions.rendered = function () {
        $("span.badge[data-position='1']").addClass('badge-important');
        $("span.badge[data-position='2']").addClass('badge-warning');
        $("span.badge[data-position='3']").addClass('badge-info');
    }

    Template.modalLadderAddPlayer.rendered = function () {
        console.log($("#newLadderPlayerForm #playersInput"));
        $("#newLadderPlayerForm #playersInput").select2({
            multiple: true,
            minimumInputLength: 2,
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