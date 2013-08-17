if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
//    if(Users.find().count() === 0) {
//	Users.insert(
//	    {
//		username: 'admin',
//		password: 'rogelio',
//		name: 'Administrator'
//            }
//        );
//    }

    //Meteor.users.remove( {} );

    if( Meteor.users.find().count() === 0 ) {

        Accounts.createUser( {
            username: 'admin',
            password: 'rogelio',
            email: 'pinfake@hotmail.com',
            profile: {
                name: 'Administrator'
            }
        });
    }
  });
}
