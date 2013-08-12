if (Meteor.isClient) {
    Template.login.events({
        'click #loginForm #login': function () {
            var username = $('#loginForm #username').val();
            var password = $('#loginForm #password').val();
            Meteor.loginWithPassword(username, password, function( error ) {
                console.log( error );
                if( error != undefined ) {
                    $('#loginError').show();
                } else {
                    Session.set("section", "dash");
                }
            });
//            var user = Users.findOne({ username: username, password: password });
//            if (user != undefined) {
//                Session.set('user', user);
//                if (user.currentLadder != undefined) {
//                    var currentLadder = Ladders.findOne({_id: user.currentLadder});
//                    Session.set('currentLadder', currentLadder);
//                    Session.set("section", "dash");
//                }
//            } else {
//                $('#loginError').show();
//            }
        }
    });
}