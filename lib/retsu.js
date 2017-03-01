"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * retsu
 *
 * @copyright 2017 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 3.0.0
 */
(function (global) {
	var Retsu = function () {
		function Retsu() {
			_classCallCheck(this, Retsu);

			this.version = "3.0.0";
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
			key: "assoc",
			value: function assoc(obj, arg) {
				return obj.filter(function (i) {
					return i[0] === arg;
				})[0] || null;
			}
		}, {
			key: "at",
			value: function at(obj, idx) {
				return obj[idx >= 0 ? idx : obj.length + idx];
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
				var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				var result = void 0;

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
				    nth = Math.ceil(obj.length / size);

				var start = 0,
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
				return JSON.parse(this.inspect(obj));
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
			key: "combination",
			value: function combination(obj, n) {
				var result = [],
				    nth = obj.length;

				if (n === 0) {
					result.push([]);
				} else if (n < nth) {
					this.each(obj, function (i, idx) {
						var x = -1;

						var o = [i];

						if (n > 1) {
							while (++x < n) {
								if (x > idx) {
									o.push(obj[x]);
								}
							}
						}

						if (o.length === n) {
							result.push(o);
						}
					});
				} else if (n === nth) {
					result.push(obj);
				}

				return result;
			}
		}, {
			key: "compact",
			value: function compact(obj) {
				var diff = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				var result = obj.filter(function (i) {
					return i !== null && i !== undefined;
				});

				return diff === false ? result : result.length < obj.length ? result : [];
			}
		}, {
			key: "count",
			value: function count(obj, value) {
				return obj.filter(function (i) {
					return i === value;
				}).length;
			}
		}, {
			key: "cycle",
			value: function cycle(obj) {
				var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var fn = arguments[2];

				var i = 0;

				if (obj.length > 0 && count > 0) {
					while (++i <= count) {
						this.each(obj, fn);
					}
				}
			}
		}, {
			key: "delete",
			value: function _delete(obj, value) {
				return this.removeIf(obj, function (i) {
					return i === value;
				});
			}
		}, {
			key: "deleteAt",
			value: function deleteAt(obj, idx) {
				return obj.splice(idx, 1)[0] || null;
			}
		}, {
			key: "deleteIf",
			value: function deleteIf(obj, fn) {
				return this.removeIf(obj, fn);
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
			key: "dig",
			value: function dig(obj) {
				var result = void 0;

				for (var _len = arguments.length, steps = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					steps[_key - 1] = arguments[_key];
				}

				this.each(steps, function (x, idx) {
					result = idx === 0 ? obj[x] : result[x];
				});

				return result;
			}
		}, {
			key: "drop",
			value: function drop(obj) {
				var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

				obj.splice(0, start > 0 ? start : obj.length + start);

				return obj;
			}
		}, {
			key: "dropWhile",
			value: function dropWhile(obj /*, fn*/) {
				// @todo implement

				return obj;
			}
		}, {
			key: "each",
			value: function each(obj, fn) {
				var ctx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : obj;

				var nth = obj.length;
				var i = -1;

				while (++i < nth) {
					if (fn.call(ctx, obj[i], i) === false) {
						break;
					}
				}

				return obj;
			}
		}, {
			key: "empty",
			value: function empty(obj) {
				return obj.length === 0;
			}
		}, {
			key: "equal",
			value: function equal(a, b) {
				return this.inspect(a) === this.inspect(b);
			}
		}, {
			key: "fetch",
			value: function fetch(obj, idx, value) {
				return obj[idx] || value;
			}
		}, {
			key: "fill",
			value: function fill(obj, arg, start, offset) {
				var l = obj.length;

				var i = !isNaN(start) ? start : 0,
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
				var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

				return obj.slice(0, n);
			}
		}, {
			key: "flatten",
			value: function flatten(obj) {
				var _this2 = this;

				return obj.reduce(function (a, b) {
					return a.concat(b instanceof Array ? _this2.flatten(b) : b);
				}, []);
			}
		}, {
			key: "forEach",
			value: function forEach(obj, fn) {
				var ctx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : fn;

				return this.each(obj, fn, ctx);
			}
		}, {
			key: "fromObject",
			value: function fromObject(obj) {
				return this.mingle(Object.keys(obj), this.cast(obj));
			}
		}, {
			key: "frozen",
			value: function frozen(obj) {
				return Object.isFrozen(obj);
			}
		}, {
			key: "index",
			value: function index(obj, arg) {
				var result = void 0;

				if (typeof arg === "function") {
					this.each(obj, function (i, idx) {
						var output = void 0;

						if (arg(i) === true) {
							result = idx;
							output = false;
						}

						return output;
					});
				} else {
					result = obj.indexOf(arg);
				}

				return result;
			}
		}, {
			key: "initializeCopy",
			value: function initializeCopy(a, b) {
				a.length = 0;
				this.each(b, function (i) {
					return a.push(i);
				});

				return a;
			}
		}, {
			key: "insert",
			value: function insert(obj, idx) {
				var start = idx >= 0 ? idx : obj.length + idx;

				for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
					args[_key2 - 2] = arguments[_key2];
				}

				obj.splice.apply(obj, [start, 0].concat(args));

				return obj;
			}
		}, {
			key: "inspect",
			value: function inspect(obj) {
				return JSON.stringify(obj, null, 0);
			}
		}, {
			key: "intersect",
			value: function intersect(obj1, obj2) {
				var _this3 = this;

				var a = void 0,
				    b = void 0;

				if (obj1.length > obj2.length) {
					a = obj1;
					b = obj2;
				} else {
					a = obj2;
					b = obj1;
				}

				return a.filter(function (i) {
					return _this3.contains(b, i);
				});
			}
		}, {
			key: "iterate",
			value: function iterate(obj, fn) {
				var itr = this.iterator(obj);

				var i = -1,
				    item = void 0,
				    next = void 0;

				do {
					item = itr.next();
					next = !item.done ? fn(item.value, ++i) : false;
				} while (next !== false);

				return obj;
			}
		}, {
			key: "iterator",
			value: function iterator(obj) {
				var nth = obj.length;

				var i = -1;

				return {
					next: function next() {
						return ++i < nth ? { done: false, value: obj[i] } : { done: true };
					}
				};
			}
		}, {
			key: "keepIf",
			value: function keepIf(obj, fn) {
				var _this4 = this;

				var result = obj.filter(fn),
				    remove = this.diff(obj, result);

				this.each(remove, function (i) {
					return _this4.remove(obj, _this4.index(obj, i));
				});

				return obj;
			}
		}, {
			key: "last",
			value: function last(obj, arg) {
				var n = obj.length - 1,
				    larg = arg,
				    result = void 0;

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
				var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var range = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

				var nth = start + range,
				    max = obj.length,
				    result = void 0;

				if (max > 0) {
					if (nth > max) {
						nth = max;
					}

					result = obj.slice(start, nth);
				} else {
					result = [];
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
				var _this5 = this;

				this.each(b, function (i) {
					return _this5.add(a, i);
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
				    nth = void 0,
				    result = void 0;

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
			key: "permutation",
			value: function permutation(obj) {
				var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : obj.length;

				var result = void 0;

				if (n === 0) {
					result = [[]];
				} else if (n > obj.length) {
					result = [];
				} else {
					void 0; // @todo implement
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
				var _this6 = this;

				var result = void 0;

				this.each(obj, function (i) {
					var output = void 0;

					if (i[1] === arg) {
						result = _this6.clone(i);
						output = false;
					}

					return output;
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
				var length = void 0,
				    remaining = void 0;

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
				var _this7 = this;

				var remove = obj.filter(fn);

				this.each(remove, function (i) {
					return _this7.remove(obj, _this7.index(obj, i));
				});

				return obj;
			}
		}, {
			key: "removeWhile",
			value: function removeWhile(obj, fn) {
				var _this8 = this;

				var remove = [];

				this.iterate(obj, function (i) {
					var result = void 0;

					if (fn(i) !== false) {
						remove.push(i);
					} else {
						result = false;
					}

					return result;
				});

				this.iterate(remove, function (i) {
					return _this8.remove(obj, _this8.index(obj, i));
				});

				return obj;
			}
		}, {
			key: "replace",
			value: function replace(a, b) {
				this.clear(a);
				this.each(b, function (i) {
					return a.push(i);
				});

				return a;
			}
		}, {
			key: "rest",
			value: function rest(obj) {
				var arg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

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
				    result = void 0;

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
			key: "sample",
			value: function sample(obj /*, n*/) {
				// @todo implement

				return obj;
			}
		}, {
			key: "series",
			value: function series() {
				var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start;
				var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

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
				    c = void 0,
				    d = void 0,
				    result = void 0;

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
				    low = Math.floor(total / divisor);

				var nth = Math.ceil(total / divisor),
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
				var obj = {};

				this.each(ar, function (i, idx) {
					obj[idx.toString()] = i;
				});

				return obj;
			}
		}, {
			key: "transpose",
			value: function transpose(obj) {
				// @todo implement

				return obj;
			}
		}, {
			key: "unique",
			value: function unique(obj) {
				var _this9 = this;

				var result = [];

				this.each(obj, function (i) {
					return _this9.add(result, i);
				});

				return result;
			}
		}, {
			key: "valuesAt",
			value: function valuesAt(obj /*, ...args*/) {
				// @implement

				return obj;
			}
		}, {
			key: "variance",
			value: function variance(obj) {
				var nth = obj.length,
				    n = 0,
				    mean = void 0,
				    result = void 0;

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
				var _this10 = this;

				for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
					args[_key3 - 1] = arguments[_key3];
				}

				var result = [];

				this.each(args, function (i, idx) {
					if (!i instanceof Array) {
						args[idx] = [i];
					}
				});

				// Building result Array
				this.each(obj, function (i, idx) {
					result[idx] = [i];
					_this10.each(args, function (x) {
						return result[idx].push(x[idx] || null);
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
