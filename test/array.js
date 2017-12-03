const retsu = require("../index.js");

exports["add"] = {
	setUp: function (done) {
		this.val = [0];
		done();
	},
	test: function (test) {
		test.expect(2);
		test.equal(retsu.add(this.val, 0).length, 1, "Should be 1");
		test.equal(retsu.add(this.val, 1).length, 2, "Should be 2");
		test.done();
	}
};

exports["binIndex"] = {
	setUp: function (done) {
		this.val = [0, 1, 2, 3, 4];
		done();
	},
	test: function (test) {
		test.expect(6);
		test.equal(retsu.binIndex(this.val, 0), 0, "Should be 0");
		test.equal(retsu.binIndex(this.val, 1), 1, "Should be 1");
		test.equal(retsu.binIndex(this.val, 2), 2, "Should be 2");
		test.equal(retsu.binIndex(this.val, 3), 3, "Should be 3");
		test.equal(retsu.binIndex(this.val, 4), 4, "Should be 4");
		test.equal(retsu.binIndex(this.val, 5), -1, "Should be -1");
		test.done();
	}
};

exports["cast"] = {
	setUp: function (done) {
		this.val = {abc: true, xyz: false};
		done();
	},
	indices: function (test) {
		test.expect(2);
		test.equal(retsu.cast(this.val)[0], true, "Should be true");
		test.equal(retsu.cast(this.val)[1], false, "Should be false");
		test.done();
	},
	keys: function (test) {
		test.expect(2);
		test.equal(retsu.cast(this.val, true)[0], "abc", "Should be 'abc'");
		test.equal(retsu.cast(this.val, true)[1], "xyz", "Should be 'xyz'");
		test.done();
	}
};

exports["chunk"] = {
	setUp: function (done) {
		this.val = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		done();
	},
	test: function (test) {
		test.expect(2);
		test.equal(retsu.chunk(this.val, 5).length, 2, "Should be '2'");
		test.equal(retsu.chunk(this.val, 5)[0].length, 5, "Should be '5'");
		test.done();
	}
};

exports["clear"] = {
	setUp: function (done) {
		this.val = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.clear(this.val).length, 0, "Should be '0'");
		test.done();
	}
};

exports["clone"] = {
	setUp: function (done) {
		this.val = [true, false];
		this.clone = undefined;
		done();
	},
	test: function (test) {
		test.expect(5);
		test.equal(retsu.clone(this.val)[0], true, "Should be true");
		test.equal(retsu.clone(this.val)[1], false, "Should be false");
		test.equal(this.clone = retsu.clone(this.val), this.clone, "Should be a clone");
		test.equal(this.clone.push(true), 3, "Should be 3");
		test.equal(this.val.length, 2, "Should be 2");
		test.done();
	}
};

exports["compact"] = {
	setUp: function (done) {
		this.val = [0, null, 1];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.compact(this.val).length, 2, "Should be '2'");
		test.done();
	}
};

exports["count"] = {
	setUp: function (done) {
		this.val = [1, 3, 1, 3, 3];
		done();
	},
	test: function (test) {
		test.expect(2);
		test.equal(retsu.count(this.val, 1), 2, "Should be '2'");
		test.equal(retsu.count(this.val, 3), 3, "Should be '3'");
		test.done();
	}
};

exports["diff"] = {
	setUp: function (done) {
		this.a1 = ["abc", "def"];
		this.a2 = ["abc", "xyz"];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.diff(this.a1, this.a2).length, 2, "Should be 2 differences");
		test.done();
	}
};

exports["each"] = {
	setUp: function (done) {
		this.val = ["abc", "def"];
		done();
	},
	test: function (test) {
		let result = [];

		retsu.each(this.val, function (i, idx) {
			result.push({value: i, index: idx});
		});

		test.expect(4);
		test.equal(result[0].value, "abc", "Should be 'abc'");
		test.equal(result[0].index, 0, "Should be '0'");
		test.equal(result[1].value, "def", "Should be 'def'");
		test.equal(result[1].index, 1, "Should be '1'");
		test.done();
	}
};

exports["equal"] = {
	setUp: function (done) {
		this.a = [0];
		this.b = [0];
		this.c = [];
		done();
	},
	test: function (test) {
		test.expect(2);
		test.equal(retsu.equal(this.a, this.b), true, "Should be 'true'");
		test.equal(retsu.equal(this.a, this.c), false, "Should be 'false'");
		test.done();
	}
};

exports["fill"] = {
	setUp: function (done) {
		this.val = ["a", "b"];
		done();
	},
	test: function (test) {
		test.expect(3);
		test.equal(retsu.fill(this.val.slice(), "!")[0], "!", "Should be '!'");
		test.equal(retsu.fill(this.val.slice(), "!", 1)[0], "a", "Should be 'a'");
		test.equal(retsu.fill(this.val.slice(), "!", 1)[1], "!", "Should be '!'");
		test.done();
	}
};

exports["flatten"] = {
	setUp: function (done) {
		this.val = [1, [2, 3, [4, 5, 6]]];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.flatten(this.val).length, 6, "Should be an retsu of 6 indices");
		test.done();
	}
};

exports["intersect"] = {
	setUp: function (done) {
		this.a1 = ["abc", "def"];
		this.a2 = ["abc", "xyz"];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.intersect(this.a1, this.a2).length, 1, "Should be 1 match");
		test.done();
	}
};

exports["last"] = {
	setUp: function (done) {
		this.val = ["abc", "xyz", "def"];
		done();
	},
	test: function (test) {
		test.expect(4);
		test.equal(retsu.last(this.val), "def", "Should be 'def'");
		test.equal(retsu.last(this.val, 2)[0], "xyz", "Should be 'xyz'");
		test.equal(retsu.last(this.val, 3)[0], "abc", "Should be 'abc'");
		test.equal(retsu.last(this.val, 4)[0], "abc", "Should be 'abc'");
		test.done();
	}
};

exports["limit"] = {
	setUp: function (done) {
		this.val = ["a", "b", "c", "d", "e"];
		done();
	},
	test: function (test) {
		test.expect(3);
		test.equal(retsu.limit(this.val, 3, 2).length, 2, "Should be 2");
		test.equal(retsu.limit(this.val, 3, 2)[0], "d", "Should be 'd'");
		test.equal(retsu.limit(this.val, 3, 2)[1], "e", "Should be 'e'");
		test.done();
	}
};

exports["max"] = {
	setUp: function (done) {
		this.val = [1, 3, 7, 2, 10];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.max(this.val), 10, "Should be '10'");
		test.done();
	}
};

exports["mean"] = {
	setUp: function (done) {
		this.val = [1, 3, 5];
		this.invalid = [];
		done();
	},
	test: function (test) {
		test.expect(2);
		test.equal(retsu.mean(this.val), 3, "Should be '3'");
		test.equal(retsu.mean(this.invalid), undefined, "Should be 'undefined'");
		test.done();
	}
};

exports["median"] = {
	setUp: function (done) {
		this.even = [5, 1, 3, 8];
		this.odd = [5, 1, 3];
		done();
	},
	test: function (test) {
		test.expect(2);
		test.equal(retsu.median(this.even), 4, "Should be '4'");
		test.equal(retsu.median(this.odd), 3, "Should be '3'");
		test.done();
	}
};

exports["merge"] = {
	setUp: function (done) {
		this.a = [];
		this.b = [];
		done();
	},
	test: function (test) {
		test.expect(2);
		this.a = [1];
		this.b = [2, 3, 4, 5];
		test.equal(retsu.merge(this.a, this.b), this.a, "Should be 'this.a'");
		test.equal(this.a.length, 5, "Should be '5'");
		test.done();
	}
};

exports["min"] = {
	setUp: function (done) {
		this.val = [1, 3, 7, 2, 10];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.min(this.val), 1, "Should be '1'");
		test.done();
	}
};

exports["mingle"] = {
	setUp: function (done) {
		this.val = [["a", "b", "c", "d"], [0, 1, 2, 3]];
		this.result = [["a", 0], ["b", 1], ["c", 2], ["d", 3]];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.mingle(this.val[0], this.val[1])[0][0], this.result[0][0], "Should match '" + this.result[0][0] + "'");
		test.done();
	}
};

exports["mode"] = {
	setUp: function (done) {
		this.single = [1, 3, 7, 1, 2, 10, 7, 7, 3, 10];
		this.many = [1, 3, 7, 1, 2, 10, 7, 7, 3, 10, 10];
		this.none = [];
		done();
	},
	test: function (test) {
		test.expect(3);
		test.equal(retsu.mode(this.single), 7, "Should be '7'");
		test.equal(retsu.mode(this.many).length, 2, "Should be '2' ([7, 10])");
		test.equal(retsu.mode(this.none), undefined, "Should be 'undefined'");
		test.done();
	}
};

exports["range"] = {
	setUp: function (done) {
		this.val = [5, 1, 3, 8];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.range(this.val), 7, "Should be '7'");
		test.done();
	}
};

exports["replace"] = {
	setUp: function (done) {
		this.a = ["abc", "xyz"];
		this.b = [0, 1, 2];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.replace(this.a.slice(), this.b).length, 3, "Should be 3");
		test.done();
	}
};

exports["series"] = {
	setUp: function (done) {
		done();
	},
	test: function (test) {
		test.expect(4);
		test.equal(retsu.series(0, 5).length, 5, "Should be 5");
		test.equal(retsu.last(retsu.series(0, 5)), 4, "Should be 4");
		test.equal(retsu.series(0, 25, 5).length, 5, "Should be 5");
		test.equal(retsu.last(retsu.series(0, 25, 5)), 20, "Should be 20");
		test.done();
	}
};

exports["spread"] = {
	setUp: function (done) {
		this.lower = 21;
		this.upper = 100;
		done();
	},
	lower: function (test) {
		let i = -1,
			ar = [],
			result = this.lower - 1;

		while (++i < this.lower) ar.push(i);

		test.expect(3);
		test.equal(retsu.spread(ar, 3).length, 3, "Should be '3'");
		test.equal(retsu.spread(ar, 3)[0].length, 7, "Should be '7'");
		test.equal(retsu.last(retsu.last(retsu.spread(ar, 3))), result, "Should be '" + result + "'");
		test.done();
	},
	upper: function (test) {
		let i = -1,
			ar = [],
			result = this.upper - 1;

		while (++i < this.upper) ar.push(i);

		test.expect(3);
		test.equal(retsu.spread(ar, 43).length, 43, "Should be '43'");
		test.equal(retsu.spread(ar, 43)[0].length, 3, "Should be '3'");
		test.equal(retsu.last(retsu.last(retsu.spread(ar, 43))), result, "Should be '" + result + "'");
		test.done();
	}
};

exports["sort"] = {
	setUp: function (done) {
		this.val = ["abc", "xyz", "A", "d", 123];
		done();
	},
	test: function (test) {
		test.expect(5);
		test.equal(this.val.sort(retsu.sort)[0], 123, "Should be 123");
		test.equal(this.val[1], "A", "Should be 'A'");
		test.equal(this.val[2], "abc", "Should be 'abc'");
		test.equal(this.val[3], "d", "Should be 'd'");
		test.equal(this.val[4], "xyz", "Should be 'xyz'");
		test.done();
	}
};

exports["sum"] = {
	setUp: function (done) {
		this.val = [1, 3, 5];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.sum(this.val), 9, "Should be '9'");
		test.done();
	}
};

exports["stddev"] = {
	setUp: function (done) {
		this.val = [1, 3, 5];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.stddev(this.val), 1.632993161855452, "Should be '1.632993161855452'");
		test.done();
	}
};

exports["unique"] = {
	setUp: function (done) {
		this.val = [0, 1, 1, 2, 2, 3];
		done();
	},
	test: function (test) {
		test.expect(1);
		test.equal(retsu.unique(this.val).length, 4, "Should be '4'");
		test.done();
	}
};

