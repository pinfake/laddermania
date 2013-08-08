MRLadderPlayers = new Meteor.Collection( 'mrLadderPlayers' );

if (!Meteor.isServer) {
} else {
    Meteor.startup(function () {
        // code to run on server at startup
        if (Users.find().count() === 0) {
            Users.insert(
                {
                    username: 'admin',
                    password: 'rogelio',
                    name: 'Administrator'
                }
            );
        }
    });

    Meteor.publish("mrLadderPlayers", function (ladderId) {
        console.log('Paso con: ', ladderId);
        if (ladderId == null) return;
        console.log('Llamo a esto una vez');
        var map = function () {
            //console.log( 'calling map function' );
            var output = {
                //nickname: db.players.findOne({_id:this.playerId}).nickname,
                ladderId: this.ladderId,
                nickname: Players.findOne({_id:this.playerId}).nickname,
                score: this.score
            };
            emit(this.playerId, output);
        };


        var reduce = function (key, values) {
            return( values[0] );
        };

        var callReduce = function () {
            return LadderPlayers.mapReduce(map, reduce, {
                out: 'mrLadderPlayers',
                query: {
                    ladderId: ladderId
                }
            });
        }

        var initializing = true;

        var handle = LadderPlayers.find({ ladderId: ladderId }).observeChanges({
                added: function (id) {
                    if( !initializing ) {
                        console.log( 'ADDED, calling reduce!!');
                        callReduce();
                    }
                },
                removed: function(id) {
                    if( !initializing ) {
                        console.log( 'REMOVED, calling reduce!!');
                        callReduce();
                    }
                }
            }
        );

        this.ready();

        this.onStop(function () {
            handle.stop();
        });

        initializing = false;

        var result = callReduce();
//        var reduce = function(key, values) {
//            var outs={ nickname:null , score:null };
//            values.forEach(function(v){
//                if(outs.nickname ==null){
//                    outs.nickname = v.nickname;
//                }
//                if(outs.score ==null){
//                    outs.score = v.score;
//                }
//            });
//            return outs;
//        };
        console.log(result);
        return( MRLadderPlayers.find({}) );
    });

    Meteor.publish('users', function () {
        return( Users.find() );
    });
    Meteor.publish('players', function () {
        return( Players.find() );
    });
    Meteor.publish('ladders', function () {
        return( Ladders.find() );
    });
    Meteor.publish('matches', function () {
        return( Matches.find() );
    });
    Meteor.publish('ladderPlayers', function () {
        console.log('ladderPlayers ha variado...');
        return( LadderPlayers.find() );
    });
}
