/**
 * @namespace number
 * @private
 */
var number = {
	/**
	 * Returns the difference of arg
	 *
	 * @method diff
	 * @memberOf number
	 * @param {Number} arg Number to compare
	 * @return {Number}    The absolute difference
	 * @example
	 * number.diff( -3, 8 ); // 11
	 */
	diff: function ( num1, num2 ) {
		if ( isNaN( num1 ) || isNaN( num2 ) ) {
			throw new Error( label.expectedNumber );
		}

		return Math.abs( num1 - num2 );
	},

	/**
	 * Tests if an number is even
	 *
	 * @method even
	 * @memberOf number
	 * @param {Number} arg Number to test
	 * @return {Boolean}   True if even, or undefined
	 * @example
	 * var n = 234235;
	 *
	 * if ( number.even( n ) ) {
	 *   ...
	 * }
	 */
	even: function ( arg ) {
		return arg % 2 === 0;
	},

	/**
	 * Tests if a number is odd
	 *
	 * @method odd
	 * @memberOf number
	 * @param  {Number} arg Number to test
	 * @return {Boolean}    True if odd, or undefined
	 * @example
	 * var n = 234235;
	 *
	 * if ( number.odd( n ) ) {
	 *   ...
	 * }
	 */
	odd: function ( arg ) {
		return !number.even( arg );
	},

	/**
	 * Parses the number
	 *
	 * @method parse
	 * @memberOf number
	 * @param  {Mixed}  arg  Number to parse
	 * @param  {Number} base Integer representing the base or radix
	 * @return {Number}      Integer or float
	 * @example
	 * // Unsure if `n` is an int or a float
	 * number.parse( n );
	 */
	parse: function ( arg, base ) {
		return ( base === undefined ) ? parseFloat( arg ) : parseInt( arg, base );
	},

	/**
	 * Rounds a number up or down
	 *
	 * @method round
	 * @memberOf number
	 * @param  {Number} arg       Number to round
	 * @param  {String} direction [Optional] "up" or "down"
	 * @return {Number}           Rounded interger
	 * @example
	 * math.round( n, "down" );
	 */
	round: function ( arg, direction ) {
		arg = number.parse( arg );

		if ( direction === undefined || string.isEmpty( direction ) ) {
			return number.parse( arg.toFixed( 0 ) );
		}
		else if ( regex.down.test( direction ) ) {
			return ~~( arg );
		}
		else {
			return Math.ceil( arg );
		}
	}
};
