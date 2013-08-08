if (Meteor.isClient) {

    Meteor.subscribe("users");
    Meteor.subscribe("ladders");
    Meteor.subscribe("matches");
    Meteor.subscribe("players");
    Meteor.subscribe("ladderPlayers");
    Session.set("section", "dash");

    Template.main.user = function () {
        return Session.get("user");
    }

    Template.pcontent.displayContents = function () {
        var section = Session.get('section');

        if (Template[section]) {
            return Template[section]();
        } else {
            return "";
            //return Template['page_not_found']();
        }
    };
}
