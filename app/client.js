if (Meteor.isClient) {
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
