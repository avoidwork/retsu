/**
 * @namespace json
 * @private
 */
var json = {
	/**
	 * Decodes the argument
	 *
	 * @method decode
	 * @memberOf json
	 * @param  {String}  arg    String to parse
	 * @param  {Boolean} silent [Optional] Silently fail
	 * @return {Mixed}          Entity resulting from parsing JSON, or undefined
	 * @example
	 * var x = json.decode( ..., true );
	 *
	 * if ( x ) {
	 *   ...
	 * }
	 * else {
	 *   ... // invalid JSON, with `Error` suppressed by `silent`
	 * }
	 */
	decode: function ( arg, silent ) {
		try {
			return JSON.parse( arg );
		}
		catch ( e ) {
			if ( silent !== true ) {
				utility.error( e, arguments, this );
			}

			return undefined;
		}
	},

	/**
	 * Encodes `arg` as JSON
	 *
	 * @method encode
	 * @memberOf json
	 * @param  {Mixed}   arg    Primative
	 * @param  {Boolean} silent [Optional] Silently fail
	 * @return {String}         JSON, or undefined
	 * @example
	 * var x = json.encode( ..., true );
	 *
	 * if ( x ) {
	 *   ...
	 * }
	 * else {
	 *   ... // invalid JSON, with `Error` suppressed by `silent`
	 * }
	 */
	encode: function ( arg, silent ) {
		try {
			return JSON.stringify( arg );
		}
		catch ( e ) {
			if ( silent !== true ) {
				utility.error( e, arguments, this );
			}

			return undefined;
		}
	}
};
