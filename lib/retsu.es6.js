/**
 * retsu
 *
 * @copyright 2017 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 3.0.0
 */
(function (global) {
	class Retsu {
		constructor () {
			this.version = "3.0.0";
		}

		add (obj, arg) {
			if (!this.contains(obj, arg)) {
				obj.push(arg);
			}

			return obj;
		}

		assoc (obj, arg) {
			return obj.filter(i => i[0] === arg)[0] || null;
		}

		at (obj, idx) {
			return obj[idx >= 0 ? idx : obj.length + idx];
		}

		binIndex (obj, arg) {
			let max = obj.length - 1,
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

		cast (obj, key = false) {
			let result;

			if (key === true) {
				result = Object.keys(obj);
			} else if (!isNaN(obj.length)) {
				result = Array.from(obj);
			} else {
				result = Object.keys(obj).map(i => obj[i]);
			}

			return result;
		}

		chunk (obj, size) {
			const result = [],
				nth = Math.ceil(obj.length / size);

			let start = 0,
				i = -1;

			while (++i < nth) {
				start = i * size;
				result.push(this.limit(obj, start, size));
			}

			return result;
		}

		clear (obj) {
			obj.length = 0;

			return obj;
		}

		clone (obj) {
			return JSON.parse(this.inspect(obj));
		}

		contains (obj, arg) {
			return obj.indexOf(arg) > -1;
		}

		collect (obj, fn) {
			return obj.map(fn);
		}

		combination (obj/*, n*/) {
			// @todo implement

			return obj;
		}

		compact (obj, diff = false) {
			const result = obj.filter(i => i !== null && i !== undefined);

			return diff === false ? result : result.length < obj.length ? result : [];
		}

		count (obj, value) {
			return obj.filter(i => i === value).length;
		}

		cycle (obj, count = 0, fn) {
			let i = 0;

			if (obj.length > 0 && count > 0) {
				while (++i <= count) {
					this.each(obj, fn);
				}
			}
		}

		delete (obj, value) {
			return this.removeIf(obj, i => i === value);
		}

		deleteAt (obj, idx) {
			return obj.splice(idx, 1)[0] || null;
		}

		deleteIf (obj, fn) {
			return this.removeIf(obj, fn);
		}

		diff (a, b) {
			return a.filter(i => !this.contains(b, i)).concat(b.filter(i => !this.contains(a, i)));
		}

		dig (obj, ...steps) {
			let result;

			this.each(steps, (x, idx) => {
				result = idx === 0 ? obj[x] : result[x];
			});

			return result;
		}

		drop (obj, start = 1) {
			obj.splice(0, start > 0 ? start : obj.length + start);

			return obj;
		}

		dropWhile (obj/*, fn*/) {
			// @todo implement

			return obj;
		}

		each (obj, fn, ctx = obj) {
			const nth = obj.length;
			let i = -1;

			while (++i < nth) {
				if (fn.call(ctx, obj[i], i) === false) {
					break;
				}
			}

			return obj;
		}

		empty (obj) {
			return obj.length === 0;
		}

		equal (a, b) {
			return this.inspect(a) === this.inspect(b);
		}

		fetch (obj, idx, value) {
			return obj[idx] || value;
		}

		fill (obj, arg, start, offset) {
			const l = obj.length;

			let i = !isNaN(start) ? start : 0,
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

		first (obj, n = 1) {
			return obj.slice(0, n);
		}

		flatten (obj) {
			return obj.reduce((a, b) => a.concat(b instanceof Array ? this.flatten(b) : b), []);
		}

		forEach (obj, fn, ctx = fn) {
			return this.each(obj, fn, ctx);
		}

		fromObject (obj) {
			return this.mingle(Object.keys(obj), this.cast(obj));
		}

		frozen (obj) {
			return Object.isFrozen(obj);
		}

		index (obj, arg) {
			let result;

			if (typeof arg === "function") {
				this.each(obj, (i, idx) => {
					let output;

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

		initializeCopy (a, b) {
			a.length = 0;
			this.each(b, i => a.push(i));

			return a;
		}

		insert (obj, idx, ...args) {
			const start = idx >= 0 ? idx : obj.length + idx;

			obj.splice(start, 0, ...args);

			return obj;
		}

		inspect (obj) {
			return JSON.stringify(obj, null, 0);
		}

		intersect (obj1, obj2) {
			let a, b;

			if (obj1.length > obj2.length) {
				a = obj1;
				b = obj2;
			} else {
				a = obj2;
				b = obj1;
			}

			return a.filter(i => this.contains(b, i));
		}

		iterate (obj, fn) {
			const itr = this.iterator(obj);

			let i = -1,
				item, next;

			do {
				item = itr.next();
				next = !item.done ? fn(item.value, ++i) : false;
			} while (next !== false);

			return obj;
		}

		iterator (obj) {
			const nth = obj.length;

			let i = -1;

			return {
				next () {
					return ++i < nth ? {done: false, value: obj[i]} : {done: true};
				}
			};
		}

		keepIf (obj, fn) {
			const result = obj.filter(fn),
				remove = this.diff(obj, result);

			this.each(remove, i => this.remove(obj, this.index(obj, i)));

			return obj;
		}

		last (obj, arg) {
			let n = obj.length - 1,
				larg = arg,
				result;

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

		limit (obj, start = 0, range = 1) {
			let nth = start + range,
				max = obj.length,
				result;

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

		max (obj) {
			return this.last(this.sorted(this.clone(obj)));
		}

		mean (obj) {
			return obj.length > 0 ? this.sum(obj) / obj.length : undefined;
		}

		median (obj) {
			let lobj = this.sorted(this.clone(obj)),
				nth = lobj.length,
				mid = Math.floor(nth / 2);

			return nth % 2 !== 0 ? lobj[mid] : (lobj[mid - 1] + lobj[mid]) / 2;
		}

		merge (a, b) {
			this.each(b, i => this.add(a, i));

			return a;
		}

		min (obj) {
			return this.sorted(this.clone(obj))[0];
		}

		mingle (a, b) {
			return a.map((i, idx) => [i, b[idx]]);
		}

		mode (obj) {
			let values = {},
				count = 0,
				mode = [],
				nth, result;

			// Counting values
			this.each(obj, i => {
				if (!isNaN(values[i])) {
					values[i]++;
				} else {
					values[i] = 1;
				}
			});

			// Finding the highest occurring count
			count = this.max(this.cast(values));

			// Finding values that match the count
			Object.keys(values).forEach(k => {
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

		permutation (obj, n = obj.length) {
			let result;

			if (n === 0) {
				result = [[]];
			} else if (n > obj.length) {
				result = [];
			} else {
				void 0; // @todo implement
			}

			return result;
		}

		range (obj) {
			return this.max(obj) - this.min(obj);
		}

		rassoc (obj, arg) {
			let result;

			this.each(obj, i => {
				let output;

				if (i[1] === arg) {
					result = this.clone(i);
					output = false;
				}

				return output;
			});

			return result;
		}

		reject (obj, fn) {
			return this.diff(obj, obj.filter(fn));
		}

		remove (obj, start, end) {
			let length, remaining;

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

		removeIf (obj, fn) {
			let remove = obj.filter(fn);

			this.each(remove, i => this.remove(obj, this.index(obj, i)));

			return obj;
		}

		removeWhile (obj, fn) {
			let remove = [];

			this.iterate(obj, i => {
				let result;

				if (fn(i) !== false) {
					remove.push(i);
				} else {
					result = false;
				}

				return result;
			});

			this.iterate(remove, i => this.remove(obj, this.index(obj, i)));

			return obj;
		}

		replace (a, b) {
			this.clear(a);
			this.each(b, i => a.push(i));

			return a;
		}

		rest (obj, arg = 1) {
			if (arg < 1) {
				arg = 1;
			}

			return this.limit(obj, arg, obj.length);
		}

		rindex (obj, arg) {
			let result = -1;

			this.each(obj, (i, idx) => {
				if (i === arg) {
					result = idx;
				}
			});

			return result;
		}

		rotate (obj, arg) {
			let nth = obj.length,
				result;

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

		series (start = 0, end = start, offset = 1) {
			let result = [],
				n = -1,
				lstart = start,
				nth = Math.max(0, Math.ceil((end - start) / offset));

			while (++n < nth) {
				result[n] = lstart;
				lstart += offset;
			}

			return result;
		}

		sort (a, b) {
			let types = {a: typeof a, b: typeof b},
				c, d, result;

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

		sorted (obj) {
			return obj.sort(this.sort);
		}

		split (obj, divisor) {
			const result = [],
				total = obj.length,
				low = Math.floor(total / divisor);

			let nth = Math.ceil(total / divisor),
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

		stddev (obj) {
			return Math.sqrt(this.variance(obj));
		}

		sum (obj) {
			let result = 0;

			if (obj.length > 0) {
				result = obj.reduce((a, b) => a + b, 0);
			}

			return result;
		}

		take (obj, n) {
			return this.limit(obj, 0, n);
		}

		toObject (ar) {
			const obj = {};

			this.each(ar, (i, idx) => {
				obj[idx.toString()] = i;
			});

			return obj;
		}

		unique (obj) {
			let result = [];

			this.each(obj, i => this.add(result, i));

			return result;
		}

		variance (obj) {
			let nth = obj.length,
				n = 0,
				mean, result;

			if (nth > 0) {
				mean = this.mean(obj);

				this.each(obj, i => {
					n += Math.pow(i - mean, 2);
				});

				result = n / nth;
			} else {
				result = n;
			}

			return result;
		}

		zip (obj, ...args) {
			let result = [];

			this.each(args, (i, idx) => {
				if (!i instanceof Array) {
					args[idx] = [i];
				}
			});

			// Building result Array
			this.each(obj, (i, idx) => {
				result[idx] = [i];
				this.each(args, x => result[idx].push(x[ idx] || null));
			});

			return result;
		}
	}

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
}(typeof window !== "undefined" ? window : global));
