/**
 * Array micro library focused on speed
 *
 * @copyright 2015 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @link http://avoidwork.github.io/retsu
 * @module retsu
 * @version 2.0.0
 */
"use strict";

(function (global) {

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
   * let myArray = [1, 2];
   *
   * array.add(myArray, 3); // [1, 2, 3]
   * array.add(myArray, 1); // [1, 2, 3]
   */
		add: function add(obj, arg) {
			if (!array.contains(obj, arg)) {
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
		binIndex: function binIndex(obj, arg) {
			var max = obj.length - 1,
			    min = 0,
			    idx = 0,
			    val = 0,
			    result = -1;

			while (min <= max) {
				idx = Math.floor((min + max) / 2);
				val = obj[idx];

				if (val < arg) {
					min = idx + 1;
				} else if (val > arg) {
					max = idx - 1;
				} else {
					result = idx;
					break;
				}
			}

			return result;
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
   * array.cast(document.querySelectorAll("..."));
   */
		cast: function cast(obj) {
			var key = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			var result = undefined;

			if (key === true) {
				result = Object.keys(obj);
			} else if (!isNaN(obj.length)) {
				result = Array.from(obj);
			} else {
				result = Object.keys(obj).map(function (i) {
					return obj[i];
				});
			}

			return result;
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
		chunk: function chunk(obj, size) {
			var result = [],
			    nth = Math.ceil(obj.length / size),
			    start = 0,
			    i = -1;

			while (++i < nth) {
				start = i * size;
				result.push(array.limit(obj, start, size));
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
		clear: function clear(obj) {
			return array.remove(obj, 0, obj.length);
		},

		/**
   * Shallow clones an Array
   *
   * @method clone
   * @memberOf array
   * @param  {Array} obj Array to clone
   * @return {Array}     Clone of Array
   * @example
   * let myArray      = [1, 2, 3, 4, 5],
   *     myArrayClone = array.clone(myArray);
   *
   * myArrayClone.push(6);
   *
   * myArray.length;      // 5
   * myArrayClone.length; // 6
   */
		clone: function clone(obj) {
			return JSON.parse(JSON.stringify(obj));
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
   * if (array.contains([1], 1)) { ... }
   */
		contains: function contains(obj, arg) {
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
		collect: function collect(obj, fn) {
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
		compact: function compact(obj) {
			var diff = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			var result = obj.filter(function (i) {
				return i !== null && i !== undefined;
			});

			return diff !== true ? result : result.length < obj.length ? result : null;
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
		count: function count(obj, value) {
			return obj.filter(function (i) {
				return i === value;
			}).length;
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
		diff: function diff(a, b) {
			return a.filter(function (i) {
				return !array.contains(b, i);
			}).concat(b.filter(function (i) {
				return !array.contains(a, i);
			}));
		},

		/**
   * Iterates `obj` and executes `fn` with arguments [`value`, `index`].
   * Returning `false` halts iteration.
   *
   * @method each
   * @memberOf array
   * @param  {Array}    obj Array to iterate
   * @param  {Function} fn  Function to execute on index values
   * @param  {Mixed}    ctx [Optional] Context for `fn`
   * @return {Array}        Array
   * @example
   * array.each([...], function (...) { ... });
   * array.each([...], function (...) { ... }, true, 100); // processing batches of a 100
   */
		each: function each(obj, fn) {
			var ctx = arguments.length <= 2 || arguments[2] === undefined ? fn : arguments[2];
			return (function () {
				var nth = obj.length,
				    i = -1;

				while (++i < nth) {
					if (ctx.call(obj, obj[i], i) === false) {
						break;
					}
				}

				return obj;
			})();
		},

		/**
   * Iterates `obj` asynchronously and executes `fn` with arguments [`value`, `index`].
   * Returning `false` halts iteration.
   *
   * @method each
   * @memberOf array
   * @param  {Array}    obj   Array to iterate
   * @param  {Function} fn    Function to execute on index values
   * @param  {Number}   size  Function to execute on index values
   * @param  {Mixed}    ctx   [Optional] Context for `fn`
   * @return {Array}          Array
   * @example
   * array.eachAsync([...], function (...) { ... });
   * array.eachAsync([...], function (...) { ... }, true, 100); // processing batches of a 100
   */
		eachAsync: function eachAsync(obj, fn) {
			var size = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];
			var ctx = arguments.length <= 3 || arguments[3] === undefined ? fn : arguments[3];
			return (function () {
				var lobj = array.clone(obj),
				    nth = lobj.length,
				    offset = 0;

				if (size > nth) {
					size = nth;
				}

				function repeat() {
					var i = -1,
					    idx = undefined,
					    result = undefined;

					while (++i < size) {
						idx = i + offset;

						if (idx === nth || ctx.call(lobj, lobj[idx], idx) === false) {
							result = false;
						}
					}

					offset += size;

					if (offset >= nth) {
						result = false;
					}

					if (result !== false) {
						setTimeout(repeat, 0);
					}
				}

				repeat();

				return obj;
			})();
		},

		/**
   * Iterates `obj` in reverse and executes `fn` with arguments [`value`, `index`].
   * Returning `false` halts iteration.
   *
   * @method eachReverse
   * @memberOf array
   * @param  {Array}    obj Array to iterate
   * @param  {Function} fn  Function to execute on index values
   * @param  {Boolean}  ctx [Optional] Context to execute `fn`
   * @return {Array}        Array
   * @example
   * array.eachReverse([...], function (...) { ... });
   * array.eachReverse([...], function (...) { ... }, true, 100); // processing batches of a 100
   */
		eachReverse: function eachReverse(obj, fn) {
			var ctx = arguments.length <= 2 || arguments[2] === undefined ? fn : arguments[2];
			return (function () {
				var i = obj.length;

				while (--i > -1) {
					if (ctx.call(obj, obj[i], i) === false) {
						break;
					}
				}

				return obj;
			})();
		},

		/**
   * Iterates `obj` asynchronously in reverse and executes `fn` with arguments [`value`, `index`].
   * Returning `false` halts iteration.
   *
   * @method eachReverse
   * @memberOf array
   * @param  {Array}    obj   Array to iterate
   * @param  {Function} fn    Function to execute on index values
   * @param  {Number}   size  [Optional] Batch size for async iteration, default is 10
   * @param  {Boolean}  ctx   [Optional] Context to execute `fn`
   * @return {Array}          Array
   * @example
   * array.eachReverse([...], function (...) { ... });
   * array.eachReverse([...], function (...) { ... }, true, 100); // processing batches of a 100
   */
		eachReverseAsync: function eachReverseAsync(obj, fn) {
			var size = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];
			var ctx = arguments.length <= 3 || arguments[3] === undefined ? fn : arguments[3];
			return (function () {
				array.eachAsync(array.clone(obj).reverse(), fn, size, ctx);

				return obj;
			})();
		},

		/**
   * Determines if two Arrays are equal
   *
   * @method equal
   * @memberOf array
   * @param  {Array} a Array to compare
   * @param  {Array} b Array to compare
   * @return {Boolean} `true` if the Arrays match
   * @example
   * array.equal(["a"], ["a"]);      // true
   * array.equal(["a"], ["a", "b"]); // false
   */
		equal: function equal(a, b) {
			return JSON.stringify(a) === JSON.stringify(b);
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
		fill: function fill(obj, arg, start, offset) {
			var l = obj.length,
			    i = !isNaN(start) ? start : 0,
			    nth = !isNaN(offset) ? i + offset : l - 1;

			if (nth > l - 1) {
				nth = l - 1;
			}

			if (typeof arg === "function") {
				while (i <= nth) {
					obj[i] = arg(obj[i]);
					i++;
				}
			} else {
				while (i <= nth) {
					obj[i] = arg;
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
		first: function first(obj) {
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
   * array.flat([[0, 1], [2, 3]]); // [0, 1, 2, 3]
   */
		flat: function flat(obj) {
			return obj.reduce(function (a, b) {
				return a.concat(b);
			}, []);
		},

		/**
   * Iterates `obj` and executes `fn` with arguments [`value`, `index`].
   * Returning `false` halts iteration.
   *
   * @method forEach
   * @memberOf array
   * @see array.each
   * @param  {Array}    obj Array to iterate
   * @param  {Function} fn  Function to execute on index values
   * @param  {Function} ctx [Optional] Context to execute `fn`
   * @return {Array}        Array
   * @example
   * array.forEach([...], function (...) { ... });
   * array.forEach([...], function (...) { ... }, true, 100); // processing batches of a 100
   */
		forEach: function forEach(obj, fn) {
			var ctx = arguments.length <= 2 || arguments[2] === undefined ? fn : arguments[2];
			return (function () {
				return array.each(obj, fn, ctx);
			})();
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
		fromObject: function fromObject(obj) {
			return array.mingle(Object.keys(obj), array.cast(obj));
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
		index: function index(obj, arg) {
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
		indexed: function indexed(obj) {
			return Object.keys(obj).map(function (key) {
				return obj[key];
			});
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
		intersect: function intersect(obj1, obj2) {
			var a = undefined,
			    b = undefined;

			if (obj1.length > obj2.length) {
				a = obj1;
				b = obj2;
			} else {
				a = obj2;
				b = obj1;
			}

			return a.filter(function (key) {
				return array.contains(b, key);
			});
		},

		/**
   * Determines if an Array is empty
   *
   * @method isEmpty
   * @memberOf array
   * @param  {Array} obj Array to inspect
   * @return {Boolean}   `true` if there's no indices
   * @example
   * array.isEmpty([]);    // true
   * array.isEmpty(["a"]); // false
   */
		isEmpty: function isEmpty(obj) {
			return obj.length === 0;
		},

		/**
   * Iterates an Array using an Iterator
   *
   * @method iterate
   * @memberOf array
   * @param  {Array} obj Array to iterate
   * @return {Array}     Array to iterate
   */
		iterate: function iterate(obj, fn) {
			var itr = array.iterator(obj),
			    i = -1,
			    item = undefined,
			    next = undefined;

			do {
				item = itr.next();

				if (!item.done) {
					next = fn(item.value, ++i);
				} else {
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
		iterator: function iterator(obj) {
			var nth = obj.length,
			    i = -1;

			return {
				next: function next() {
					var result = undefined;

					if (++i < nth) {
						result = { done: false, value: obj[i] };
					} else {
						result = { done: true };
					}

					return result;
				}
			};
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
		keepIf: function keepIf(obj, fn) {
			var result = undefined,
			    remove = undefined;

			result = obj.filter(fn);
			remove = array.diff(obj, result);

			array.each(remove, function (i) {
				array.remove(obj, array.index(obj, i));
			});

			return obj;
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
		last: function last(obj, arg) {
			var n = obj.length - 1,
			    larg = arg;

			if (larg >= n + 1) {
				return obj;
			} else if (isNaN(larg) || larg === 1) {
				return obj[n];
			} else {
				--larg;
				return array.limit(obj, n - larg, n);
			}
		},

		/**
   * Returns a limited range of indices from the Array
   *
   * @method limit
   * @memberOf array
   * @param  {Array}  obj   Array to iterate
   * @param  {Number} start Starting index
   * @param  {Number} range Number of indices to return
   * @return {Array}        Array of indices
   * @example
   * let myArray = [1, 2, 3, 4];
   *
   * array.limit(myArray, 0, 2); // [1, 2]
   * array.limit(myArray, 2, 2); // [3, 4]
   */
		limit: function limit(obj) {
			var start = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
			var range = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

			var result = [],
			    i = start - 1,
			    nth = start + range,
			    max = obj.length;

			if (max > 0) {
				while (++i < nth && i < max) {
					result.push(obj[i]);
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
		max: function max(obj) {
			return array.last(array.sorted(array.clone(obj)));
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
		mean: function mean(obj) {
			return obj.length > 0 ? array.sum(obj) / obj.length : undefined;
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
		median: function median(obj) {
			var lobj = array.sorted(array.clone(obj)),
			    nth = lobj.length,
			    mid = Math.floor(nth / 2);

			return nth % 2 !== 0 ? lobj[mid] : (lobj[mid - 1] + lobj[mid]) / 2;
		},

		/**
   * Merges `arg` into `obj`, excluding duplicate indices
   *
   * @method merge
   * @memberOf array
   * @param  {Array} a Array to receive indices
   * @param  {Array} b Array to merge
   * @return {Array}   First argument
   * @example
   * let a = ["a", "b", "c"],
   *     b = ["d"];
   *
   * array.merge(a, b) // ["a", "b", "c", "d"];
   */
		merge: function merge(a, b) {
			array.each(b, function (i) {
				array.add(a, i);
			});

			return a;
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
		min: function min(obj) {
			return array.sorted(array.clone(obj))[0];
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
		mingle: function mingle(a, b) {
			return a.map(function (i, idx) {
				return [i, b[idx]];
			});
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
		mode: function mode(obj) {
			var values = {},
			    count = 0,
			    mode = [],
			    nth = undefined,
			    result = undefined;

			// Counting values
			array.each(obj, function (i) {
				if (!isNaN(values[i])) {
					values[i]++;
				} else {
					values[i] = 1;
				}
			});

			// Finding the highest occurring count
			count = array.max(array.cast(values));

			// Finding values that match the count
			Object.keys(values).forEach(function (k) {
				var v = values[k];

				if (v === count) {
					mode.push(Number(k));
				}
			});

			// Determining the result
			nth = mode.length;

			if (nth > 0) {
				result = nth === 1 ? mode[0] : array.sorted(mode);
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
		range: function range(obj) {
			return array.max(obj) - array.min(obj);
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
		rassoc: function rassoc(obj, arg) {
			var result = undefined;

			array.each(obj, function (i) {
				if (i[1] === arg) {
					result = array.clone(i);

					return false;
				}
			});

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
		reject: function reject(obj, fn) {
			return array.diff(obj, obj.filter(fn));
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
		remove: function remove(obj, start, end) {
			if (isNaN(start)) {
				start = array.index(obj, start);

				if (start === -1) {
					return obj;
				}
			} else {
				start = start || 0;
			}

			var length = obj.length;
			var remaining = obj.slice((end || start) + 1 || length);

			obj.length = start < 0 ? length + start : start;
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
		removeIf: function removeIf(obj, fn) {
			var remove = obj.filter(fn);

			array.each(remove, function (i) {
				array.remove(obj, array.index(obj, i));
			});

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
		removeWhile: function removeWhile(obj, fn) {
			array.each(obj, function (i, idx) {
				if (fn(i) !== false) {
					array.remove(obj, idx);
				} else {
					return false;
				}
			});

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
		replace: function replace(a, b) {
			array.remove(a, 0, a.length);
			array.each(b, function (i) {
				a.push(i);
			});

			return a;
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
		rest: function rest(obj) {
			var arg = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

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
		rindex: function rindex(obj, arg) {
			var result = -1;

			array.each(obj, function (i, idx) {
				if (i === arg) {
					result = idx;
				}
			});

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
		rotate: function rotate(obj, arg) {
			var nth = obj.length,
			    result = undefined;

			if (arg === 0) {
				result = obj;
			} else {
				if (arg < 0) {
					arg += nth;
				} else {
					arg--;
				}

				result = array.limit(obj, arg, nth).concat(array.limit(obj, 0, arg));
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
		series: function series() {
			var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var end = arguments.length <= 1 || arguments[1] === undefined ? start : arguments[1];
			var offset = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
			return (function () {
				var result = [],
				    n = -1,
				    lstart = start,
				    nth = Math.max(0, Math.ceil((end - start) / offset));

				while (++n < nth) {
					result[n] = lstart;
					lstart += offset;
				}

				return result;
			})();
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
		sort: function sort(a, b) {
			var types = { a: typeof a, b: typeof b },
			    c = undefined,
			    d = undefined,
			    result = undefined;

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
		sorted: function sorted(obj) {
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
		split: function split(obj, divisor) {
			var result = [],
			    total = obj.length,
			    nth = Math.ceil(total / divisor),
			    low = Math.floor(total / divisor),
			    lower = Math.ceil(total / nth),
			    lowered = false,
			    start = 0,
			    i = -1;

			// Finding the fold
			if (Math.abs(total - divisor * nth) > nth) {
				lower = total - low * divisor + low - 1;
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

				result.push(array.limit(obj, start, nth));
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
		stddev: function stddev(obj) {
			return Math.sqrt(array.variance(obj));
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
		sum: function sum(obj) {
			var result = 0;

			if (obj.length > 0) {
				result = obj.reduce(function (a, b) {
					return a + b;
				}, 0);
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
		take: function take(obj, n) {
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
		toObject: function toObject(ar) {
			var obj = {},
			    i = ar.length;

			while (i--) {
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
   * let myArray = [true, true, false];
   *
   * myArray.extra = true;
   * array.total(myArray); // 4
   */
		total: function total(obj) {
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
		unique: function unique(obj) {
			var result = [];

			array.each(obj, function (i) {
				array.add(result, i);
			});

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
		variance: function variance(obj) {
			var nth = obj.length,
			    n = 0,
			    mean = undefined,
			    result = undefined;

			if (nth > 0) {
				mean = array.mean(obj);

				array.each(obj, function (i) {
					n += Math.pow(i - mean, 2);
				});

				result = n / nth;
			} else {
				result = n;
			}

			return result;
		},

		/**
   * Library version
   *
   * @type {String}
   */
		version: "2.0.0",

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
		zip: function zip(obj, args) {
			var result = [];

			// Preparing args
			if (!(args instanceof Array)) {
				args = typeof args === "object" ? array.cast(args) : [args];
			}

			array.each(args, function (i, idx) {
				if (!(i instanceof Array)) {
					args[idx] = [i];
				}
			});

			// Building result Array
			array.each(obj, function (i, idx) {
				result[idx] = [i];

				array.each(args, function (x) {
					result[idx].push(x[idx] || null);
				});
			});

			return result;
		}
	};

	// Node, AMD & window supported
	if (typeof exports !== "undefined") {
		module.exports = array;
	} else if (typeof define === "function") {
		define(function () {
			return array;
		});
	} else {
		global.retsu = array;
	}
})(typeof global !== "undefined" ? global : window);
