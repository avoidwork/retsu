/**
 * @namespace string
 * @private
 */
var string = {
	/**
	 * Splits a string on comma, or a parameter, and trims each value in the resulting Array
	 *
	 * @method explode
	 * @memberOf string
	 * @param  {String} obj String to capitalize
	 * @param  {String} arg String to split on
	 * @return {Array}      Array of the exploded String
	 * @example
	 * array.each( string.explode( "abc, def" ), function ( i ) {
	 *   ...
	 * } );
	 */
	explode : function ( obj, arg ) {
		arg = arg || ",";

		return string.trim( obj ).split( new RegExp( "\\s*" + arg + "\\s*" ) );
	},

	/**
	 * Tests if a string is empty
	 *
	 * @method isEmpty
	 * @memberOf string
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 * @example
	 * if ( !string.isEmpty( ... ) {
	 *   ...
	 * } );
	 */
	isEmpty : function ( obj ) {
		return string.trim( obj ) === "";
	},

	/**
	 * Trims the whitespace around a String
	 *
	 * @method trim
	 * @memberOf string
	 * @param  {String} obj String to capitalize
	 * @return {String}     Trimmed String
	 * @example
	 * string.trim( "  hello world " ); // "hello world"
	 */
	trim : function ( obj ) {
		return obj.replace( /^(\s+|\t+|\n+)|(\s+|\t+|\n+)$/g, "" );
	}
};
