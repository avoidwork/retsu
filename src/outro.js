// Node, AMD & window supported
if (typeof exports != "undefined") {
	module.exports = array;
}
else if (typeof define == "function") {
	define(function () {
		return array;
	});
}
else {
	global.retsu = array;
}
} )(this);
