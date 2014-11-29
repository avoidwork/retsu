/**
 * @namespace math
 * @private
 */
var math = {
	/**
	 * Squares a Number
	 *
	 * @method sqr
	 * @memberOf math
	 * @param  {Number} n Number to square
	 * @return {Number}   Squared value
	 * @example
	 * var sqr = math.sqr( 23 );
	 */
	sqr: function ( n ) {
		return Math.pow( n, 2 );
	}
};
