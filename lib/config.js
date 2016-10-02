const config = {
	  allowPutWithoutQuery: false
	, delay: [ 50, 150 ]
	, generateUUIDs: true
	, routes: {}
	, setDelay( low, high ) {
		if ( low === undefined ) {
			throw new TypeError( "setDelay: Low bound (first argument) must be a number, and is required." );
		}

		if ( low < 0 ) {
			throw new RangeError( "setDelay: Low bound (first argument) must be at least 0." );
		}

		if ( high !== undefined && high < low ) {
			throw new RangeError( "setDelay: High bound (second argument) must be greater than low bound (first argument)." );
		}

		if ( high === undefined ) {
			this.delay = low;
		} else {
			this.delay = [ low, high ];
		}
	}
	, setErrors( route, errorText, statusCode, condition ) {
		if ( !route || !errorText || !statusCode ) {
			throw new TypeError( "setErrors: Requires 3 arguments. Route path, error text, and status code" );
		}

		if ( condition && ( typeof condition !== "function" || typeof condition !== "boolean" ) ) {
			throw new TypeError( "setErrors: Condition (4th argument) must be a function or boolean" );
		}

		this.routes[ route ] = {
			  errorText
			, statusCode
			, condition
		}
	}
};

module.exports = config;
