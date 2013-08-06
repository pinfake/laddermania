if (Meteor.isClient) {
    Template.navbar.logged = function () {
        return Session.get("logged");
    }
    Template.navbar.user = function () {
        return Session.get("user");
    }
    Template.navbar.currentLadder = function () {
        return( Session.get('currentLadder') );
    }

    Template.navbar.currentSection = function () {
        return( Session.get('section') );
    }

    Template.navbar.events({
        'click #playersSection': function () {
            $('li.active').removeClass('active');
            $('#playersSection').parent().addClass('active');
            Session.set("section", "players");
        },
        'click #dashSection': function () {
            $('li.active').removeClass('active');
            $('#dashSection').parent().addClass('active');
            Session.set("section", "dash");
        },
        'click #laddersSection': function () {
            $('li.active').removeClass('active');
            $('#laddersSection').parent().addClass('active');
            Session.set("section", "ladders");
        },
        'click #logoutButton': function () {
            Session.set('user', undefined);
        }
    });

    Template.navbar.rendered = function () {
        console.log(Session);
        $('li.active').removeClass('active');
        $('#' + Session.get('section') + 'Section').parent().addClass('active');
    };
}