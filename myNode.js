var http = require('http')
var dt = require('./my_modules/dateModule')
var con = require('./my_modules/sql_module')
var url = require('url');
var port = 4000;
var app = http.createServer(function(request, response) {
	response.writeHead(200,{'Content-type':'text/html'})
	response.write('<h1>heyy whats up?</h1>')
	//response.write(request.url+'<br>');
	//parsing the url into the query object.
	//var query = url.parse(request.url,true).query;
	//response.write(query.year+" "+query.month+'<br>');

	//getting connection from sql_modules.
	console.log('here')
	var connection = con.getConnection()
	console.log(typeof(connection))
	var table = 'customer'
	var resultSet = con.read(connection, table)
	console.log(resultSet)
	response.write(''+resultSet)
		// connection.connect(function(err) {
		// if(err)
		// 	throw err;
		// //console.log('connection successful');
		// connection.query('select * from customer',function(err, result, fields) {
		// if(err)
		// 	throw err;
		// // console.log('-----------');
		// console.log(result);
		// // console.log(typeof(result));
		// for(var x in result) {
		// 	//console.log(result[x].name+'\n');
		// 	response.write(result[x].name+'<br>');
		// }
		// });
		// });	
	// response.end('Hello world!! today is: '+ dt.findDate()+'---->'+dt.findHours());
	// response.end('hours: '+dt.findHours());
});

app.listen(port);
console.log('server started at port '+port);