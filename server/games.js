Meteor.publish("games", function () {
    return( Games.find({userId: this.userId}, {sort: {name: 1}}) );
});

Meteor.methods({
    addGame: function( formData ) {
        var result = Mesosphere.newGameForm.validate( formData );
        if( result.errors ) {
            console.log( result.errors );
            return false;
        }
        var data = result.formData;
        var id = Games.insert({
            userId: this.userId,
            name: data.name,
            description: data.description
        });
    },
    removeGame: function( id ) {
        // If the ladder doesn't exist for the current user we do nothing
        if( !Games.findOne( { _id: id, userId: this.userId }) ) {
            return false;
        }
        Games.remove({ _id: id });
        return true;
    }
});
