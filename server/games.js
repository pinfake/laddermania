if (Meteor.isServer) {
    Meteor.publish( "games", function() {
        return( Games.find({userId: this.userId}, {sort: {name: 1}}) );
    });

    Games.allow({
        insert: function( userId, doc ) {
            if( doc.userId != userId ) return false;
            var validation = Mesosphere.newGameForm.validateDocument( doc );
            if( validation.errors ) {
                console.log( validation.errors );
                return false;
            }
            return true;
        },
        remove: function( userId, doc ) {
            if( doc.userId == userId ) return true;
            return false;
        }
    });
}