	// Node, AMD & window supported
	if (typeof exports !== "undefined") {
		module.exports = retsu;
	} else if (typeof define === "function" && define.amd !== void 0) {
		define(() => retsu);
	} else {
		global.retsu = retsu;
	}
}(typeof window !== "undefined" ? window : global));
