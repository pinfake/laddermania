if (Meteor.isServer) {
    Meteor.publish( "ladders", function() {
        return( Ladders.find({userId: this.userId}, {sort: {name: 1}}) );
    });

    Ladders.allow({
        insert: function( userId, doc ) {
            if( doc.userId != userId ) return false;
            var validation = Mesosphere.newLadderForm.validateDocument( doc );
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