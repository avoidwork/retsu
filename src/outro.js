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
