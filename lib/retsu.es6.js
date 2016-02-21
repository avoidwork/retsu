/**
 * Array micro library focused on speed
 *
 * @copyright 2016 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @link http://avoidwork.github.io/retsu
 * @version 2.0.2
 */
(function (global) {

class Retsu {
	constructor () {
		this.version = "2.0.2";
	}

	add (obj, arg) {
		if (!this.contains(obj, arg)) {
			obj.push(arg);
		}

		return obj;
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
			result = Object.keys(obj).map(i => {
				return obj[i];
			});
		}

		return result;
	}

	chunk (obj, size) {
		let result = [],
			nth = Math.ceil(obj.length / size),
			start = 0,
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
		return JSON.parse(JSON.stringify(obj));
	}

	contains (obj, arg) {
		return obj.indexOf(arg) > -1;
	}

	collect (obj, fn) {
		return obj.map(fn);
	}

	compact (obj, diff = false) {
		let result = obj.filter(i => {
			return i !== null && i !== undefined;
		});

		return diff !== true ? result : result.length < obj.length ? result : null;
	}

	count (obj, value) {
		return obj.filter(i => {
			return i === value;
		}).length;
	}

	diff (a, b) {
		return a.filter(i => {
			return !this.contains(b, i);
		}).concat(b.filter(i => {
			return !this.contains(a, i);
		}));
	}

	each (obj, fn, ctx = fn) {
		let nth = obj.length,
			i = -1;

		while (++i < nth) {
			if (ctx.call(obj, obj[i], i) === false) {
				break;
			}
		}

		return obj;
	}

	eachAsync (obj, fn, size = 10, ctx = fn) {
		let lobj = this.clone(obj),
			nth = lobj.length,
			offset = 0;

		if (size > nth) {
			size = nth;
		}

		function repeat () {
			let i = -1,
				idx, result;

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

	eachReverse (obj, fn, ctx = fn) {
		let i = obj.length;

		while (--i > -1) {
			if (ctx.call(obj, obj[i], i) === false) {
				break;
			}
		}

		return obj;
	}

	eachReverseAsync (obj, fn, size = 10, ctx = fn) {
		this.eachAsync(this.clone(obj).reverse(), fn, size, ctx);

		return obj;
	}

	equal (a, b) {
		return JSON.stringify(a) === JSON.stringify(b);
	}

	fill (obj, arg, start, offset) {
		let l = obj.length,
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

	first (obj) {
		return obj[0];
	}

	flat (obj) {
		return obj.reduce((a, b) => {
			return a.concat(b);
		}, []);
	}

	forEach (obj, fn, ctx = fn) {
		return this.each(obj, fn, ctx);
	}

	fromObject (obj) {
		return this.mingle(Object.keys(obj), this.cast(obj));
	}

	index (obj, arg) {
		return obj.indexOf(arg);
	}

	indexed (obj) {
		return Object.keys(obj).map(key => {
			return obj[key];
		});
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

		return a.filter(key => {
			return this.contains(b, key);
		});
	}

	isEmpty (obj) {
		return obj.length === 0;
	}

	iterate (obj, fn) {
		let itr = this.iterator(obj),
			i = -1,
			item, next;

		do {
			item = itr.next();
			next = !item.done ? fn(item.value, ++i) : false;
		} while (next !== false);

		return obj;
	}

	iterator (obj) {
		let nth = obj.length,
			i = -1;

		return {
			next () {
				return ++i < nth ? {done: false, value: obj[i]} : {done: true};
			}
		};
	}

	keepIf (obj, fn) {
		let result, remove;

		result = obj.filter(fn);
		remove = this.diff(obj, result);

		this.each(remove, i => {
			this.remove(obj, this.index(obj, i));
		});

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
		let result = [],
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
		this.each(b, i => {
			this.add(a, i);
		});

		return a;
	}

	min (obj) {
		return this.sorted(this.clone(obj))[0];
	}

	mingle (a, b) {
		return a.map((i, idx) => {
			return [i, b[idx]];
		});
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

	range (obj) {
		return this.max(obj) - this.min(obj);
	}

	rassoc (obj, arg) {
		let result;

		this.each(obj, i => {
			if (i[1] === arg) {
				result = this.clone(i);

				return false;
			}
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

		this.each(remove, i => {
			this.remove(obj, this.index(obj, i));
		});

		return obj;
	}

	removeWhile (obj, fn) {
		let remove = [];

		this.iterate(obj, i => {
			if (fn(i) !== false) {
				remove.push(i);
			} else {
				return false;
			}
		});

		this.iterate(remove, i => {
			this.remove(obj, this.index(obj, i));
		});

		return obj;
	}

	replace (a, b) {
		this.clear(a);
		this.each(b, i => {
			a.push(i);
		});

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
		let result = [],
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

	stddev (obj) {
		return Math.sqrt(this.variance(obj));
	}

	sum (obj) {
		let result = 0;

		if (obj.length > 0) {
			result = obj.reduce((a, b) => {
				return a + b;
			}, 0);
		}

		return result;
	}

	take (obj, n) {
		return this.limit(obj, 0, n);
	}

	toObject (ar) {
		let obj = {},
			i = ar.length;

		while (i--) {
			obj[i.toString()] = ar[i];
		}

		return obj;
	}

	total (obj) {
		return this.indexed(obj).length;
	}

	unique (obj) {
		let result = [];

		this.each(obj, i => {
			this.add(result, i);
		});

		return result;
	}

	variance (obj) {
		let nth = obj.length,
			n = 0,
			mean, result;

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

	zip (obj, ...args) {
		let result = [];

		this.each(args, (i, idx) => {
			if (!(i instanceof Array)) {
				args[idx] = [i];
			}
		});

		// Building result Array
		this.each(obj, (i, idx) => {
			result[idx] = [i];

			this.each(args, x => {
				result[idx].push(x[ idx] || null);
			});
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
}}(typeof window !== "undefined" ? window : global));
