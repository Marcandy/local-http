const { parseUrlPathAndQuery } = require( "./utils" );
const storage = require( "./storage" );

function post( requestUrl, data ) {
	if ( typeof requestUrl !== "string" ) {
		throw new TypeError( "post: requestUrl (first argument) is required and must be a string" );
	}

	if ( data === undefined ) {
		throw new TypeError( "post: data (second argument) is required" );
	}

	const { pathArray } = parseUrlPathAndQuery( requestUrl );

	const localHttpObject = localStorage.getItem( "local-http" );
	return postToLocalStorage( JSON.parse( localHttpObject ), localHttpObject, pathArray, 0, data );
}

function postToLocalStorage( storageObject, previousData, path, index, data ) {
	let currentData = previousData[ path[ index ] ];

	if ( currentData === undefined && index === path.length - 1 ) {
		currentData = [ data ];
		localStorage.setItem( "local-http", storageObject );
		return { data, statusCode: 201 };
	}

	if ( currentData !== undefined && index === path.length - 1 ) {
		currentData.push( data );
		localStorage.setItem( "local-http", storageObject );
		return { data, statusCode: 201 }
	}

	if ( currentData !== undefined && index !== path.length - 1 ) {
		return { error: "Bad request", statusCode: 400 };
	}

	return postToLocalStorage( storageObject, currentData, path, index + 1, data );
}

module.exports = post;
