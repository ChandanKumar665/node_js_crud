var mysql = require('mysql')

exports.getConnection = function() {
	var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'js_crud'
	});
	return connection
}
exports.read =  function(connection, table) {
	var output=[]
	connection.connect(function(err) {
		if(err)
			throw err
		console.log('connection successful');
		connection.query("select * from `" + table +"` " ,function(err, result, fields) {
			if(err)
				throw err
		});
	});
	
}


