const config = require( "./config" );
const { parseUrlPathAndQuery } = require( "./utils" );
const storage = require( "./storage" );

function put( requestUrl, data ) {
	if ( typeof requestUrl !== "string" ) {
		throw new TypeError( "put: requestUrl (first argument) is required and must be a string" );
	}

	if ( data === undefined ) {
		throw new TypeError( "put: data (second argument) is required" );
	}

	const { pathArray, query } = parseUrlPathAndQuery( requestUrl );

	if ( query === null && !config.allowPutWithoutQuery ) {
		throw new Error( "put: Cannot PUT without a query by default. Change config.allowPutWithoutQuery to allow mass PUTs" );
	}

	return putToLocalStorage( JSON.parse( storage.getItem( "local-http" ) ), pathArray, 0, query );
}

function putToLocalStorage( storageObject, previousData, path, index, query, data ) {
	let currentData = previousData[ path[ index ] ];

	if ( currentData === undefined ) {
		return { error: "Not found", statusCode: 404 };
	}

	if ( index === path.length - 1 ) {
		if ( query !== null ) {
			currentData = currentData.map( element => {
				for ( let prop in query ) {
					if ( query.hasOwnProperty( prop ) ) {
						if ( !element.hasOwnProperty( prop ) ) {
							return element;
						}

						const queryRegex = new RegExp( query[ prop ], "i" );
						if ( !queryRegex.test( element[ prop ] ) ) {
							return element;
						}
					}
				}
				return Object.assign( {}, element, data );
			} );
		} else {
			currentData = currentData.map( element => Object.assign( {}, element, data ) );
		}

		storage.setItem( "local-http", storageObject );
		return { data: currentData, statusCode: 200 };
	}

	return putToLocalStorage( storageObject, currentData, path, index + 1, query, data );
}

module.exports = get;
