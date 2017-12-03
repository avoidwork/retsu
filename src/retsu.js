	class Retsu {
		constructor () {
			this.version = "{{version}}";
		}

		add (obj, arg) {
			if (obj.includes(arg) === false) {
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
			return JSON.parse(JSON.stringify(obj));
		}

		combination (obj, n) {
			const result = [],
				nth = obj.length;

			if (n === 0) {
				result.push([]);
			} else if (n < nth) {
				this.each(obj, (i, idx) => {
					const o = [];

					let sub;

					if (n > 1) {
						sub = obj.slice(idx, nth);
						this.each(sub, x => {
							o.push(x);

							if (o.length === n) {
								result.push(this.clone(o));
								o.pop();
							}
						});
					} else {
						result.push([this.clone(i)]);
					}
				});
			} else if (n === nth) {
				result.push(this.clone(obj));
			}

			return result;
		}

		compact (obj, diff = false) {
			const result = obj.filter(i => i !== null && i !== undefined);

			return diff === false ? result : result.length < obj.length ? result : [];
		}

		count (obj, value) {
			return obj.filter(i => i === value).length;
		}

		diff (a, b) {
			return a.filter(i => b.includes(i) === false).concat(b.filter(i => a.includes(i) === false));
		}

		each (obj, fn, ctx = obj) {
			return this.iterate(obj, fn, ctx);
		}

		empty (obj) {
			return obj.length === 0;
		}

		equal (a, b) {
			return JSON.stringify(a) === JSON.stringify(b);
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

		flatten (obj) {
			return obj.reduce((a, b) => a.concat(Array.isArray(b) ? this.flatten(b) : b), []);
		}

		insert (obj, idx, ...args) {
			const start = idx >= 0 ? idx : obj.length + idx;

			obj.splice(start, 0, ...args);

			return obj;
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

			return a.filter(i => b.includes(i));
		}

		iterate (obj, fn, ctx = obj) {
			const itr = this.iterator(obj);

			let i = -1,
				item, next;

			do {
				item = itr.next();
				next = !item.done ? fn.call(ctx, item.value, ++i) : false;
			} while (next !== false);

			return obj;
		}

		* iterator (obj) {
			const nth = obj.length;
			let i = -1;

			while (++i < nth) {
				yield obj[i];
			}
		}

		last (obj, arg) {
			const n = obj.length - 1;
			let larg = arg,
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
			this.each(Object.keys(values), k => {
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

		replace (a, b) {
			this.clear(a);
			this.each(b, i => a.push(i));

			return a;
		}
		series (start = 0, end = start, offset = 1) {
			const result = [];
			let n = -1,
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

		sorted (obj, clone = false) {
			let o = clone ? this.clone(obj) : obj;

			return o.sort(this.sort);
		}

		spread (obj, divisor) {
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
			return obj.length > 0 ? obj.reduce((a, b) => a + b, 0) : 0;
		}

		unique (obj) {
			return Array.from(new Set(obj));
		}

		variance (obj) {
			const nth = obj.length;
			let n = 0,
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
	}
