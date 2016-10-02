const url = require( "url" );
const querystring = require( "querystring" );

module.exports = {
	parseUrlPathAndQuery( url ) {
		const urlObject = url.parse( requestUrl );
		const query = urlObject.query ? querystring.parse( urlObject.query ) : null;
		const pathArray = urlObject.pathname.split( "/" );

		// drop empty string from start of pathArray
		pathArray.shift();

		return { pathArray, query };
	}
};
