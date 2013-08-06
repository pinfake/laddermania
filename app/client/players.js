if( Meteor.isClient ) {
    Template.players.players = function () {
        var players = Players.find({}, {sort: {nickname: 1}});
        if (players.count() < 1) return false;
        return( players );
    };

    Template.newPlayerModal.events({
        'click #newPlayerButton': function () {
            var nickname = $('#newPlayerForm #nickname').val();
            Players.insert({nickname: nickname});
        }
    });

    Template.player.events({
        'click .removePlayer': function (event) {
            var element = event.currentTarget;
            var id = $(element).attr('data-id');

            Players.remove({ _id: id });
        }
    });
}