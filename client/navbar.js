if (Meteor.isClient) {
    Template.navbar.user = function () {
        console.log( Meteor.user());
        return Meteor.user();
    }

    Template.navbar.currentLadder = function () {
        if( Meteor.user().profile.currentLadder != undefined ) {
            return Ladders.findOne({_id: Meteor.user().profile.currentLadder });
        } else {
            return false;
        }
        //return( Session.get('currentLadder') );
    }

    Template.navbar.currentSection = function () {
        return( Session.get('section') );
    }

    Template.navbar.events({
        'click #playersSection': function () {
            $('#mainNav li.active').removeClass('active');
            $('#mainNav #playersSection').parent().addClass('active');
            Session.set("section", "players");
        },
        'click #dashSection': function () {
            $('#mainNav li.active').removeClass('active');
            $('#mainNav #dashSection').parent().addClass('active');
            Session.set("section", "dash");
        },
        'click #laddersSection': function () {
            $('#mainNav li.active').removeClass('active');
            $('#mainNav #laddersSection').parent().addClass('active');
            Session.set("section", "ladders");
        },
        'click #gamesSection': function () {
            $('#mainNav li.active').removeClass('active');
            $('#mainNav #gamesSection').parent().addClass('active');
            Session.set("section", "games");
        },
        'click #logoutButton': function () {
            Meteor.logout();
        }
    });

    Template.navbar.rendered = function () {
        console.log(Session);
        $('#mainNav li.active').removeClass('active');
        $('#mainNav #' + Session.get('section') + 'Section').parent().addClass('active');
    };
}