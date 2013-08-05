if (Meteor.isClient) { 
  Session.set("section", "dash" );

  Template.main.user = function() { return Session.get( "user" ); }

  Template.navbar.logged = function() { return Session.get( "logged" ); }
  Template.navbar.user = function() { return Session.get( "user" ); }

  Template.login.events({
      'click #loginForm #login' : function() {
	 var username = $('#loginForm #username').val();
         var password = $('#loginForm #password').val();
         var user = Users.findOne( { username: username, password: password } );
         if( user != undefined ) {
		Session.set('user', user );
		if( user.currentLadder != undefined ) {
		    var currentLadder = Ladders.findOne( {_id: user.currentLadder} );
		    Session.set('currentLadder', currentLadder );
		    Session.set("section", "dash");
		}
         } else {
		$('#loginError').show();
	 }
      }
  });

  Template.navbar.currentLadder = function() {
	return( Session.get( 'currentLadder' ) );
  }

  Template.navbar.currentSection = function() {
	return( Session.get( 'section' ) );
  }

  Template.navbar.events({
      'click #playersSection' : function () {
        $('li.active').removeClass('active');
        $('#playersSection').parent().addClass('active');
	Session.set("section", "players");
      },
      'click #dashSection' : function () {
        $('li.active').removeClass('active');
        $('#dashSection').parent().addClass('active');
	Session.set("section", "dash");
      },
      'click #laddersSection' : function () {
        $('li.active').removeClass('active');
        $('#laddersSection').parent().addClass('active');
	Session.set("section", "ladders");
      },
      'click #logoutButton' : function () {
	Session.set( 'user', undefined );
      }
  });

  Template.navbar.rendered = function () {
	console.log( Session );
        $('li.active').removeClass('active');
        $('#'+Session.get('section')+'Section').parent().addClass('active');
  };

  Template.ladderMain.currentLadder = function() {
	var current = Session.get( 'currentLadder' );
	return( current );
  }

  Template.dash.currentLadder = function() {
	var current = Session.get( 'currentLadder' );
	return( current );
  }

  Template.newPlayerModal.events({
      'click #newPlayerButton' : function() {
         var nickname = $('#newPlayerForm #nickname').val();
	 Players.insert({nickname: nickname});
      }
  });

  Template.newLadderModal.events({
      'click #newLadderButton' : function() {
         var name = $('#newLadderForm #name').val();
	 var id = Ladders.insert({name: name});
         var current = Ladders.findOne({_id: id});
	 Session.set( 'currentLadder', current );
	 Users.update( { _id: Session.get( 'user' )._id },
		{ $set: {
			currentLadder: id
 		}}
	 );
      }
  });

  Template.players.players = function () {
    var players = Players.find({}, {sort: {nickname: 1}});
    if( players.count() < 1 ) return false;
    return( players );
  };

  Template.ladderPositions.ladderPlayers = function () {
    var players = LadderPlayers.find({ladderId: Session.get( 'currentLadder' )._id }, {sort: {score: -1}});
    if( players.count() < 1 ) return false;
    var ret = [];
    var position = 1;
    players.forEach(function( player ) {
	var pInfo = Players.findOne( { _id: player.playerId }, 'nickname' );
	ret.push( { playerId: player.playerId, nickname: pInfo.nickname, score: player.score, position: position++ } );  
    });
    return( ret );
  };

  Template.modalLadderAddPlayer.players = function() {
    var players = Players.find({}, {sort: {nickname: 1}});
    if( players.count() < 1 ) return false;
    return( players );
  };

  Template.modalLadderAddPlayer.events = ({
      'click #addPlayerButton' : function() {
	  var players = $('#playersInput').select2("val");
          for( var i = 0; i < players.length; i++ ) {
	      LadderPlayers.insert( {
		ladderId: Session.get('currentLadder')._id,
		playerId: players[i],
		score: 0 } );
	  }
      }
  });

  Template.ladderPositions.rendered = function() {
	$("span.badge[data-position='1']").addClass( 'badge-important' );
	$("span.badge[data-position='2']").addClass( 'badge-warning' );
	$("span.badge[data-position='3']").addClass( 'badge-info' );
  }

  Template.modalLadderAddPlayer.rendered = function() {
      $("#playersInput").select2({
            multiple: true,
            minimumInputLength: 2,
            query: function (query) {
		var found = Players.find( { nickname: { $regex: query.term, $options: 'i' } } ).fetch();
                var data = {results: []}
		for( i = 0; i < found.length; i++ ) {
	  	    data.results.push({id: found[i]._id, text: found[i].nickname});
	        }
                query.callback(data);
            }
        });
  }


  Template.ladders.ladders = function () {
    var ladders = Ladders.find({}, {sort: {name: 1}});
    if( ladders.count() < 1 ) return false;
    //var sel = ladders.find({_id: Session.get('currentLadder')._id });
    return( ladders );
  };

  Template.pcontent.displayContents = function() {
     var section = Session.get('section');

    if (Template[section]) {
        return Template[section]();
    } else {
        return "";
        //return Template['page_not_found']();
    }
  };

  Template.player.events({
    'click .removePlayer' : function(event) {
	var element = event.currentTarget;
	var id = $(element).attr( 'data-id' );
  
	Players.remove( { _id: id } );
    }
  });

  Template.ladder.events({
    'click .removeLadder' : function(event) {
	var element = event.currentTarget;
	console.log( "Deleting ladder: " );
	console.log( $(element) );
	console.log( $(element).attr('data-id') );

	var id = $(element).attr( 'data-id' );
  
	Ladders.remove( { _id: id } );
    },
    'click tr.selectLadder' : function(event) {
	if( $(event.target).is('i') ) return;
	var element = event.currentTarget;
	var id = $(element).attr( 'data-id' );
	var currentLadder = Ladders.findOne( {_id: id} );
	$("tr.selectLadder[data-id='"+Session.get('currentLadder')._id+"']").removeClass( 'success' );
	 Session.set( 'currentLadder', currentLadder );
	 Users.update( { _id: Session.get( 'user' )._id },
		{ $set: {
			currentLadder: id
 		}}
	 );
	$("tr.selectLadder[data-id='"+Session.get('currentLadder')._id+"']").addClass( 'success' );
    }
  });

  Template.ladders.rendered = function () {
	$("tr.selectLadder[data-id='"+Session.get('currentLadder')._id+"']").addClass( 'success' );
  }
}
