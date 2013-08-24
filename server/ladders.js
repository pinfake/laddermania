Meteor.methods( {
    addLadder: function( formData ) {
        var result = Mesosphere.newLadderForm.validate( formData ) ;
        if( result.errors ) {
            console.log( result.errors );
            return false;
        }
        var data = result.formData;
        var id = Ladders.insert({
            userId: this.userId,
            name: data.name,
            description: data.description,
            game: data.game
        });
        if( !id ) return false;
        Scores.insert({_id: id});
        return( id );
    },
    removeLadder: function( id )
    {
        // If the ladder doesn't exist for the current user we do nothing
        if( !Ladders.findOne( { _id: id, userId: this.userId }) ) {
            return false;
        }
        Ladders.remove({ _id: id });
        Scores.remove({ ladderId: id });
        return true;
    },
    selectLadder: function( id )
    {
        if( !Ladders.findOne( { _id: id, userId: this.userId }) ) {
            return false;
        }
        Meteor.users.update( this.userId, {
            $set: {
                "profile.currentLadder": id
            }
        });
    }
} );


Meteor.publish( "ladders", function() {
    return( Ladders.find({userId: this.userId}, {sort: {name: 1}}) );
});
