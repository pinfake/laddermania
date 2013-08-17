if (Meteor.isServer) {
    Meteor.publish( "games", function() {
        return( Games.find({userId: this.userId}, {sort: {name: 1}}) );
    });

    Games.allow({
        insert: function( userId, doc ) {
            if( doc.userId != userId ) return false;
            var validation = Mesosphere.newGameForm.validateDocument( doc );
            if( validation.errors ) return false;
            return true;
        },
        remove: function( userId, doc ) {
            if( doc.userId == userId ) return true;
            return false;
        }
    });

//    Meteor.methods({
//        insertGame: function( rawFormData ) {
//            console.log( "Validando..." );
//            Mesosphere.newGameForm.validate(rawFormData, function(errors, data ) {
//                console.log( "Errores: ");
//                console.log( errors );
//                console.log( "Data: " );
//                console.log( data );
//                if( !errors ) {
//                    console.log( "Form bien validado: ");
//                    console.log( data );
////                    var name = data.name;
////                    var description = validationObject.formData.description;
////                    var id = Games.insert({
////                        userId: Meteor.userId(),
////                        name: name,
////                        description: description
////                    });
//                }
//            });
//
//        }
//    })
}