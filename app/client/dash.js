if (Meteor.isClient) {


    //var LadderPlayersFlat = new Meteor.Collection("mrLadderPlayers");


    //Meteor.subscribe("mrLadderPlayers");
    Meteor.subscribe("mrLadderPlayers", Session.get('currentLadder') != undefined ?
        Session.get('currentLadder')._id : null );

    Template.dash.currentLadder = function () {
        var current = Session.get('currentLadder');
        return( current );
    }

    Template.ladderMain.currentLadder = function () {
        var current = Session.get('currentLadder');
        return( current );
    }

    Template.ladderPositions.ladderPlayers = function () {

        console.log( 'Aqui va la movida' );

        console.log( MRLadderPlayers.find() );

        var players = MRLadderPlayers.find({});

        if (players.count() < 1) return false;
        console.log( players );
        return players;
        var ret = [];
        var position = 1;
        players.forEach(function (player) {
            var pInfo = Players.findOne({ _id: player.playerId }, 'nickname');
            ret.push({ playerId: player.playerId, nickname: pInfo.nickname, score: player.score, position: position++ });
        });
        return( ret );
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