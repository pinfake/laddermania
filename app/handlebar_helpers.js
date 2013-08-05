if (Meteor.isClient) { 
Handlebars.registerHelper("ifequal", function( data, options ) {
	console.log( String(data.hash.a) );
	console.log( String(data.hash.b) );
	console.log( data.hash.b == data.hash.a );
    if( String(data.hash.a) == String(data.hash.b) ) {
	return data.fn(this);
    } else {
	if( data.inverse != undefined )
	    return data.inverse(this)
        return( '' );
    }
});
}
