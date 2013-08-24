Meteor.publish( "scores", function( ladderId ) {
    return( Scores.find({_id: ladderId}) );
});

Meteor.methods({
    addPlayersToLadder: function( ladderId, playerIds ) {
        // Prevent adding players to ladders not owned by this user
        if( !Ladders.findOne( { _id: ladderId, userId: this.userId }) ) {
            return false;
        }
        for (var i = 0; i < playerIds.length; i++) {
            var player = Players.findOne({_id: playerIds[i]});
            if( player ) {
                Scores.update(
                    {
                        _id: ladderId
                    },
                    { $push: {
                        players: { id: player._id, nickname: player.nickname, score: 0 }
                    }
                    }
                );
            }
        }
    }
});

