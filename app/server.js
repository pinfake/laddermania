if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if(Users.find().count() === 0) {
	Users.insert( 
	    {
		username: 'admin',
		password: 'rogelio',
		name: 'Administrator'
            }
        );
    }
  });
}
