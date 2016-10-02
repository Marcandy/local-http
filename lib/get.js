const { parseUrlPathAndQuery } = require( "./utils" );
const storage = require( "./storage" );

function get( requestUrl ) {
	if ( typeof requestUrl !== "string" ) {
		throw new TypeError( "get: requestUrl (first argument) is required and must be a string" );
	}

	const { pathArray, query } = parseUrlPathAndQuery( requestUrl );

	return getFromLocalStorage( JSON.parse( storage.getItem( "local-http" ) ), pathArray, 0, query );
}

function getFromLocalStorage( previousData, path, index, query ) {
	const currentData = previousData[ path[ index ] ];

	if ( currentData === undefined ) {
		return { error: "Not found", statusCode: 404 };
	}


	if ( index === path.length - 1 ) {
		if ( query ) {
			const filteredData = currentData.filter( element => {
				for ( let prop in query ) {
					if ( query.hasOwnProperty( prop ) ) {
						if ( !element.hasOwnProperty( prop ) ) {
							return false;
						}

						const queryRegex = new RegExp( query[ prop ], "i" );
						if ( !queryRegex.test( element[ prop ] ) ) {
							return false;
						}
					}
				}
				return true;
			} );

			return filteredData.length === 1 ? filteredData[ 0 ] : filteredData;
		}
		return currentData;
	}

	return getFromLocalStorage( currentData, path, index + 1, query );
}

module.exports = get;
