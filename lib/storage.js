let storage;
if ( typeof localStorage === "undefined" ) {
	storage = {
		getItem( key ) {
			if ( this.hasOwnProperty( key ) ) {
				return JSON.stringify( this[ key ] );
			} else {
				return null;
			}
		}
		, setItem( key, data ) {
			this[ key ] = data;
		}
		, "local-http": {
			api: {
				users: [ "Tom", "Dick", "Harry" ]
			}
		}
	};
} else {
	storage = localStorage;
}

module.exports = storage;
