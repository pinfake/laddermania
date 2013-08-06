if (Meteor.isClient) {
    Template.dash.currentLadder = function () {
        var current = Session.get('currentLadder');
        return( current );
    }

    Template.ladderMain.currentLadder = function () {
        var current = Session.get('currentLadder');
        return( current );
    }

    Template.ladderPositions.ladderPlayers = function () {
        var players = LadderPlayers.find({ladderId: Session.get('currentLadder')._id }, {sort: {score: -1}});
        if (players.count() < 1) return false;
        var ret = [];
        var position = 1;
        players.forEach(function (player) {
            var pInfo = Players.findOne({ _id: player.playerId }, 'nickname');
            ret.push({ playerId: player.playerId, nickname: pInfo.nickname, score: player.score, position: position++ });
        });
        return( ret );
    };

    Template.modalLadderAddPlayer.players = function () {
        var players = Players.find({}, {sort: {nickname: 1}});
        if (players.count() < 1) return false;
        return( players );
    };

    Template.modalLadderAddPlayer.events = ({
        'click #addPlayerButton': function () {
            var players = $('#playersInput').select2("val");
            for (var i = 0; i < players.length; i++) {
                LadderPlayers.insert({
                    ladderId: Session.get('currentLadder')._id,
                    playerId: players[i],
                    score: 0 });
            }
        }
    });

    Template.ladderPositions.rendered = function () {
        $("span.badge[data-position='1']").addClass('badge-important');
        $("span.badge[data-position='2']").addClass('badge-warning');
        $("span.badge[data-position='3']").addClass('badge-info');
    }

    Template.modalLadderAddPlayer.rendered = function () {
        $("#playersInput").select2({
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