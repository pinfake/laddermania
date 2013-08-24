Meteor.methods( {
    addPlayer: function( formData ) {
        var result = Mesosphere.newPlayerForm.validate( formData );
        if( result.errors ) {
            console.log( result.errors );
            return false;
        }
        var data = result.formData;
        var id = Players.insert({
            userId: this.userId,
            nickname: data.nickname,
            email: data.email
        });

        return( id );
    },

    removePlayer: function( id )
    {
        // If the ladder doesn't exist for the current user we do nothing
        if( !Players.findOne( { _id: id, userId: this.userId }) ) {
            return false;
        }
        Players.remove({ _id: id });
        return true;
    }
} );

Meteor.publish( "players", function() {
    return( Players.find({userId: this.userId}, {sort: {nickname: 1}}) );
});
