var express = require('express');
var http = require('http')
var fs = require('fs')
var multer = require('multer')
var fileupload = require('express-fileupload')
var app = express();
var url = require('url')
var port = 4000;
var con = require('./my_modules/sql_module')
// fs = require('fs')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));
app.listen(port);
app.use(fileupload());

// http.createServer(function(req,res){
// 	fs.readFile('abc.txt',function(err,data){
// 		res.writeHead(200, {'Content-Type': 'text/html'});
// 		res.write(data);
// 	})
// }).listen(port)
console.log('server runnnig at' + port);


var connection = con.getConnection()
connection.connect(function(error){
		if(error)
			throw error
		console.log('connection successful')
	})
//creating api
app.get('/',function(req,res){
	res.redirect('./views/index.html')
})
//read api
app.get('/api/read',function(request,response) {
	// holding data on server
    var table = 'user_details as ud'
	connection.query('select ud.name,ud.gender,ud.email,ud.phone,ud.address,ud.id,dp.file_path from user_details as ud left join display_pic as dp on ud.id = dp.user_id order by ud.name', function(error,result,fields){
		if(error)
			throw error
		response.json(result)
	})				
})

//get according to id
app.get('/api/read/:id',function(request,response) {
	var table = 'user_details'
	connection.query('select ud.name,ud.gender,ud.email,ud.phone,ud.address,ud.id,dp.file_path from user_details as ud left join display_pic as dp on ud.id = dp.user_id where ud.id = ? order by ud.name', [request.params.id], function(error,result,fields){
		if(error)
			throw error
		response.json(result)
	})	
})

//add
app.post('/api/add',function(request,response) {
	var table = 'user_details'
	let emp = request.body;
	console.log(emp)
	// console.log(request.file)
	connection.query('insert into `'+table+'` (name,gender,email,phone,address) values(?,?,?,?,?)',[emp.name,emp.gender,emp.email,emp.phone,emp.address], function(error,result,fields){
		if(error)
			throw error
		if(result['affectedRows'] >= 1) {
			console.log(result['insertId'])
			id = result['insertId']
			//storing img in loacal disk
			
			table = 'display_pic'
			name = request.files.file.name;
			targetpath = './public/images/profile_img/'+id+'_'+Date.now()+'_'+name
			if(Object.keys(request.files.file).length == 0){
				response.status(400).send('error while uploading file')
			}
			let uploaded_file = request.files.file
			uploaded_file.mv(targetpath,function(err){
				if(err){
					console.log('error while uploading file....')
				} else {
					console.log('file started uploading...')
					connection.query('insert into `'+table+'` (file_name,file_path,user_id) values(?,?,?)',[name,targetpath,id], function(error,result,fields){
					if(error)
						throw error
					if(result['affectedRows'] >= 1){
						console.log('file uploaded successfully!')
						response.redirect('/views/index.html');
						response.end()
					} 
						
					})
				}
			})
		}
	})	
})

//file upload
app.post('/api/upload',function(req,res){
	console.log('inside upload')
	console.log(req.files.foo)
	if(Object.keys(req.files).length == 0)
		return res.status(400).send('no files found')
	let sample = req.files.foo
	sample.mv('./uploads/'+Date.now()+'_'+req.files.foo.name,function(err){
		if(err){
			return res.status(500).send(err)
		}
		else {
			console.log('uploadig files...')
			console.log('file uploaded successfully!')
			res.json({'msg':'success','name':req.files.name})

		}
	})
	
})

//edit
app.post('/api/edit',function(request,response) {
	// console.log('inside delete')
	var table = 'user_details'
	let emp = request.body;
	connection.query('update `'+table+'` set name = ?,gender = ?,email = ?,phone = ?,address = ? where id = ?',[emp.name,emp.gender,emp.email,emp.phone,emp.address,emp.id] ,function(error,result,fields){
		if(error)
			throw error
		if(result['affectedRows'] >= 1)
			response.redirect('/views/index.html');
	})	
})

//delete
app.get('/api/delete/:id',function(request,response) {
	var table = 'user_details'
	connection.query('delete from `'+table+'` where id = ?',[request.params.id] ,function(error,result,fields){
		if(error)
			throw error
		if(result['affectedRows'] >= 1)
			response.redirect('/views/index.html');
	})	
})

