/**
 * Array micro library focused on speed
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2014 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/retsu/master/LICENSE>
 * @link http://avoidwork.github.io/retsu
 * @module retsu
 * @version 1.0.0
 */
( function ( global ) {
"use strict";

var server = typeof process !== undefined,
    slice  = Array.prototype.slice;

/**
 * @namespace array
 */
var array = {
	/**
	 * Adds 'arg' to 'obj' if it is not found
	 *
	 * @method add
	 * @memberOf array
	 * @param  {Array} obj Array to receive 'arg'
	 * @param  {Mixed} arg Argument to set in 'obj'
	 * @return {Array}     Array that was queried
	 * @example
	 * var myArray = [1, 2];
	 *
	 * array.add( myArray, 3 ); // [1, 2, 3]
	 * array.add( myArray, 1 ); // [1, 2, 3]
	 */
	add : function ( obj, arg ) {
		if ( !array.contains( obj, arg ) ) {
			obj.push( arg );
		}

		return obj;
	},

	/**
	 * Performs a binary search on a sorted Array
	 *
	 * @method binIndex
	 * @memberOf array
	 * @param  {Array} obj Array to search
	 * @param  {Mixed} arg Value to find index of
	 * @return {Number}    Index of `arg` within `obj`
	 * @example
	 * var myArray = [1, 5, 10, 15, 20, 25, ...];
	 *
	 * array.binIndex( myArray, 5 ); // 1
	 */
	binIndex : function ( obj, arg ) {
		var min = 0,
		    max = obj.length - 1,
		    idx, val;

		while ( min <= max ) {
			idx = Math.floor( ( min + max ) / 2 );
			val = obj[idx];

			if ( val < arg ) {
				min = idx + 1;
			}
			else if ( val > arg ) {
				max = idx - 1;
			}
			else {
				return idx;
			}
		}

		return -1;
	},

	/**
	 * Returns an Object ( NodeList, etc. ) as an Array
	 *
	 * @method cast
	 * @memberOf array
	 * @param  {Object}  obj Object to cast
	 * @param  {Boolean} key [Optional] Returns key or value, only applies to Objects without a length property
	 * @return {Array}       Object as an Array
	 * @example
	 * array.cast( document.querySelectorAll( "..." ) );
	 */
	cast : function ( obj, key ) {
		key   = ( key === true );
		var o = [];

		if ( !isNaN( obj.length ) ) {
			o = slice.call( obj );
		}
		else if ( key ) {
			o = array.keys( obj );
		}
		else {
			utility.iterate( obj, function ( i ) {
				o.push( i );
			} );
		}

		return o;
	},

	/**
	 * Transforms an Array to a 2D Array of chunks
	 *
	 * @method chunk
	 * @memberOf array
	 * @param  {Array}  obj  Array to process
	 * @param  {Number} size Chunk size ( integer )
	 * @return {Array}       Chunked Array
	 * @example
	 * array.chunk( [0, 1, 2, 3], 2 ); // [[0, 1], [2, 3]]
	 */
	chunk : function ( obj, size ) {
		var result = [],
		    nth    = number.round( ( obj.length / size ), "up" ),
		    start  = 0,
		    i      = -1;

		while ( ++i < nth ) {
			start = i * size;
			result.push( array.limit( obj, start, size ) );
		}

		return result;
	},

	/**
	 * Clears an Array without destroying it
	 *
	 * @method clear
	 * @memberOf array
	 * @param  {Array} obj Array to clear
	 * @return {Array}     Cleared Array
	 * @example
	 * var myArray = [1, 2, 3, 4, 5];
	 *
	 * array.clear( myArray );
	 * myarray.length; // 0
	 */
	clear : function ( obj ) {
		return obj.length > 0 ? array.remove( obj, 0, obj.length ) : obj;
	},

	/**
	 * Clones an Array
	 *
	 * @method clone
	 * @memberOf array
	 * @param  {Array} obj Array to clone
	 * @return {Array}     Clone of Array
	 * @example
	 * var myArray      = [1, 2, 3, 4, 5],
	 *     myArrayClone = array.clone( myArray );
	 *
	 * myArrayClone.push( 6 );
	 *
	 * myarray.length;      // 5
	 * myArrayClone.length; // 6
	 */
	clone : function ( obj ) {
		return utility.clone( obj, true );
	},

	/**
	 * Determines if obj contains arg
	 *
	 * @method contains
	 * @memberOf array
	 * @param  {Array} obj Array to search
	 * @param  {Mixed} arg Value to look for
	 * @return {Boolean}   True if found, false if not
	 * @example
	 * if ( array.contains( [1], 1 ) ) { ... }
	 */
	contains : function ( obj, arg ) {
		return obj.indexOf( arg ) > -1;
	},

	/**
	 * Creates a new Array of the result of `fn` executed against every index of `obj`
	 *
	 * @method collect
	 * @memberOf array
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to execute against indices
	 * @return {Array}        New Array
	 * @example
	 * var results = array.collect( [...], function ( ... ) { ... } );
	 */
	collect : function ( obj, fn ) {
		var result = [];

		array.each( obj, function ( i ) {
			result.push( fn( i ) );
		} );

		return result;
	},

	/**
	 * Compacts a Array by removing `null` or `undefined` indices
	 *
	 * @method compact
	 * @memberOf array
	 * @param  {Array}   obj  Array to compact
	 * @param  {Boolean} diff Indicates to return resulting Array only if there's a difference
	 * @return {Array}        Compacted copy of `obj`, or null ( if `diff` is passed & no diff is found )
	 * @example
	 * array.compact( [null, "a", "b", "c", null, "d"] ); // ["a", "b", "c", "d"]
	 * array.compact( ["a", "b", "c", "d"], true );       // null
	 */
	compact : function ( obj, diff ) {
		diff = ( diff === true );
		var result;

		result = obj.filter( function ( i ) {
			return !regex.null_undefined.test( i );
		} );

		return !diff ? result : ( result.length < obj.length ? result : null );
	},

	/**
	 * Counts `value` in `obj`
	 *
	 * @method count
	 * @memberOf array
	 * @param  {Array} obj   Array to search
	 * @param  {Mixed} value Value to compare
	 * @return {Array}       Array of counts
	 * @example
	 * array.count( ["apple", "banana", "orange", "apple"], "apple" ); // 2
	 */
	count : function ( obj, value ) {
		return obj.filter( function ( i ) {
			return ( i === value );
		} ).length;
	},

	/**
	 * Finds the difference between two Arrays
	 *
	 * @method diff
	 * @memberOf array
	 * @param  {Array} obj1 Source Array
	 * @param  {Array} obj2 Comparison Array
	 * @return {Array}      Array of the differences
	 * @example
	 * array.diff( ["a"], ["a", "b"] ); // ["b"]
	 */
	diff : function ( obj1, obj2 ) {
		var result = [];

		array.each( obj1, function ( i ) {
			if ( !array.contains( obj2, i ) ) {
				array.add( result, i );
			}
		} );

		array.each( obj2, function ( i ) {
			if ( !array.contains( obj1, i ) ) {
				array.add( result, i );
			}
		} );

		return result;
	},

	/**
	 * Iterates `obj` and executes `fn` with arguments [`value`, `index`].
	 * Returning `false` halts iteration.
	 *
	 * @method each
	 * @memberOf array
	 * @param  {Array}    obj   Array to iterate
	 * @param  {Function} fn    Function to execute on index values
	 * @param  {Boolean}  async [Optional] Asynchronous iteration
	 * @param  {Number}   size  [Optional] Batch size for async iteration, default is 10
	 * @return {Array}          Array
	 * @example
	 * array.each( [ ... ], function ( ... ) { ... } );
	 * array.each( [ ... ], function ( ... ) { ... }, true, 100 ); // processing batches of a 100
	 */
	each : function ( obj, fn, async, size ) {
		var nth = obj.length,
		    i, offset;

		if ( async !== true ) {
			i = -1;
			while ( ++i < nth ) {
				if ( fn.call( obj, obj[i], i ) === false ) {
					break;
				}
			}
		}
		else {
			size   = size || 10;
			offset = 0;

			if ( size > nth ) {
				size = nth;
			}

			utility.repeat( function () {
				var i = -1,
				    idx;

				while ( ++i < size ) {
					idx = i + offset;

					if ( idx === nth || fn.call( obj, obj[idx], idx ) === false ) {
						return false;
					}
				}

				offset += size;

				if ( offset >= nth ) {
					return false;
				}
			}, undefined, undefined, false );
		}

		return obj;
	},

	/**
	 * Iterates `obj` in reverse and executes `fn` with arguments [`value`, `index`].
	 * Returning `false` halts iteration.
	 *
	 * @method eachReverse
	 * @memberOf array
	 * @param  {Array}    obj   Array to iterate
	 * @param  {Function} fn    Function to execute on index values
	 * @param  {Boolean}  async [Optional] Asynchronous iteration
	 * @param  {Number}   size  [Optional] Batch size for async iteration, default is 10
	 * @return {Array}          Array
	 * @example
	 * array.eachReverse( [ ... ], function ( ... ) { ... } );
	 * array.eachReverse( [ ... ], function ( ... ) { ... }, true, 100 ); // processing batches of a 100
	 */
	eachReverse : function ( obj, fn, async, size ) {
		var nth = obj.length,
			i, offset;

		if ( async !== true ) {
			i = nth;
			while ( --i > -1 ) {
				if ( fn.call( obj, obj[i], i ) === false ) {
					break;
				}
			}
		}
		else {
			size   = size || 10;
			offset = nth - 1;

			if ( size > nth ) {
				size = nth;
			}

			utility.repeat( function () {
				var i = -1,
					idx;

				while ( ++i < size ) {
					idx = offset - i;

					if ( idx < 0 || fn.call( obj, obj[idx], idx ) === false ) {
						return false;
					}
				}

				offset -= size;

				if ( offset < 0 ) {
					return false;
				}
			}, undefined, undefined, false );
		}

		return obj;
	},

	/**
	 * Determines if an Array is empty
	 *
	 * @method empty
	 * @memberOf array
	 * @param  {Array} obj Array to inspect
	 * @return {Boolean}   `true` if there's no indices
	 * @example
	 * array.empty( [] );    // true
	 * array.empty( ["a"] ); // false
	 */
	empty : function ( obj ) {
		return ( obj.length === 0 );
	},

	/**
	 * Determines if two Arrays are equal
	 *
	 * @method equal
	 * @memberOf array
	 * @param  {Array} obj1 Array to compare
	 * @param  {Array} obj2 Array to compare
	 * @return {Boolean} `true` if the Arrays match
	 * @example
	 * array.equal( ["a"], ["a"] );      // true
	 * array.equal( ["a"], ["a", "b"] ); // false
	 */
	equal : function ( obj1, obj2 ) {
		return ( json.encode( obj1 ) === json.encode( obj2 ) );
	},

	/**
	 * Fills `obj` with the evalution of `arg`, optionally from `start` to `offset`
	 *
	 * @method fill
	 * @memberOf array
	 * @param  {Array}  obj   Array to fill
	 * @param  {Mixed}  arg   String, Number of Function to fill with
	 * @param  {Number} start [Optional] Index to begin filling at
	 * @param  {Number} end   [Optional] Offset from start to stop filling at
	 * @return {Array}        Filled Array
	 * @example
	 * var myArray = ["a", "b", "c"];
	 *
	 * array.fill( myArray, function ( i ) { return i + "a"; } );
	 * myArray[0]; // "aa"
	 */
	fill : function ( obj, arg, start, offset ) {
		var fn  = typeof arg == "function",
		    l   = obj.length,
		    i   = !isNaN( start ) ? start : 0,
		    nth = !isNaN( offset ) ? i + offset : l - 1;

		if ( nth > ( l - 1 ) ) {
			nth = l - 1;
		}

		while ( i <= nth ) {
			obj[i] = fn ? arg( obj[i] ) : arg;
			i++;
		}

		return obj;
	},

	/**
	 * Returns the first Array index
	 *
	 * @method first
	 * @memberOf array
	 * @param  {Array} obj The array
	 * @return {Mixed}     The first node of the array
	 * @example
	 * array.first( ["a", "b"] ); // "a"
	 */
	first : function ( obj ) {
		return obj[0];
	},

	/**
	 * Flattens a 2D Array
	 *
	 * @method flat
	 * @memberOf array
	 * @param  {Array} obj 2D Array to flatten
	 * @return {Array}     Flatten Array
	 * @example
	 * array.flat( [[0, 1], [2, 3]] ); // [0, 1, 2, 3]
	 */
	flat : function ( obj ) {
		var result = [];

		result = obj.reduce( function ( a, b ) {
			return a.concat( b );
		}, result );

		return result;
	},

	/**
	 * Iterates `obj` and executes `fn` with arguments [`value`, `index`].
	 * Returning `false` halts iteration.
	 *
	 * @method forEach
	 * @memberOf array
	 * @see array.each
	 * @param  {Array}    obj   Array to iterate
	 * @param  {Function} fn    Function to execute on index values
	 * @param  {Boolean}  async [Optional] Asynchronous iteration
	 * @param  {Number}   size  [Optional] Batch size for async iteration, default is 10
	 * @return {Array}          Array
	 * @example
	 * array.forEach( [ ... ], function ( ... ) { ... } );
	 * array.forEach( [ ... ], function ( ... ) { ... }, true, 100 ); // processing batches of a 100
	 */
	forEach : function ( obj, fn, async, size ) {
		return array.each( obj, fn, async, size );
	},

	/**
	 * Creates a 2D Array from an Object
	 *
	 * @method fromObject
	 * @memberOf array
	 * @param  {Object} obj Object to convert
	 * @return {Array}      2D Array
	 * @example
	 * array.fromObject( {name: "John", sex: "male"} ); // [["name", "John"], ["sex", "male"]]
	 */
	fromObject : function ( obj ) {
		return array.mingle( array.keys( obj ), array.cast( obj ) );
	},

	/**
	 * Facade of indexOf
	 *
	 * @method index
	 * @memberOf array
	 * @param  {Array} obj Array to search
	 * @param  {Mixed} arg Value to find index of
	 * @return {Number}    The position of arg in instance
	 * @example
	 * array.index( ["a", "b", "c"], "b" ); // 1
	 */
	index : function ( obj, arg ) {
		return obj.indexOf( arg );
	},

	/**
	 * Returns an Associative Array as an Indexed Array
	 *
	 * @method indexed
	 * @memberOf array
	 * @param  {Array} obj Array to index
	 * @return {Array}     Indexed Array
	 * @example
	 * var myArray = ["a", "b", "c"];
	 *
	 * myarray.prop = "d";
	 * array.indexed( myArray ); ["a", "b", "c", "d"];
	 */
	indexed : function ( obj ) {
		var indexed = [];

		utility.iterate( obj, function ( v ) {
			indexed.push( v );
		} );

		return indexed;
	},

	/**
	 * Finds the intersections between two Arrays
	 *
	 * @method intersect
	 * @memberOf array
	 * @param  {Array} obj1 Source Array
	 * @param  {Array} obj2 Comparison Array
	 * @return {Array}      Array of the intersections
	 * @example
	 * array.intersect( ["a", "b", "d"], ["b", "c", "d"] ); // ["b", "d"]
	 */
	intersect : function ( obj1, obj2 ) {
		var a = obj1.length > obj2.length ? obj1 : obj2,
		    b = ( a === obj1 ? obj2 : obj1 );

		return a.filter( function ( key ) {
			return array.contains( b, key );
		} );
	},

	/**
	 * Resizes `obj` by keeping every index which `fn` evaluates to `true`
	 *
	 * @method keepIf
	 * @memberOf array
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to test indices against
	 * @return {Array}        Array
	 * @example
	 * var myArray = ["a", "b", "c"];
	 *
	 * array.keepIf( myArray, function ( i ) { return /a|c/.test( i ); } );
	 * myArray[1]; // "c"
	 */
	keepIf : function ( obj, fn ) {
		var result, remove;

		if ( typeof fn != "function" ) {
			throw new Error( label.invalidArguments );
		}

		result = obj.filter( fn );
		remove = array.diff( obj, result );

		array.each( remove, function ( i ) {
			array.remove( obj, array.index( obj, i ) );
		} );

		return obj;
	},

	/**
	 * Returns the keys in an "Associative Array"
	 *
	 * @method keys
	 * @memberOf array
	 * @param  {Mixed} obj Array or Object to extract keys from
	 * @return {Array}     Array of the keys
	 * @example
	 * array.keys( {abc: true, xyz: false} ); // ["abc", "xyz"]
	 */
	keys : function ( obj ) {
		return Object.keys( obj );
	},

	/**
	 * Sorts an Array based on key values, like an SQL ORDER BY clause
	 *
	 * @method keySort
	 * @memberOf array
	 * @param  {Array}  obj   Array to sort
	 * @param  {String} query Sort query, e.g. "name, age desc, country"
	 * @param  {String} sub   [Optional] Key which holds data, e.g. "{data: {}}" = "data"
	 * @return {Array}        Sorted Array
	 * @example
	 * var myArray = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}];
	 *
	 * array.keySort( myArray, "abc" );           // [{abc: 2, xyz: 5}, {abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}];
	 * array.keySort( myArray, "abc, xyz desc" ); // [{abc: 2, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 123124, xyz: 5}];
	 */
	keySort : function ( obj, query, sub ) {
		query       = query.replace( /\s*asc/ig, "" ).replace( /\s*desc/ig, " desc" );
		var queries = string.explode( query ).map( function ( i ) { return i.split( " " ); } ),
		    sorts   = [],
		    braceS  = "[\"",
		    braceE  = "\"]";

		if ( sub && sub !== "" ) {
			sub = "." + sub;
		}
		else {
			sub = "";
		}

		array.each( queries, function ( i ) {
			var s = ".",
			    e = "";

			if ( regex.not_dotnotation.test( i[0] ) ) {
				s = braceS;
				e = braceE;
			}

			sorts.push( "try {" );

			if ( i[1] === "desc" ) {
				sorts.push( "if ( a" + sub + s + i[0] + e + " < b" + sub + s + i[0] + e + " ) return 1;" );
				sorts.push( "if ( a" + sub + s + i[0] + e + " > b" + sub + s + i[0] + e + " ) return -1;" );
			}
			else {
				sorts.push( "if ( a" + sub + s + i[0] + e + " < b" + sub + s + i[0] + e + " ) return -1;" );
				sorts.push( "if ( a" + sub + s + i[0] + e + " > b" + sub + s + i[0] + e + " ) return 1;" );
			}

			sorts.push( "} catch (e) {" );
			sorts.push( "try {" );
			sorts.push( "if ( a" + sub + s + i[0] + e + " !== undefined ) return " + ( i[1] === "desc" ? "-1" : "1") + ";" );
			sorts.push( "} catch (e) {}" );
			sorts.push( "try {" );
			sorts.push( "if ( b" + sub + s + i[0] + e + " !== undefined ) return " + ( i[1] === "desc" ? "1" : "-1") + ";" );
			sorts.push( "} catch (e) {}" );
			sorts.push( "}" );
		} );

		sorts.push( "return 0;" );

		return obj.sort( new Function( "a", "b", sorts.join( "\n" ) ) );
	},

	/**
	 * Returns the last index of the Array
	 *
	 * @method last
	 * @memberOf array
	 * @param  {Array}  obj Array
	 * @param  {Number} arg [Optional] Negative offset from last index to return
	 * @return {Mixed}      Last index( s ) of Array
	 * @example
	 * var myArray = [1, 2, 3, 4];
	 *
	 * array.last( myArray );    // 4
	 * array.last( myArray, 2 ); // [3, 4]
	 */
	last : function ( obj, arg ) {
		var n = obj.length - 1;

		if ( arg >= ( n + 1 ) ) {
			return obj;
		}
		else if ( isNaN( arg ) || arg === 1 ) {
			return obj[n];
		}
		else {
			return array.limit( obj, ( n - ( --arg ) ), n );
		}
	},

	/**
	 * Returns a limited range of indices from the Array
	 *
	 * @method limit
	 * @memberOf array
	 * @param  {Array}  obj    Array to iterate
	 * @param  {Number} start  Starting index
	 * @param  {Number} offset Number of indices to return
	 * @return {Array}         Array of indices
	 * @example
	 * var myArray = [1, 2, 3, 4];
	 *
	 * array.limit( myArray, 0, 2 ); // [1, 2]
	 * array.limit( myArray, 2, 2 ); // [3, 4]
	 */
	limit : function ( obj, start, offset ) {
		var result = [],
		    i      = start - 1,
		    nth    = start + offset,
		    max    = obj.length;

		if ( max > 0 ) {
			while ( ++i < nth && i < max ) {
				result.push( obj[i] );
			}
		}

		return result;
	},

	/**
	 * Finds the maximum value in an Array
	 *
	 * @method max
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Mixed}     Number, String, etc.
	 * @example
	 * array.max( [5, 3, 9, 1, 4] ); // 9
	 */
	max : function ( obj ) {
		return array.last( obj.sort( array.sort ) );
	},

	/**
	 * Finds the mean of an Array
	 *
	 * @method mean
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Number}    Mean of the Array ( float or integer )
	 * @example
	 * array.mean( [1, 3, 5] ); // 3
	 */
	mean : function ( obj ) {
		return obj.length > 0 ? ( array.sum( obj ) / obj.length ) : undefined;
	},

	/**
	 * Finds the median value of an Array
	 *
	 * @method median
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Number}    Median number of the Array ( float or integer )
	 * @example
	 * array.median( [5, 1, 3, 8] ); // 4
	 * array.median( [5, 1, 3] );    // 3
	 */
	median : function ( obj ) {
		var nth    = obj.length,
		    mid    = number.round( nth / 2, "down" ),
		    sorted = obj.sort( array.sort );

		return number.odd( nth ) ? sorted[mid] : ( ( sorted[mid - 1] + sorted[mid] ) / 2 );
	},

	/**
	 * Merges `obj2` into `obj1`, excluding duplicate indices
	 *
	 * @method merge
	 * @memberOf array
	 * @param  {Array} obj1 Array to receive indices
	 * @param  {Array} obj2 Array to merge
	 * @return {Array}      First argument
	 * @example
	 * var a = ["a", "b", "c"],
	 *     b = ["d"];
	 *
	 * array.merge( a, b );
	 * a[3]; // "d"
	 */
	merge : function ( obj1, obj2 ) {
		array.each( obj2, function ( i ) {
			array.add( obj1, i );
		} );

		return obj1;
	},

	/**
	 * Finds the minimum value in an Array
	 *
	 * @method min
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Mixed}     Number, String, etc.
	 * @example
	 * array.min( [5, 3, 9, 1, 4] ); // 1
	 */
	min : function ( obj ) {
		return obj.sort( array.sort )[0];
	},

	/**
	 * Mingles Arrays and returns a 2D Array, corresponding index positions are paired
	 *
	 * @method mingle
	 * @memberOf array
	 * @param  {Array} obj1 Array to mingle
	 * @param  {Array} obj2 Array to mingle
	 * @return {Array}      2D Array
	 * @example
	 * var a = ["a", "b"],
	 *     b = ["c", "d"];
	 *
	 * array.mingle( a, b ); // [["a", "c"], ["b", "d"]]
	 */
	mingle : function ( obj1, obj2 ) {
		var result;

		result = obj1.map( function ( i, idx ) {
			return [i, obj2[idx]];
		} );

		return result;
	},

	/**
	 * Finds the mode value of an Array
	 *
	 * @method mode
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Mixed}     Mode value of the Array
	 * @example
	 * array.mode( [1, 3, 7, 1, 2, 10, 7, 7, 3, 10] );     // 7
	 * array.mode( [1, 3, 7, 1, 2, 10, 7, 7, 3, 10, 10] ); // [7, 10]
	 */
	mode : function ( obj ) {
		var values = {},
		    count  = 0,
		    mode   = [],
		    nth, result;

		// Counting values
		array.each( obj, function ( i ) {
			if ( !isNaN( values[i] ) ) {
				values[i]++;
			}
			else {
				values[i] = 1;
			}
		} );

		// Finding the highest occurring count
		count = array.max( array.cast( values ) );

		// Finding values that match the count
		utility.iterate( values, function ( v, k ) {
			if ( v === count ) {
				mode.push( number.parse( k ) );
			}
		} );

		// Determining the result
		nth = mode.length;

		if ( nth > 0 ) {
			result = nth === 1 ? mode[0] : mode;
		}

		return result;
	},

	/**
	 * Finds the range of the Array
	 *
	 * @method range
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Number}    Range of the array ( float or integer )
	 * @example
	 * array.range( [5, 1, 3, 8] ); // 7
	 */
	range : function ( obj ) {
		return array.max( obj ) - array.min( obj );
	},

	/**
	 * Searches a 2D Array `obj` for the first match of `arg` as a second index
	 *
	 * @method rassoc
	 * @memberOf array
	 * @param  {Array} obj 2D Array to search
	 * @param  {Mixed} arg Primitive to find
	 * @return {Mixed}     Array or undefined
	 * @example
	 * array.rassoc( [[1, 3], [7, 2], [4, 3]], 3 ); // [1, 3]
	 */
	rassoc : function ( obj, arg ) {
		var result;

		array.each( obj, function ( i, idx ) {
			if ( i[1] === arg ) {
				result = obj[idx];

				return false;
			}
		} );

		return result;
	},

	/**
	 * Returns Array containing the items in `obj` for which `fn` is not true
	 *
	 * @method reject
	 * @memberOf array
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to execute against `obj` indices
	 * @return {Array}        Array of indices which fn() is not true
	 * @example
	 * array.reject( [0, 1, 2, 3, 4, 5], function ( i ) { return i % 2 > 0; } ); // [0, 2, 4]
	 */
	reject : function ( obj, fn ) {
		return array.diff( obj, obj.filter( fn ) );
	},

	/**
	 * Removes indices from an Array without recreating it
	 *
	 * @method remove
	 * @memberOf array
	 * @param  {Array}  obj   Array to remove from
	 * @param  {Mixed}  start Starting index, or value to find within obj
	 * @param  {Number} end   [Optional] Ending index
	 * @return {Array}        Modified Array
	 * @example
	 * var myArray = ["a", "b", "c", "d", "e"];
	 *
	 * array.remove( myArray, 2, 3 );
	 * myArray[2]; // "e"
	 */
	remove : function ( obj, start, end ) {
		if ( isNaN( start ) ) {
			start = obj.indexOf( start );

			if ( start === -1 ) {
				return obj;
			}
		}
		else {
			start = start || 0;
		}

		var length    = obj.length,
		    remaining = obj.slice( ( end || start ) + 1 || length );

		obj.length = start < 0 ? ( length + start ) : start;
		obj.push.apply( obj, remaining );

		return obj;
	},

	/**
	 * Deletes every index of `obj` for which `fn` evaluates to true
	 *
	 * @method removeIf
	 * @memberOf array
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to test indices against
	 * @return {Array}        Array
	 * @example
	 * var myArray = ["a", "b", "c"];
	 *
	 * array.removeIf( myArray, function ( i ) { return /a|c/.test( i ); } );
	 * myArray[0]; // "b"
	 */
	removeIf : function ( obj, fn ) {
		var remove;

		if ( typeof fn != "function" ) {
			throw new Error( label.invalidArguments );
		}

		remove = obj.filter( fn );

		array.each( remove, function ( i ) {
			array.remove( obj, array.index ( obj, i ) );
		} );

		return obj;
	},

	/**
	 * Deletes indices of `obj` until `fn` evaluates to false
	 *
	 * @method removeWhile
	 * @memberOf array
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to test indices against
	 * @return {Array}        Array
	 * @example
	 * var myArray = ["a", "b", "c"];
	 *
	 * array.removeWhile( myArray, function ( i ) { return /a|c/.test( i ); } );
	 * myArray[0];     // "b"
	 * myarray.length; // 2
	 */
	removeWhile : function ( obj, fn ) {
		if ( typeof fn != "function" ) {
			throw new Error( label.invalidArguments );
		}

		var remove = [];

		array.each( obj, function ( i ) {
			if ( fn( i ) !== false ) {
				remove.push( i );
			}
			else {
				return false;
			}
		} );

		array.each( remove, function ( i ) {
			array.remove( obj, array.index( obj, i ) );
		} );

		return obj;
	},

	/**
	 * Replaces the contents of `obj1` with `obj2`
	 *
	 * @method replace
	 * @memberOf array
	 * @param  {Array} obj1 Array to modify
	 * @param  {Array} obj2 Array to values to push into `obj1`
	 * @return {Array}      Array to modify
	 * @example
	 * var myArray = ["a", "b", "c"];
	 *
	 * array.replace( myArray, [true, false] );
	 * myArray[0];     // true
	 * myarray.length; // 2
	 */
	replace : function ( obj1, obj2 ) {
		array.remove( obj1, 0, obj1.length );
		array.each( obj2, function ( i ) {
			obj1.push( i );
		} );

		return obj1;
	},

	/**
	 * Returns the "rest" of `obj` from `arg`
	 *
	 * @method rest
	 * @memberOf array
	 * @param  {Array}  obj Array to process
	 * @param  {Number} arg [Optional] Start position of subset of `obj` ( positive number only )
	 * @return {Array}      Array of a subset of `obj`
	 * @example
	 * array.rest( [1, 2, 3, 4, 5, 6] );    // [2, 3, 4, 5, 6]
	 * array.rest( [1, 2, 3, 4, 5, 6], 3 ); // [4, 5, 6]
	 */
	rest : function ( obj, arg ) {
		arg = arg || 1;

		if ( arg < 1 ) {
			arg = 1;
		}

		return array.limit( obj, arg, obj.length );
	},

	/**
	 * Finds the last index of `arg` in `obj`
	 *
	 * @method rindex
	 * @memberOf array
	 * @param  {Array} obj Array to search
	 * @param  {Mixed} arg Primitive to find
	 * @return {Mixed}     Index or undefined
	 * @example
	 * array.rindex( [1, 2, 3, 2, 1], 2 ); // 3
	 */
	rindex : function ( obj, arg ) {
		var result = -1;

		array.each( obj, function ( i, idx ) {
			if ( i === arg ) {
				result = idx;
			}
		} );

		return result;
	},

	/**
	 * Returns new Array with `arg` moved to the first index
	 *
	 * @method rotate
	 * @memberOf array
	 * @param  {Array}  obj Array to rotate
	 * @param  {Number} arg Index to become the first index, if negative the rotation is in the opposite direction
	 * @return {Array}      Newly rotated Array
	 * @example
	 * array.rotate( [0, 1, 2, 3, 4],  3 )[0] // 2;
	 * array.rotate( [0, 1, 2, 3, 4], -2 )[0] // 3;
	 */
	rotate : function ( obj, arg ) {
		var nth = obj.length,
		    result;

		if ( arg === 0 ) {
			result = obj;
		}
		else {
			if ( arg < 0 ) {
				arg += nth;
			}
			else {
				arg--;
			}

			result = array.limit( obj, arg, nth );
			result = result.concat( array.limit( obj, 0, arg ) );
		}

		return result;
	},

	/**
	 * Generates a series Array
	 *
	 * @method series
	 * @memberOf array
	 * @param  {Number} start  Start value the series
	 * @param  {Number} end    [Optional] The end of the series
	 * @param  {Number} offset [Optional] Offset for indices, default is 1
	 * @return {Array}         Array of new series
	 * @example
	 * array.series( 0, 5 );     // [0, 1, 2, 3, 4]
	 * array.series( 0, 25, 5 ); // [0, 5, 10, 15, 20]
	 */
	series : function ( start, end, offset ) {
		start      = start  || 0;
		end        = end    || start;
		offset     = offset || 1;
		var result = [],
		    n      = -1,
		    nth    = Math.max( 0, Math.ceil( ( end - start ) / offset ) );

		while ( ++n < nth ) {
			result[n]  = start;
			start     += offset;
		}

		return result;
	},

	/**
	 * Sorts the Array by parsing values
	 *
	 * @method sort
	 * @memberOf array
	 * @param  {Mixed} a Argument to compare
	 * @param  {Mixed} b Argument to compare
	 * @return {Number}  Number indicating sort order
	 * @example
	 * array.sort( 2, 3 ); // -1
	 */
	sort : function ( a, b ) {
		var types = {a: typeof a, b: typeof b},
		    c, d, result;

		if ( types.a === "number" && types.b === "number" ) {
			result = a - b;
		}
		else {
			c = a.toString();
			d = b.toString();

			if ( c < d ) {
				result = -1;
			}
			else if ( c > d ) {
				result = 1;
			}
			else if ( types.a === types.b ) {
				result = 0;
			}
			else if ( types.a === "boolean" ) {
				result = -1;
			}
			else {
				result = 1;
			}
		}

		return result;
	},

	/**
	 * Sorts `obj` using `sort`
	 *
	 * @method sorted
	 * @memberOf array
	 * @param  {Array} obj Array to sort
	 * @return {Array}     Sorted Array
	 * @example
	 * var myArray = [5, 9, 2, 4];
	 *
	 * array.sorted( myArray );
	 * myArray[0]; // 2
	 */
	sorted : function ( obj ) {
		return obj.sort( array.sort );
	},

	/**
	 * Splits an Array by divisor
	 *
	 * @method split
	 * @memberOf array
	 * @param  {Array}  obj     Array to process
	 * @param  {Number} divisor Integer to divide the Array by
	 * @return {Array}          Split Array
	 * @example
	 * var myArray = [],
	 *     i       = -1,
	 *     results;
	 *
	 * while ( ++i < 100 ) {
	 *   myarray.push( i + 1 );
	 * }
	 *
	 * results = array.split( myArray, 21 );
	 * results.length;     // 21
	 * results[0].length;  // 5
	 * results[19].length; // 4
	 * results[19][0];     // 99
	 * results[20].length; // 1
	 * results[20][0];     // 100
	 */
	split : function ( obj, divisor ) {
		var result  = [],
		    total   = obj.length,
		    nth     = Math.ceil( total / divisor ),
		    low     = Math.floor( total / divisor ),
		    lower   = Math.ceil( total / nth ),
		    lowered = false,
		    start   = 0,
		    i       = -1;

		// Finding the fold
		if ( number.diff( total, ( divisor * nth ) ) > nth ) {
			lower = total - ( low * divisor ) + low - 1;
		}
		else if ( total % divisor > 0 && lower * nth >= total ) {
			lower--;
		}

		while ( ++i < divisor ) {
			if ( i > 0 ) {
				start = start + nth;
			}

			if ( !lowered && lower < divisor && i === lower ) {
				--nth;
				lowered = true;
			}

			result.push( array.limit( obj, start, nth ) );
		}

		return result;
	},

	/**
	 * Finds the standard deviation of an Array
	 *
	 * @method stddev
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Number}    Standard deviation of the Array ( float or integer )
	 * @example
	 * array.stddev( [1, 3, 5] ); // 1.632993161855452
	 */
	stddev : function ( obj ) {
		return Math.sqrt( array.variance( obj ) );
	},

	/**
	 * Gets the summation of an Array
	 *
	 * @method sum
	 * @memberOf array
	 * @param  {Array} obj Array to sum
	 * @return {Number}    Summation of Array
	 * @example
	 * array.sum( [2, 4, 3, 1] ); // 10
	 */
	sum : function ( obj ) {
		var result = 0;

		if ( obj.length > 0 ) {
			result = obj.reduce( function ( prev, cur ) {
				return prev + cur;
			} );
		}

		return result;
	},

	/**
	 * Takes the first `n` indices from `obj`
	 *
	 * @method take
	 * @memberOf array
	 * @param  {Array}  obj Array to process
	 * @param  {Number} n   Offset from 0 to return
	 * @return {Array}      Subset of `obj`
	 * @example
	 * array.take( [1, 2, 3, 4], 2 ); // [1, 2]
	 */
	take : function ( obj, n ) {
		return array.limit( obj, 0, n );
	},

	/**
	 * Casts an Array to Object
	 *
	 * @method toObject
	 * @memberOf array
	 * @param  {Array} ar Array to transform
	 * @return {Object}   New object
	 * @example
	 * array.toObject( ["abc", "def"] ); // {0: "abc", 1: "def"}
	 */
	toObject : function ( ar ) {
		var obj = {},
		    i   = ar.length;

		while ( i-- ) {
			obj[i.toString()] = ar[i];
		}

		return obj;
	},

	/**
	 * Gets the total keys in an Array
	 *
	 * @method total
	 * @memberOf array
	 * @param  {Array} obj Array to find the length of
	 * @return {Number}    Number of keys in Array
	 * @example
	 * var myArray = [true, true, false];
	 *
	 * myarray.extra = true;
	 * array.total( myArray ); // 4
	 */
	total : function ( obj ) {
		return array.indexed( obj ).length;
	},

	/**
	 * Returns an Array of unique indices of `obj`
	 *
	 * @method unique
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Array}     Array of unique indices
	 * @example
	 * array.unique( ["a", "b", "a", "c", "b", "d"] ); // ["a", "b", "c", "d"]
	 */
	unique : function ( obj ) {
		var result = [];

		array.each( obj, function ( i ) {
			array.add( result, i );
		} );

		return result;
	},

	/**
	 * Finds the variance of an Array ( of numbers )
	 *
	 * @method variance
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Number}    Variance of the Array ( float or integer )
	 * @example
	 * array.variance( [1, 3, 5] ); // 2.6666666666666665
	 */
	variance : function ( obj ) {
		var nth = obj.length,
		    n   = 0,
		    mean;

		if ( nth > 0 ) {
			mean = array.mean( obj );

			array.each( obj, function ( i ) {
				n += math.sqr( i - mean );
			} );

			return n / nth;
		}
		else {
			return n;
		}
	},

	/**
	 * Converts any arguments to Arrays, then merges elements of `obj` with corresponding elements from each argument
	 *
	 * @method zip
	 * @memberOf array
	 * @param  {Array} obj  Array to transform
	 * @param  {Mixed} args Argument instance or Array to merge
	 * @return {Array}      Array
	 * @example
	 * array.zip( [0, 1], 1 ); // [[0, 1], [1, null]]
	 */
	zip : function ( obj, args ) {
		var result = [];

		// Preparing args
		if ( !( args instanceof Array ) ) {
			args = typeof args == "object" ? array.cast( args ) : [args];
		}

		array.each( args, function ( i, idx ) {
			if ( !( i instanceof Array ) ) {
				this[idx] = [i];
			}
		} );

		// Building result Array
		array.each( obj, function ( i, idx ) {
			result[idx] = [i];
			array.each( args, function ( x ) {
				result[idx].push( x[idx] || null );
			} );
		} );

		return result;
	}
};

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
	decode : function ( arg, silent ) {
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
	encode : function ( arg, silent ) {
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

/**
 * @namespace label
 * @private
 */
var label = {
	/**
	 * Expected a Number
	 *
	 * @type {String}
	 * @memberOf label
	 */
	expectedNumber : "Expected a Number",

	/**
	 * One or more arguments is invalid
	 *
	 * @type {String}
	 * @memberOf label
	 */
	invalidArguments : "One or more arguments is invalid"
};

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
	sqr : function ( n ) {
		return Math.pow( n, 2 );
	}
};

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
	diff : function ( num1, num2 ) {
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
	even : function ( arg ) {
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
	odd : function ( arg ) {
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
	parse : function ( arg, base ) {
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
	round : function ( arg, direction ) {
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

/**
 * Regex patterns used through retsu
 *
 * `url` was authored by Diego Perini
 *
 * @namespace regex
 * @private
 */
var regex = {
	bool            : /^(true|false)?$/,
	down            : /down/,
	not_dotnotation : /-|\s/,
	null_undefined  : /null|undefined/,
	primitive       : /^(boolean|function|number|string)$/,
	space_hyphen    : /\s|-/,
	url             : /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i
};

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

/**
 * @namespace utility
 * @private
 */
var utility = {
	/**
	 * Collection of timers
	 *
	 * @memberOf utility
	 * @type {Object}
	 */
	timer : {},

	/**
	 * Collection of repeating functions
	 *
	 * @memberOf utility
	 * @type {Object}
	 */
	repeating: {},

	/**
	 * Clears deferred & repeating functions
	 *
	 * @method clearTimers
	 * @memberOf utility
	 * @param  {String} id ID of timer( s )
	 * @return {Undefined} undefined
	 */
	clearTimers : function ( id ) {
		if ( id === undefined || string.isEmpty( id ) ) {
			throw new Error( label.invalidArguments );
		}

		// deferred
		if ( utility.timer[id] ) {
			clearTimeout( utility.timer[id] );
			delete utility.timer[id];
		}

		// repeating
		if ( utility.repeating[id] ) {
			clearTimeout( utility.repeating[id] );
			delete utility.repeating[id];
		}
	},

	/**
	 * Clones an Object
	 *
	 * @method clone
	 * @memberOf utility
	 * @param  {Object}  obj     Object to clone
	 * @param  {Boolean} shallow [Optional] Create a shallow clone, which doesn't maintain prototypes, default is `false`
	 * @return {Object}          Clone of obj
	 * @example
	 * var x = {a: true, b: false},
	 *     y = utility.clone( x, true );
	 *
	 * y.a; // true
	 */
	clone : function ( obj, shallow ) {
		var clone;

		if ( shallow === true ) {
			return obj !== undefined && obj !== null ? json.decode( json.encode( obj ) ) : obj;
		}
		else if ( !obj || regex.primitive.test( typeof obj ) || ( obj instanceof RegExp ) ) {
			return obj;
		}
		else if ( obj instanceof Array ) {
			return obj.slice();
		}
		else if ( !server && obj instanceof Document ) {
			return xml.decode( xml.encode( obj ) );
		}
		else if ( typeof obj.__proto__ != "undefined" ) {
			return utility.extend( obj.__proto__, obj );
		}
		else if ( obj instanceof Object ) {
			// If JSON encoding fails due to recursion, the original Object is returned because it's assumed this is for decoration
			clone = json.encode( obj, true );

			if ( clone !== undefined ) {
				clone = json.decode( clone );

				// Decorating Functions that would be lost with JSON encoding/decoding
				utility.iterate( obj, function ( v, k ) {
					if ( typeof v == "function" ) {
						clone[k] = v;
					}
				} );
			}
			else {
				clone = obj;
			}

			return clone;
		}
		else {
			return obj;
		}
	},

	/**
	 * Defers the execution of Function by at least the supplied milliseconds.
	 * Timing may vary under "heavy load" relative to the CPU & client JavaScript engine.
	 *
	 * @method defer
	 * @memberOf utility
	 * @param  {Function} fn     Function to defer execution of
	 * @param  {Number}   ms     Milliseconds to defer execution
	 * @param  {Number}   id     [Optional] ID of the deferred function
	 * @param  {Boolean}  repeat [Optional] Describes the execution, default is `false`
	 * @return {String}          ID of the timer
	 */
	defer : function ( fn, ms, id, repeat ) {
		var op;

		ms     = ms || 0;
		repeat = ( repeat === true );

		if ( id !== undefined ) {
			utility.clearTimers( id );
		}
		else {
			id = utility.uuid( true );
		}

		op = function () {
			utility.clearTimers( id );
			fn();
		};

		utility[repeat ? "repeating" : "timer"][id] = setTimeout( op, ms );

		return id;
	},

	/**
	 * Error handling, with history in `error.log`
	 *
	 * @method error
	 * @memberOf utility
	 * @param  {Mixed}   e       Error object or message to display
	 * @param  {Array}   args    Array of arguments from the callstack
	 * @param  {Mixed}   scope   Entity that was "this"
	 * @param  {Boolean} warning [Optional] Will display as console warning if true
	 * @return {Undefined}       undefined
	 */
	error : function ( e, args, scope, warning ) {
		var o = {
			"arguments" : args ? array.cast( args ) : [],
			message     : e.message || e,
			number      : e.number ? ( e.number & 0xFFFF ) : undefined,
			scope       : scope,
			stack       : e.stack || undefined,
			timestamp   : new Date().toUTCString(),
			type        : e.type || "TypeError"
		};

		utility.log( o.stack || o.message, warning !== true ? "error" : "warn" );

		return undefined;
	},

	/**
	 * Creates a "class" extending Object, with optional decoration
	 *
	 * @method extend
	 * @memberOf utility
	 * @param  {Object} obj Object to extend
	 * @param  {Object} arg [Optional] Object for decoration
	 * @return {Object}     Decorated obj
	 * @example
	 * var extendObj = utility.extend( someObj, {newProperty: value} );
	 */
	extend : function ( obj, arg ) {
		var o;

		if ( obj === undefined ) {
			throw new Error( label.invalidArguments );
		}

		o = Object.create( obj );

		if ( arg instanceof Object ) {
			utility.merge( o, arg );
		}

		return o;
	},

	/**
	 * Iterates an Object and executes a function against the properties.
	 * Returning `false` halts iteration.
	 *
	 * @method iterate
	 * @memberOf utility
	 * @param  {Object}   obj Object to iterate
	 * @param  {Function} fn  Function to execute against properties
	 * @return {Object}       Object
	 * @example
	 * utility.iterate( {...}, function ( value, key ) {
	 *   ...
	 * } );
	 */
	iterate : function ( obj, fn ) {
		if ( typeof fn != "function" ) {
			throw new Error( label.invalidArguments );
		}

		array.each( Object.keys( obj ), function ( i ) {
			return fn.call( obj, obj[i], i );
		} );

		return obj;
	},

	/**
	 * Writes argument to the console
	 *
	 * @method log
	 * @memberOf utility
	 * @param  {String} arg    String to write to the console
	 * @param  {String} target [Optional] Target console, default is "log"
	 * @return {Undefined}     undefined
	 * @example
	 * utility.log( "Something bad happened", "warn" );
	 */
	log : function ( arg, target ) {
		var ts, msg;

		if ( typeof console != "undefined" ) {
			ts  = typeof arg != "object";
			msg = ts ? "[" + new Date().toLocaleTimeString() + "] " + arg : arg;
			console[target || "log"]( msg );
		}
	},

	/**
	 * Merges obj with arg
	 *
	 * @method merge
	 * @memberOf utility
	 * @param  {Object} obj Object to decorate
	 * @param  {Object} arg Decoration
	 * @return {Object}     Decorated Object
	 * @example
	 * var obj = {a: true};
	 *
	 * util.merge( obj, {b: false} )
	 * obj.b; // false
	 */
	merge : function ( obj, arg ) {
		utility.iterate( arg, function ( v, k ) {
			if ( ( obj[k] instanceof Array ) && ( v instanceof Array ) ) {
				array.merge( obj[k], v );
			}
			else if ( ( obj[k] instanceof Object ) && ( v instanceof Object ) ) {
				utility.iterate( v, function ( x, y ) {
					obj[k][y] = utility.clone( x );
				} );
			}
			else {
				obj[k] = utility.clone( v );
			}
		} );

		return obj;
	},

	/**
	 * Creates a recursive function. Return false from the function to halt recursion.
	 *
	 * @method repeat
	 * @memberOf utility
	 * @param  {Function} fn  Function to execute repeatedly
	 * @param  {Number}   ms  Milliseconds to stagger the execution
	 * @param  {String}   id  [Optional] Timeout ID
	 * @param  {Boolean}  now Executes `fn` and then setup repetition, default is `true`
	 * @return {String}       Timeout ID
	 * @example
	 * utility.repeat( function () {
	 *   ...
	 *
	 *   // Cancelling repetition at some point in the future
	 *   if ( someCondition ) {
	 *     return false;
	 *   }
	 * }, 1000, "repeating" );
	 */
	repeat : function ( fn, ms, id, now ) {
		ms  = ms || 10;
		id  = id || utility.uuid( true );
		now = ( now !== false );

		// Could be valid to return false from initial execution
		if ( now && fn() === false ) {
			return;
		}

		// Creating repeating execution
		utility.defer( function () {
			var recursive = function ( fn, ms, id ) {
				var recursive = this;

				if ( fn() !== false ) {
					utility.repeating[id] = setTimeout( function () {
						recursive.call( recursive, fn, ms, id );
					}, ms );
				}
				else {
					delete utility.repeating[id];
				}
			};

			recursive.call( recursive, fn, ms, id );
		}, ms, id, true );

		return id;
	},

	/**
	 * Generates a version 4 UUID
	 *
	 * @method uuid
	 * @memberOf utility
	 * @param  {Boolean} strip [Optional] Strips - from UUID
	 * @return {String}        UUID
	 * @example
	 * var uuid4 = utility.uuid();
	 */
	uuid : function ( strip ) {
		var s = function () { return ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString( 16 ).substring( 1 ); },
		    r = [8, 9, "a", "b"],
		    o;

		o = ( s() + s() + "-" + s() + "-4" + s().substr( 0, 3 ) + "-" + r[Math.floor( Math.random() * 4 )] + s().substr( 0, 3 ) + "-" + s() + s() + s() );

		if ( strip === true ) {
			o = o.replace( /-/g, "" );
		}

		return o;
	}
};

/**
 * @namespace xml
 * @private
 */
var xml = {
	/**
	 * Returns XML (Document) Object from a String
	 *
	 * @method decode
	 * @memberOf xml
	 * @param  {String} arg XML String
	 * @return {Object}     XML Object or undefined
	 */
	decode : function ( arg ) {
		if ( typeof arg != "string" || string.isEmpty( arg ) ) {
			throw new Error( label.invalidArguments );
		}

		return new DOMParser().parseFromString( arg, "text/xml" );
	},

	/**
	 * Returns XML String from an Object or Array
	 *
	 * @method encode
	 * @memberOf xml
	 * @param  {Mixed} arg Object or Array to cast to XML String
	 * @return {String}    XML String or undefined
	 */
	encode : function ( arg, wrap ) {
		try {
			if ( arg === undefined ) {
				throw new Error( label.invalidArguments );
			}

			wrap    = ( wrap !== false );
			var x   = wrap ? "<xml>" : "",
			    top = ( arguments[2] !== false ),
			    node;

			/**
			 * Encodes a value as a node
			 *
			 * @method node
			 * @memberOf xml.encode
			 * @private
			 * @param  {String} name  Node name
			 * @param  {String} value Node value
			 * @return {String}       Node
			 */
			node = function ( name, value ) {
				var output = "<n>v</n>";

				output = output.replace( "v", ( regex.cdata.test( value ) ? "<![CDATA[" + value + "]]>" : value ) );
				return output.replace(/<(\/)?n>/g, "<$1" + name + ">");
			};

			if ( arg !== null && arg.xml ) {
				arg = arg.xml;
			}

			if ( arg instanceof Document ) {
				arg = ( new XMLSerializer() ).serializeToString( arg );
			}

			if ( regex.boolean_number_string.test( typeof arg ) ) {
				x += node( "item", arg );
			}
			else if ( typeof arg == "object" ) {
				utility.iterate( arg, function ( v, k ) {
					x += xml.encode( v, ( typeof v == "object" ), false ).replace( /item|xml/g, isNaN( k ) ? k : "item" );
				} );
			}

			x += wrap ? "</xml>" : "";

			if ( top ) {
				x = "<?xml version=\"1.0\" encoding=\"UTF8\"?>" + x;
			}

			return x;
		}
		catch ( e ) {
			utility.error( e, arguments, this );

			return undefined;
		}
	},

	/**
	 * Validates `arg` is XML
	 *
	 * @method valid
	 * @memberOf xml
	 * @param  {String} arg String to validate
	 * @return {Boolean}    `true` if valid XML
	 */
	valid : function ( arg ) {
		return ( xml.decode( arg ).getElementsByTagName( "parsererror" ).length === 0 );
	}
};

// Node, AMD & window supported
if ( typeof exports != "undefined" ) {
	module.exports = array;
}
else if ( typeof define == "function" ) {
	define( function () {
		return array;
	} );
}
else {
	global.retsu = array;
}
} )( this );
