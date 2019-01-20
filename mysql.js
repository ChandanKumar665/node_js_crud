var mysql = require('mysql')
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'sbi'
});
con.connect(function(err) {
	if(err)
		throw err;
	console.log('connection successful');
	con.query('select * from customer',function(err, result, fields) {
	if(err)
		throw err;
	console.log(result);
	console.log(typeof(result));
	for(var x in result) {
		console.log(result[x].name+'\n');
	}
	});
});	
// con.query('select * from dummy',function(err, result, fields) {
// 	if(err)
// 		throw err;
	// console.log(result);
// 	console.log(fields);

// });