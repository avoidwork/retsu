/**
 * @namespace array
 */
let array = {
	/**
	 * Adds 'arg' to 'obj' if it is not found
	 *
	 * @method add
	 * @memberOf array
	 * @param  {Array} obj Array to receive 'arg'
	 * @param  {Mixed} arg Argument to set in 'obj'
	 * @return {Array}     Array that was queried
	 * @example
	 * let myArray = [1, 2];
	 *
	 * array.add(myArray, 3); // [1, 2, 3]
	 * array.add(myArray, 1); // [1, 2, 3]
	 */
	add: function (obj, arg) {
		if (!array.contains( obj, arg )) {
			obj.push(arg);
		}

		return obj;
	},

	/**
	 * Preforms a binary search on a sorted Array
	 *
	 * @method binIndex
	 * @memberOf array
	 * @param  {Array} obj Array to search
	 * @param  {Mixed} arg Value to find index of
	 * @return {Number}    Index of `arg` within `obj`
	 * @example
	 * let myArray = [1, 5, 10, 15, 20, 25, ...];
	 *
	 * array.binIndex(myArray, 5); // 1
	 */
	binIndex: function (obj, arg) {
		let max = obj.length - 1;
		let min = 0;
		let idx = 0;
		let val = 0;

		while (min <= max) {
			idx = Math.floor(( min + max ) / 2);
			val = obj[ idx ];

			if (val < arg) {
				min = idx + 1;
			} else if (val > arg) {
				max = idx - 1;
			} else {
				return idx;
			}
		}

		return -1;
	},

	/**
	 * Returns an Object (NodeList, etc.) as an Array
	 *
	 * @method cast
	 * @memberOf array
	 * @param  {Object}  obj Object to cast
	 * @param  {Boolean} key [Optional] Returns key or value, only applies to Objects without a length property
	 * @return {Array}       Object as an Array
	 * @example
	 * array.cast(document.querySelectorAll( "..." ));
	 */
	cast: function (obj, key) {
		let o = [];

		if (!isNaN( obj.length )) {
			o = Array.from(obj);
		} else if (key === true) {
			o = array.keys(obj);
		} else {
			Object.keys(obj).forEach(function (i) {
				o.push(obj[i]);
			});
		}

		return o;
	},

	/**
	 * Transforms an Array to a 2D Array of chunks
	 *
	 * @method chunk
	 * @memberOf array
	 * @param  {Array}  obj  Array to process
	 * @param  {Number} size Chunk size (integer)
	 * @return {Array}       Chunked Array
	 * @example
	 * array.chunk([0, 1, 2, 3], 2); // [[0, 1], [2, 3]]
	 */
	chunk: function (obj, size) {
		let result = [];
		let nth = number.round(( obj.length / size ), "up");
		let start = 0;
		let i = -1;

		while (++i < nth) {
			start = i * size;
			result.push(array.limit( obj, start, size ));
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
	 * let myArray = [1, 2, 3, 4, 5];
	 *
	 * array.clear(myArray);
	 * myArray.length; // 0
	 */
	clear: function (obj) {
		return obj.length > 0 ? array.remove(obj, 0, obj.length) : obj;
	},

	/**
	 * Clones an Array
	 *
	 * @method clone
	 * @memberOf array
	 * @param  {Array}   obj     Array to clone
	 * @param  {Boolean} shallow [Optional] Default is `true`
	 * @return {Array}           Clone of Array
	 * @example
	 * let myArray      = [1, 2, 3, 4, 5],
	 *     myArrayClone = array.clone(myArray);
	 *
	 * myArrayClone.push(6);
	 *
	 * myArray.length;      // 5
	 * myArrayClone.length; // 6
	 */
	clone: function (obj, shallow=true) {
		return utility.clone(obj, shallow);
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
	 * if (array.contains( [1], 1 )) { ... }
	 */
	contains: function (obj, arg) {
		return obj.indexOf(arg) > -1;
	},

	/**
	 * Facade of `Array.map()`
	 *
	 * @method collect
	 * @memberOf array
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to execute against indices
	 * @return {Array}        New Array
	 * @example
	 * let results = array.collect([...], function (...) { ... });
	 */
	collect: function (obj, fn) {
		return obj.map(fn);
	},

	/**
	 * Compacts a Array by removing `null` or `undefined` indices
	 *
	 * @method compact
	 * @memberOf array
	 * @param  {Array}   obj  Array to compact
	 * @param  {Boolean} diff Indicates to return resulting Array only if there's a difference
	 * @return {Array}        Compacted copy of `obj`, or null (if `diff` is passed & no diff is found)
	 * @example
	 * array.compact([null, "a", "b", "c", null, "d"]); // ["a", "b", "c", "d"]
	 * array.compact(["a", "b", "c", "d"], true);       // null
	 */
	compact: function (obj, diff) {
		let result = obj.filter( function (i) {
			return !regex.null_undefined.test(i);
		} );

		return diff !== true ? result : (result.length < obj.length ? result : null);
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
	 * array.count(["apple", "banana", "orange", "apple"], "apple"); // 2
	 */
	count: function (obj, value) {
		return obj.filter( function (i) {
			return (i === value);
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
	 * array.diff(["a"], ["a", "b"]); // ["b"]
	 */
	diff: function (obj1, obj2) {
		let result;

		result = obj1.filter( function (i) {
			return !array.contains(obj2, i);
		} );

		result = result.concat( obj2.filter( function (i) {
			return !array.contains(obj1, i);
		} ) );

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
	 * array.each([ ... ], function (...) { ... });
	 * array.each([ ... ], function (...) { ... }, true, 100); // processing batches of a 100
	 */
	each: function (obj, fn, async, size=10) {
		let nth = obj.length;
		let i, offset;

		if (async !== true) {
			i = -1;
			while (++i < nth) {
				if (fn.call( obj, obj[ i ], i ) === false) {
					break;
				}
			}
		} else {
			offset = 0;

			if (size > nth) {
				size = nth;
			}

			utility.repeat( function () {
				let i = -1;
				let idx;

				while (++i < size) {
					idx = i + offset;

					if (idx === nth || fn.call( obj, obj[ idx ], idx ) === false) {
						return false;
					}
				}

				offset += size;

				if (offset >= nth) {
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
	 * array.eachReverse([ ... ], function (...) { ... });
	 * array.eachReverse([ ... ], function (...) { ... }, true, 100); // processing batches of a 100
	 */
	eachReverse: function (obj, fn, async, size) {
		let nth = obj.length;
		let i, offset;

		if (async !== true) {
			i = nth;
			while (--i > -1) {
				if (fn.call( obj, obj[ i ], i ) === false) {
					break;
				}
			}
		} else {
			size = size || 10;
			offset = nth - 1;

			if (size > nth) {
				size = nth;
			}

			utility.repeat( function () {
				let i = -1;
				let idx;

				while (++i < size) {
					idx = offset - i;

					if (idx < 0 || fn.call( obj, obj[ idx ], idx ) === false) {
						return false;
					}
				}

				offset -= size;

				if (offset < 0) {
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
	 * array.empty([]);    // true
	 * array.empty(["a"]); // false
	 */
	empty: function (obj) {
		return obj.length === 0;
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
	 * array.equal(["a"], ["a"]);      // true
	 * array.equal(["a"], ["a", "b"]); // false
	 */
	equal: function (obj1, obj2) {
		return JSON.stringify(obj1 ) === JSON.stringify( obj2);
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
	 * let myArray = ["a", "b", "c"];
	 *
	 * array.fill(myArray, function (i) { return i + "a"; });
	 * myArray[0]; // "aa"
	 */
	fill: function (obj, arg, start, offset) {
		let fn = typeof arg === "function";
		let l = obj.length;
		let i = !isNaN(start) ? start : 0;
		let nth = !isNaN(offset) ? i + offset : l - 1;

		if (nth > ( l - 1 )) {
			nth = l - 1;
		}

		if (fn) {
			while (i <= nth) {
				obj[ i ] = arg(obj[ i ]);
				i++;
			}
		} else {
			while (i <= nth) {
				obj[ i ] = arg;
				i++;
			}
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
	 * array.first(["a", "b"]); // "a"
	 */
	first: function (obj) {
		return obj[ 0 ];
	},

	/**
	 * Flattens a 2D Array
	 *
	 * @method flat
	 * @memberOf array
	 * @param  {Array} obj 2D Array to flatten
	 * @return {Array}     Flatten Array
	 * @example
	 * array.flat([[0, 1], [2, 3]]); // [0, 1, 2, 3]
	 */
	flat: function (obj) {
		let result = [];

		result = obj.reduce( function (a, b) {
			return a.concat(b);
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
	 * array.forEach([ ... ], function (...) { ... });
	 * array.forEach([ ... ], function (...) { ... }, true, 100); // processing batches of a 100
	 */
	forEach: function (obj, fn, async, size) {
		return array.each(obj, fn, async, size);
	},

	/**
	 * Creates a 2D Array from an Object
	 *
	 * @method fromObject
	 * @memberOf array
	 * @param  {Object} obj Object to convert
	 * @return {Array}      2D Array
	 * @example
	 * array.fromObject({name: "John", sex: "male"}); // [["name", "John"], ["sex", "male"]]
	 */
	fromObject: function (obj) {
		return array.mingle(array.keys( obj ), array.cast( obj ));
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
	 * array.index(["a", "b", "c"], "b"); // 1
	 */
	index: function (obj, arg) {
		return obj.indexOf(arg);
	},

	/**
	 * Returns an Associative Array as an Indexed Array
	 *
	 * @method indexed
	 * @memberOf array
	 * @param  {Array} obj Array to index
	 * @return {Array}     Indexed Array
	 * @example
	 * let myArray = ["a", "b", "c"];
	 *
	 * myArray.prop = "d";
	 * array.indexed(myArray); ["a", "b", "c", "d"];
	 */
	indexed: function (obj) {
		let result = [];

		utility.iterate( obj, function (v) {
			result.push(v);
		} );

		return result;
	},

	/**
	 * Finds the intersections between obj1 and obj2
	 *
	 * @method intersect
	 * @memberOf array
	 * @param  {Array} obj1 Source Array
	 * @param  {Array} obj2 Comparison Array
	 * @return {Array}      Array of the intersections
	 * @example
	 * array.intersect(["a", "b", "d"], ["b", "c", "d"]); // ["b", "d"]
	 */
	intersect: function (obj1, obj2) {
		let a = obj1.length > obj2.length ? obj1 : obj2;
		let b = (a === obj1 ? obj2 : obj1);

		return a.filter( function (key) {
			return array.contains(b, key);
		} );
	},

	/**
	 * Iterates an Array using an Iterator
	 *
	 * @method iterate
	 * @memberOf array
	 * @param  {Array} obj Array to iterate
	 * @return {Array}     Array to iterate
	 */
	iterate: function (obj, fn) {
		let itr = array.iterator(obj);
		let i = -1;
		let item, next;

		do {
			item = itr.next();

			if (!item.done) {
				next = fn(item.value, ++i);
			}
			else {
				next = false;
			}
		} while (next !== false);

		return obj;
	},

	/**
	 * Creates an Array generator to iterate the indices
	 *
	 * @method iterator
	 * @memberOf array
	 * @param  {Array} obj Array to iterate
	 * @return {Function}  Generator
	 */
	iterator: function (obj) {
		let i = -1;
		let n = obj.length;

		return {
			next () {
				if (++i < n) {
					return { done: false, value: obj[ i ] };
				} else {
					return { done: true };
				}
			}
		};
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
	 * array.intersect(["a", "b", "d"], ["b", "c", "d"]); // ["b", "d"]
	 */
	intersect: function (obj1, obj2) {
		let a = obj1.length > obj2.length ? obj1 : obj2,
			b = (a === obj1 ? obj2 : obj1);

		return a.filter( function (key) {
			return array.contains(b, key);
		} );
	},

	/**
	 * Keeps every element of `obj` for which `fn` evaluates to true
	 *
	 * @method keepIf
	 * @memberOf array
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to test indices against
	 * @return {Array}        Array
	 * @example
	 * let myArray = ["a", "b", "c"];
	 *
	 * array.keepIf(myArray, function (i ) { return /a|c/.test( i); });
	 * myArray[1]; // "c"
	 */
	keepIf: function (obj, fn) {
		let result, remove;

		result = obj.filter(fn);
		remove = array.diff(obj, result);

		array.each( remove, function (i) {
			array.remove(obj, array.index( obj, i ));
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
	 * array.keys({abc: true, xyz: false}); // ["abc", "xyz"]
	 */
	keys: function (obj) {
		return Object.keys(obj);
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
	 * let myArray = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}];
	 *
	 * array.keySort(myArray, "abc");           // [{abc: 2, xyz: 5}, {abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}];
	 * array.keySort(myArray, "abc, xyz desc"); // [{abc: 2, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 123124, xyz: 5}];
	 */
	keySort: function (obj, query, sub) {
		query = query.replace(/\s*asc/ig, "" ).replace( /\s*desc/ig, " desc");

		let queries = string.explode(query ).map( function (i ) { return i.split( " "); });
		let sorts = [];
		let braceS = "[\"";
		let braceE = "\"]";

		if (sub && sub !== "") {
			sub = "." + sub;
		} else {
			sub = "";
		}

		array.each( queries, function (i) {
			let s = ".";
			let e = "";

			if (regex.not_dotnotation.test( i[ 0 ] )) {
				s = braceS;
				e = braceE;
			}

			sorts.push("try {");

			if (i[ 1 ] === "desc") {
				sorts.push("if ( a" + sub + s + i[ 0 ] + e + " < b" + sub + s + i[ 0 ] + e + " ) return 1;");
				sorts.push("if ( a" + sub + s + i[ 0 ] + e + " > b" + sub + s + i[ 0 ] + e + " ) return -1;");
			} else {
				sorts.push("if ( a" + sub + s + i[ 0 ] + e + " < b" + sub + s + i[ 0 ] + e + " ) return -1;");
				sorts.push("if ( a" + sub + s + i[ 0 ] + e + " > b" + sub + s + i[ 0 ] + e + " ) return 1;");
			}

			sorts.push("} catch (e) {");
			sorts.push("try {");
			sorts.push("if ( a" + sub + s + i[ 0 ] + e + " !== undefined ) return " + ( i[ 1 ] === "desc" ? "-1" : "1") + ";");
			sorts.push("} catch (e) {}");
			sorts.push("try {");
			sorts.push("if ( b" + sub + s + i[ 0 ] + e + " !== undefined ) return " + ( i[ 1 ] === "desc" ? "1" : "-1") + ";");
			sorts.push("} catch (e) {}");
			sorts.push("}");
		} );

		sorts.push("return 0;");

		return obj.sort(new Function( "a", "b", sorts.join( "\n" ) ));
	},

	/**
	 * Returns the last index of the Array
	 *
	 * @method last
	 * @memberOf array
	 * @param  {Array}  obj Array
	 * @param  {Number} arg [Optional] Negative offset from last index to return
	 * @return {Mixed}      Last index(s) of Array
	 * @example
	 * let myArray = [1, 2, 3, 4];
	 *
	 * array.last(myArray);    // 4
	 * array.last(myArray, 2); // [3, 4]
	 */
	last: function (obj, arg) {
		let n = obj.length - 1;

		if (arg >= ( n + 1 )) {
			return obj;
		} else if (isNaN( arg ) || arg === 1) {
			return obj[ n ];
		} else {
			return array.limit(obj, ( n - ( --arg ) ), n);
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
	 * let myArray = [1, 2, 3, 4];
	 *
	 * array.limit(myArray, 0, 2); // [1, 2]
	 * array.limit(myArray, 2, 2); // [3, 4]
	 */
	limit: function (obj, start, offset) {
		let result = [];
		let i = start - 1;
		let nth = start + offset;
		let max = obj.length;

		if (max > 0) {
			while (++i < nth && i < max) {
				result.push(obj[ i ]);
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
	 * array.max([5, 3, 9, 1, 4]); // 9
	 */
	max: function (obj) {
		return array.last(array.sorted( array.clone( obj ) ));
	},

	/**
	 * Finds the mean of an Array (of numbers)
	 *
	 * @method mean
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Number}    Mean of the Array (float or integer)
	 * @example
	 * array.mean([1, 3, 5]); // 3
	 */
	mean: function (obj) {
		return obj.length > 0 ? (array.sum( obj ) / obj.length) : undefined;
	},

	/**
	 * Finds the median value of an Array (of numbers)
	 *
	 * @method median
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Number}    Median number of the Array (float or integer)
	 * @example
	 * array.median([5, 1, 3, 8]); // 4
	 * array.median([5, 1, 3]);    // 3
	 */
	median: function (obj) {
		let dupe = array.sorted(array.clone( obj ));
		let nth = dupe.length;
		let mid = number.round(nth / 2, "down");

		return number.odd(nth ) ? dupe[ mid ]: ( ( dupe[ mid - 1 ] + dupe[ mid ] ) / 2);
	},

	/**
	 * Merges `arg` into `obj`, excluding duplicate indices
	 *
	 * @method merge
	 * @memberOf array
	 * @param  {Array} obj1 Array to receive indices
	 * @param  {Array} obj2 Array to merge
	 * @return {Array}      First argument
	 * @example
	 * let a = ["a", "b", "c"],
	 *     b = ["d"];
	 *
	 * array.merge(a, b);
	 * a[3]; // "d"
	 */
	merge: function (obj1, obj2) {
		array.each( obj2, function (i) {
			array.add(obj1, i);
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
	 * array.min([5, 3, 9, 1, 4]); // 1
	 */
	min: function (obj) {
		return array.sorted(array.clone( obj ))[ 0 ];
	},

	/**
	 * Mingles Arrays and returns a 2D Array
	 *
	 * @method mingle
	 * @memberOf array
	 * @param  {Array} obj1 Array to mingle
	 * @param  {Array} obj2 Array to mingle
	 * @return {Array}      2D Array
	 * @example
	 * let a = ["a", "b"],
	 *     b = ["c", "d"];
	 *
	 * array.mingle(a, b); // [["a", "c"], ["b", "d"]]
	 */
	mingle: function (obj1, obj2) {
		let result = obj1.map( function (i, idx) {
			return [ i, obj2[ idx ] ];
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
	 * array.mode([1, 3, 7, 1, 2, 10, 7, 7, 3, 10]);     // 7
	 * array.mode([1, 3, 7, 1, 2, 10, 7, 7, 3, 10, 10]); // [7, 10]
	 */
	mode: function (obj) {
		let values = {};
		let count = 0;
		let mode = [];
		let nth, result;

		// Counting values
		array.each( obj, function (i) {
			if (!isNaN( values[ i ] )) {
				values[ i ]++;
			} else {
				values[ i ] = 1;
			}
		} );

		// Finding the highest occurring count
		count = array.max(array.cast( values ));

		// Finding values that match the count
		utility.iterate( values, function (v, k) {
			if (v === count) {
				mode.push(number.parse( k ));
			}
		} );

		// Determining the result
		nth = mode.length;

		if (nth > 0) {
			result = nth === 1 ? mode[ 0 ] : mode;
		}

		return result;
	},

	/**
	 * Finds the range of the Array (of numbers) values
	 *
	 * @method range
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Number}    Range of the array (float or integer)
	 * @example
	 * array.range([5, 1, 3, 8]); // 7
	 */
	range: function (obj) {
		return array.max(obj ) - array.min( obj);
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
	 * array.rassoc([[1, 3], [7, 2], [4, 3]], 3); // [1, 3]
	 */
	rassoc: function (obj, arg) {
		let result;

		array.each( obj, function (i, idx) {
			if (i[ 1 ] === arg) {
				result = utility.clone(obj[ idx ], true);

				return false;
			}
		} );

		return result;
	},

	/**
	 * Returns Array containing the items in `obj` for which `fn()` is not true
	 *
	 * @method reject
	 * @memberOf array
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to execute against `obj` indices
	 * @return {Array}        Array of indices which fn() is not true
	 * @example
	 * array.reject([0, 1, 2, 3, 4, 5], function (i) { return i % 2 > 0; }); // [0, 2, 4]
	 */
	reject: function (obj, fn) {
		return array.diff(obj, obj.filter( fn ));
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
	 * let myArray = ["a", "b", "c", "d", "e"];
	 *
	 * array.remove(myArray, 2, 3);
	 * myArray[2]; // "e"
	 */
	remove: function (obj, start, end) {
		if (isNaN( start )) {
			start = array.index(obj, start);

			if (start === -1) {
				return obj;
			}
		} else {
			start = start || 0;
		}

		let length = obj.length;
		let remaining = obj.slice(( end || start ) + 1 || length);

		obj.length = start < 0 ? (length + start) : start;
		obj.push.apply(obj, remaining);

		return obj;
	},

	/**
	 * Deletes every element of `obj` for which `fn` evaluates to true
	 *
	 * @method removeIf
	 * @memberOf array
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to test indices against
	 * @return {Array}        Array
	 * @example
	 * let myArray = ["a", "b", "c"];
	 *
	 * array.removeIf(myArray, function (i ) { return /a|c/.test( i); });
	 * myArray[0]; // "b"
	 */
	removeIf: function (obj, fn) {
		let remove = obj.filter(fn);

		array.each( remove, function (i) {
			array.remove(obj, array.index( obj, i ));
		} );

		return obj;
	},

	/**
	 * Deletes elements of `obj` until `fn` evaluates to false
	 *
	 * @method removeWhile
	 * @memberOf array
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to test indices against
	 * @return {Array}        Array
	 * @example
	 * let myArray = ["a", "b", "c"];
	 *
	 * array.removeWhile(myArray, function (i ) { return /a|c/.test( i); });
	 * myArray[0];     // "b"
	 * myArray.length; // 2
	 */
	removeWhile: function (obj, fn) {
		let remove = [];

		array.each( obj, function (i) {
			if (fn( i ) !== false) {
				remove.push(i);
			} else {
				return false;
			}
		} );

		array.each( remove, function (i) {
			array.remove(obj, array.index( obj, i ));
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
	 * let myArray = ["a", "b", "c"];
	 *
	 * array.replace(myArray, [true, false]);
	 * myArray[0];     // true
	 * myArray.length; // 2
	 */
	replace: function (obj1, obj2) {
		array.remove(obj1, 0, obj1.length);
		array.each( obj2, function (i) {
			obj1.push(i);
		} );

		return obj1;
	},

	/**
	 * Returns the "rest" of `obj` from `arg`
	 *
	 * @method rest
	 * @memberOf array
	 * @param  {Array}  obj Array to process
	 * @param  {Number} arg [Optional] Start position of subset of `obj` (positive number only)
	 * @return {Array}      Array of a subset of `obj`
	 * @example
	 * array.rest([1, 2, 3, 4, 5, 6]);    // [2, 3, 4, 5, 6]
	 * array.rest([1, 2, 3, 4, 5, 6], 3); // [4, 5, 6]
	 */
	rest: function (obj, arg=1) {
		if (arg < 1) {
			arg = 1;
		}

		return array.limit(obj, arg, obj.length);
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
	 * array.rindex([1, 2, 3, 2, 1], 2); // 3
	 */
	rindex: function (obj, arg) {
		let result = -1;

		array.each( obj, function (i, idx) {
			if (i === arg) {
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
	 * array.rotate([0, 1, 2, 3, 4],  3)[0] // 2;
	 * array.rotate([0, 1, 2, 3, 4], -2)[0] // 3;
	 */
	rotate: function (obj, arg) {
		let nth = obj.length;
		let result;

		if (arg === 0) {
			result = obj;
		} else {
			if (arg < 0) {
				arg += nth;
			} else {
				arg--;
			}

			result = array.limit(obj, arg, nth);
			result = result.concat(array.limit( obj, 0, arg ));
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
	 * array.series(0, 5);     // [0, 1, 2, 3, 4]
	 * array.series(0, 25, 5); // [0, 5, 10, 15, 20]
	 */
	series: function (start=0, end=undefined, offset=1) {
		end = end || start;

		let result = [];
		let n = -1;
		let nth = Math.max(0, Math.ceil( ( end - start ) / offset ));

		while (++n < nth) {
			result[ n ] = start;
			start += offset;
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
	 * array.sort(2, 3); // -1
	 */
	sort: function (a, b) {
		let types = { a: typeof a, b: typeof b };
		let c, d, result;

		if (types.a === "number" && types.b === "number") {
			result = a - b;
		} else {
			c = a.toString();
			d = b.toString();

			if (c < d) {
				result = -1;
			} else if (c > d) {
				result = 1;
			} else if (types.a === types.b) {
				result = 0;
			} else if (types.a === "boolean") {
				result = -1;
			} else {
				result = 1;
			}
		}

		return result;
	},

	/**
	 * Sorts `obj` using `array.sort`
	 *
	 * @method sorted
	 * @memberOf array
	 * @param  {Array} obj Array to sort
	 * @return {Array}     Sorted Array
	 * @example
	 * let myArray = [5, 9, 2, 4];
	 *
	 * array.sorted(myArray);
	 * myArray[0]; // 2
	 */
	sorted: function (obj) {
		return obj.sort(array.sort);
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
	 * let myArray = [],
	 *     i       = -1,
	 *     results;
	 *
	 * while (++i < 100) {
			 *   myArray.push(i + 1);
			 * }
	 *
	 * results = array.split(myArray, 21);
	 * results.length;     // 21
	 * results[0].length;  // 5
	 * results[19].length; // 4
	 * results[19][0];     // 99
	 * results[20].length; // 1
	 * results[20][0];     // 100
	 */
	split: function (obj, divisor) {
		let result = [];
		let total = obj.length;
		let nth = Math.ceil(total / divisor);
		let low = Math.floor(total / divisor);
		let lower = Math.ceil(total / nth);
		let lowered = false;
		let start = 0;
		let i = -1;

		// Finding the fold
		if (number.diff( total, ( divisor * nth ) ) > nth) {
			lower = total - (low * divisor) + low - 1;
		} else if (total % divisor > 0 && lower * nth >= total) {
			lower--;
		}

		while (++i < divisor) {
			if (i > 0) {
				start = start + nth;
			}

			if (!lowered && lower < divisor && i === lower) {
				--nth;
				lowered = true;
			}

			result.push(array.limit( obj, start, nth ));
		}

		return result;
	},

	/**
	 * Finds the standard deviation of an Array (of numbers)
	 *
	 * @method stddev
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Number}    Standard deviation of the Array (float or integer)
	 * @example
	 * array.stddev([1, 3, 5]); // 1.632993161855452
	 */
	stddev: function (obj) {
		return Math.sqrt(array.variance( obj ));
	},

	/**
	 * Gets the summation of an Array of numbers
	 *
	 * @method sum
	 * @memberOf array
	 * @param  {Array} obj Array to sum
	 * @return {Number}    Summation of Array
	 * @example
	 * array.sum([2, 4, 3, 1]); // 10
	 */
	sum: function (obj) {
		let result = 0;

		if (obj.length > 0) {
			result = obj.reduce( function (prev, cur) {
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
	 * array.take([1, 2, 3, 4], 2); // [1, 2]
	 */
	take: function (obj, n) {
		return array.limit(obj, 0, n);
	},

	/**
	 * Casts an Array to Object
	 *
	 * @method toObject
	 * @memberOf array
	 * @param  {Array} ar Array to transform
	 * @return {Object}   New object
	 * @example
	 * array.toObject(["abc", "def"]); // {0: "abc", 1: "def"}
	 */
	toObject: function (ar) {
		let obj = {};
		let i = ar.length;

		while (i--) {
			obj[ i.toString() ] = ar[ i ];
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
	 * let myArray = [true, true, false];
	 *
	 * myArray.extra = true;
	 * array.total(myArray); // 4
	 */
	total: function (obj) {
		return array.indexed(obj).length;
	},

	/**
	 * Returns an Array of unique indices of `obj`
	 *
	 * @method unique
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Array}     Array of unique indices
	 * @example
	 * array.unique(["a", "b", "a", "c", "b", "d"]); // ["a", "b", "c", "d"]
	 */
	unique: function (obj) {
		let result = [];

		array.each( obj, function (i) {
			array.add(result, i);
		} );

		return result;
	},

	/**
	 * Finds the variance of an Array (of numbers)
	 *
	 * @method variance
	 * @memberOf array
	 * @param  {Array} obj Array to process
	 * @return {Number}    Variance of the Array (float or integer)
	 * @example
	 * array.variance([1, 3, 5]); // 2.6666666666666665
	 */
	variance: function (obj) {
		let nth = obj.length;
		let n = 0;
		let mean;

		if (nth > 0) {
			mean = array.mean(obj);

			array.each( obj, function (i) {
				n += math.sqr(i - mean);
			} );

			return n / nth;
		} else {
			return n;
		}
	},

	/**
	 * Library version
	 *
	 * @type {String}
	 */
	version: "{{VERSION}}",

	/**
	 * Converts any arguments to Arrays, then merges elements of `obj` with corresponding elements from each argument
	 *
	 * @method zip
	 * @memberOf array
	 * @param  {Array} obj  Array to transform
	 * @param  {Mixed} args Argument instance or Array to merge
	 * @return {Array}      Array
	 * @example
	 * array.zip([0, 1], 1); // [[0, 1], [1, null]]
	 */
	zip: function (obj, args) {
		let result = [];

		// Preparing args
		if (!( args instanceof Array )) {
			args = typeof args === "object" ? array.cast(args) : [ args ];
		}

		array.each( args, function (i, idx) {
			if (!( i instanceof Array )) {
				args[ idx ] = [ i ];
			}
		} );

		// Building result Array
		array.each( obj, function (i, idx) {
			result[ idx ] = [ i ];
			array.each( args, function (x) {
				result[ idx ].push(x[ idx ] || null);
			} );
		} );

		return result;
	}
};