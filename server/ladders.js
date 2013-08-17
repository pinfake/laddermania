if (Meteor.isServer) {
    Meteor.publish( "ladders", function() {
        return( Ladders.find({userId: this.userId}, {sort: {name: 1}}) );
    });

    Ladders.allow({
        insert: function( userId, ladder ) {
            console.log( "Someone tried to insert... " + userId );
            return false;
        }
    });
}