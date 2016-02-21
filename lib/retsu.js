"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Array micro library focused on speed
 *
 * @copyright 2016 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @link http://avoidwork.github.io/retsu
 * @version 2.0.2
 */
(function (global) {
	var Retsu = function () {
		function Retsu() {
			_classCallCheck(this, Retsu);

			this.version = "2.0.2";
		}

		_createClass(Retsu, [{
			key: "add",
			value: function add(obj, arg) {
				if (!this.contains(obj, arg)) {
					obj.push(arg);
				}

				return obj;
			}
		}, {
			key: "binIndex",
			value: function binIndex(obj, arg) {
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
			}
		}, {
			key: "cast",
			value: function cast(obj) {
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
			}
		}, {
			key: "chunk",
			value: function chunk(obj, size) {
				var result = [],
				    nth = Math.ceil(obj.length / size),
				    start = 0,
				    i = -1;

				while (++i < nth) {
					start = i * size;
					result.push(this.limit(obj, start, size));
				}

				return result;
			}
		}, {
			key: "clear",
			value: function clear(obj) {
				obj.length = 0;

				return obj;
			}
		}, {
			key: "clone",
			value: function clone(obj) {
				return JSON.parse(JSON.stringify(obj));
			}
		}, {
			key: "contains",
			value: function contains(obj, arg) {
				return obj.indexOf(arg) > -1;
			}
		}, {
			key: "collect",
			value: function collect(obj, fn) {
				return obj.map(fn);
			}
		}, {
			key: "compact",
			value: function compact(obj) {
				var diff = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

				var result = obj.filter(function (i) {
					return i !== null && i !== undefined;
				});

				return diff !== true ? result : result.length < obj.length ? result : null;
			}
		}, {
			key: "count",
			value: function count(obj, value) {
				return obj.filter(function (i) {
					return i === value;
				}).length;
			}
		}, {
			key: "diff",
			value: function diff(a, b) {
				var _this = this;

				return a.filter(function (i) {
					return !_this.contains(b, i);
				}).concat(b.filter(function (i) {
					return !_this.contains(a, i);
				}));
			}
		}, {
			key: "each",
			value: function each(obj, fn) {
				var ctx = arguments.length <= 2 || arguments[2] === undefined ? fn : arguments[2];

				var nth = obj.length,
				    i = -1;

				while (++i < nth) {
					if (ctx.call(obj, obj[i], i) === false) {
						break;
					}
				}

				return obj;
			}
		}, {
			key: "eachAsync",
			value: function eachAsync(obj, fn) {
				var size = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];
				var ctx = arguments.length <= 3 || arguments[3] === undefined ? fn : arguments[3];

				var lobj = this.clone(obj),
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
			}
		}, {
			key: "eachReverse",
			value: function eachReverse(obj, fn) {
				var ctx = arguments.length <= 2 || arguments[2] === undefined ? fn : arguments[2];

				var i = obj.length;

				while (--i > -1) {
					if (ctx.call(obj, obj[i], i) === false) {
						break;
					}
				}

				return obj;
			}
		}, {
			key: "eachReverseAsync",
			value: function eachReverseAsync(obj, fn) {
				var size = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];
				var ctx = arguments.length <= 3 || arguments[3] === undefined ? fn : arguments[3];

				this.eachAsync(this.clone(obj).reverse(), fn, size, ctx);

				return obj;
			}
		}, {
			key: "equal",
			value: function equal(a, b) {
				return JSON.stringify(a) === JSON.stringify(b);
			}
		}, {
			key: "fill",
			value: function fill(obj, arg, start, offset) {
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
			}
		}, {
			key: "first",
			value: function first(obj) {
				return obj[0];
			}
		}, {
			key: "flat",
			value: function flat(obj) {
				return obj.reduce(function (a, b) {
					return a.concat(b);
				}, []);
			}
		}, {
			key: "forEach",
			value: function forEach(obj, fn) {
				var ctx = arguments.length <= 2 || arguments[2] === undefined ? fn : arguments[2];

				return this.each(obj, fn, ctx);
			}
		}, {
			key: "fromObject",
			value: function fromObject(obj) {
				return this.mingle(Object.keys(obj), this.cast(obj));
			}
		}, {
			key: "index",
			value: function index(obj, arg) {
				return obj.indexOf(arg);
			}
		}, {
			key: "indexed",
			value: function indexed(obj) {
				return Object.keys(obj).map(function (key) {
					return obj[key];
				});
			}
		}, {
			key: "intersect",
			value: function intersect(obj1, obj2) {
				var _this2 = this;

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
					return _this2.contains(b, key);
				});
			}
		}, {
			key: "isEmpty",
			value: function isEmpty(obj) {
				return obj.length === 0;
			}
		}, {
			key: "iterate",
			value: function iterate(obj, fn) {
				var itr = this.iterator(obj),
				    i = -1,
				    item = undefined,
				    next = undefined;

				do {
					item = itr.next();
					next = !item.done ? fn(item.value, ++i) : false;
				} while (next !== false);

				return obj;
			}
		}, {
			key: "iterator",
			value: function iterator(obj) {
				var nth = obj.length,
				    i = -1;

				return {
					next: function next() {
						return ++i < nth ? { done: false, value: obj[i] } : { done: true };
					}
				};
			}
		}, {
			key: "keepIf",
			value: function keepIf(obj, fn) {
				var _this3 = this;

				var result = undefined,
				    remove = undefined;

				result = obj.filter(fn);
				remove = this.diff(obj, result);

				this.each(remove, function (i) {
					_this3.remove(obj, _this3.index(obj, i));
				});

				return obj;
			}
		}, {
			key: "last",
			value: function last(obj, arg) {
				var n = obj.length - 1,
				    larg = arg,
				    result = undefined;

				if (larg >= n + 1) {
					result = obj;
				} else if (isNaN(larg) || larg === 1) {
					result = obj[n];
				} else {
					--larg;
					result = this.limit(obj, n - larg, n);
				}

				return result;
			}
		}, {
			key: "limit",
			value: function limit(obj) {
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
			}
		}, {
			key: "max",
			value: function max(obj) {
				return this.last(this.sorted(this.clone(obj)));
			}
		}, {
			key: "mean",
			value: function mean(obj) {
				return obj.length > 0 ? this.sum(obj) / obj.length : undefined;
			}
		}, {
			key: "median",
			value: function median(obj) {
				var lobj = this.sorted(this.clone(obj)),
				    nth = lobj.length,
				    mid = Math.floor(nth / 2);

				return nth % 2 !== 0 ? lobj[mid] : (lobj[mid - 1] + lobj[mid]) / 2;
			}
		}, {
			key: "merge",
			value: function merge(a, b) {
				var _this4 = this;

				this.each(b, function (i) {
					_this4.add(a, i);
				});

				return a;
			}
		}, {
			key: "min",
			value: function min(obj) {
				return this.sorted(this.clone(obj))[0];
			}
		}, {
			key: "mingle",
			value: function mingle(a, b) {
				return a.map(function (i, idx) {
					return [i, b[idx]];
				});
			}
		}, {
			key: "mode",
			value: function mode(obj) {
				var values = {},
				    count = 0,
				    mode = [],
				    nth = undefined,
				    result = undefined;

				// Counting values
				this.each(obj, function (i) {
					if (!isNaN(values[i])) {
						values[i]++;
					} else {
						values[i] = 1;
					}
				});

				// Finding the highest occurring count
				count = this.max(this.cast(values));

				// Finding values that match the count
				Object.keys(values).forEach(function (k) {
					if (values[k] === count) {
						mode.push(Number(k));
					}
				});

				// Determining the result
				nth = mode.length;

				if (nth > 0) {
					result = nth === 1 ? mode[0] : this.sorted(mode);
				}

				return result;
			}
		}, {
			key: "range",
			value: function range(obj) {
				return this.max(obj) - this.min(obj);
			}
		}, {
			key: "rassoc",
			value: function rassoc(obj, arg) {
				var _this5 = this;

				var result = undefined;

				this.each(obj, function (i) {
					if (i[1] === arg) {
						result = _this5.clone(i);

						return false;
					}
				});

				return result;
			}
		}, {
			key: "reject",
			value: function reject(obj, fn) {
				return this.diff(obj, obj.filter(fn));
			}
		}, {
			key: "remove",
			value: function remove(obj, start, end) {
				var length = undefined,
				    remaining = undefined;

				if (isNaN(start)) {
					start = this.index(obj, start);

					if (start === -1) {
						return obj;
					}
				} else {
					start = start || 0;
				}

				length = obj.length;
				remaining = obj.slice((end || start) + 1 || length);
				obj.length = start < 0 ? length + start : start;
				obj.push.apply(obj, remaining);

				return obj;
			}
		}, {
			key: "removeIf",
			value: function removeIf(obj, fn) {
				var _this6 = this;

				var remove = obj.filter(fn);

				this.each(remove, function (i) {
					_this6.remove(obj, _this6.index(obj, i));
				});

				return obj;
			}
		}, {
			key: "removeWhile",
			value: function removeWhile(obj, fn) {
				var _this7 = this;

				var remove = [];

				this.iterate(obj, function (i) {
					if (fn(i) !== false) {
						remove.push(i);
					} else {
						return false;
					}
				});

				this.iterate(remove, function (i) {
					_this7.remove(obj, _this7.index(obj, i));
				});

				return obj;
			}
		}, {
			key: "replace",
			value: function replace(a, b) {
				this.clear(a);
				this.each(b, function (i) {
					a.push(i);
				});

				return a;
			}
		}, {
			key: "rest",
			value: function rest(obj) {
				var arg = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

				if (arg < 1) {
					arg = 1;
				}

				return this.limit(obj, arg, obj.length);
			}
		}, {
			key: "rindex",
			value: function rindex(obj, arg) {
				var result = -1;

				this.each(obj, function (i, idx) {
					if (i === arg) {
						result = idx;
					}
				});

				return result;
			}
		}, {
			key: "rotate",
			value: function rotate(obj, arg) {
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

					result = this.limit(obj, arg, nth).concat(this.limit(obj, 0, arg));
				}

				return result;
			}
		}, {
			key: "series",
			value: function series() {
				var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
				var end = arguments.length <= 1 || arguments[1] === undefined ? start : arguments[1];
				var offset = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

				var result = [],
				    n = -1,
				    lstart = start,
				    nth = Math.max(0, Math.ceil((end - start) / offset));

				while (++n < nth) {
					result[n] = lstart;
					lstart += offset;
				}

				return result;
			}
		}, {
			key: "sort",
			value: function sort(a, b) {
				var types = { a: typeof a === "undefined" ? "undefined" : _typeof(a), b: typeof b === "undefined" ? "undefined" : _typeof(b) },
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
			}
		}, {
			key: "sorted",
			value: function sorted(obj) {
				return obj.sort(this.sort);
			}
		}, {
			key: "split",
			value: function split(obj, divisor) {
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

					result.push(this.limit(obj, start, nth));
				}

				return result;
			}
		}, {
			key: "stddev",
			value: function stddev(obj) {
				return Math.sqrt(this.variance(obj));
			}
		}, {
			key: "sum",
			value: function sum(obj) {
				var result = 0;

				if (obj.length > 0) {
					result = obj.reduce(function (a, b) {
						return a + b;
					}, 0);
				}

				return result;
			}
		}, {
			key: "take",
			value: function take(obj, n) {
				return this.limit(obj, 0, n);
			}
		}, {
			key: "toObject",
			value: function toObject(ar) {
				var obj = {},
				    i = ar.length;

				while (i--) {
					obj[i.toString()] = ar[i];
				}

				return obj;
			}
		}, {
			key: "total",
			value: function total(obj) {
				return this.indexed(obj).length;
			}
		}, {
			key: "unique",
			value: function unique(obj) {
				var _this8 = this;

				var result = [];

				this.each(obj, function (i) {
					_this8.add(result, i);
				});

				return result;
			}
		}, {
			key: "variance",
			value: function variance(obj) {
				var nth = obj.length,
				    n = 0,
				    mean = undefined,
				    result = undefined;

				if (nth > 0) {
					mean = this.mean(obj);

					this.each(obj, function (i) {
						n += Math.pow(i - mean, 2);
					});

					result = n / nth;
				} else {
					result = n;
				}

				return result;
			}
		}, {
			key: "zip",
			value: function zip(obj) {
				var _this9 = this;

				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				var result = [];

				this.each(args, function (i, idx) {
					if (!(i instanceof Array)) {
						args[idx] = [i];
					}
				});

				// Building result Array
				this.each(obj, function (i, idx) {
					result[idx] = [i];

					_this9.each(args, function (x) {
						result[idx].push(x[idx] || null);
					});
				});

				return result;
			}
		}]);

		return Retsu;
	}();

	// Node, AMD & window supported


	if (typeof exports !== "undefined") {
		module.exports = new Retsu();
	} else if (typeof define === "function" && define.amd) {
		define(function () {
			return new Retsu();
		});
	} else {
		global.retsu = new Retsu();
	}
})(typeof window !== "undefined" ? window : global);
