if (Meteor.isClient) {
    Template.dash.currentLadder = function () {
        var current = Session.get('currentLadder');
        return( current );
    }

    Template.ladderMain.currentLadder = function () {
        var current = Session.get('currentLadder');
        return( current );
    }

    Template.ladderPositions.scores = function () {
        var scores = Scores.findOne({_id: Session.get('currentLadder')._id });
        if( scores.players == undefined ||scores.players.length < 1 ) return false;
        return scores.players;
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
                var player = Players.findOne( {_id: players[i]});
                console.log( "voy con un player: " );
                console.log( player );
                Scores.update(
                    {
                        _id: Session.get('currentLadder')._id
                    },
                    { $push:
                        { players:
                            {
                                $each: [ { id: player._id, nickname: player.nickname, score: 0 } ],
                                $sort: { score: -1, nickname: 1 },
                                $slice: -10
                            }
                        }
                    }
                );
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