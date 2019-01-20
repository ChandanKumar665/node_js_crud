/*
Consider modules to be the same as JavaScript libraries.
A set of functions you want to include in your application.
*/
exports.findDate = function() {
	return new Date();
}

exports.findHours = function() {
	return new Date().getHours();
}