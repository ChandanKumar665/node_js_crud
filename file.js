var fs = require('fs')
var url = require('url')
var http = require('http')
fs.readFile('abc.txt',function(err,data){
	console.log(data)
})
fs.appendFile('abc.txt',' appended data \n',function(err){
	console.log('saved')
})
fs.open('newfile.txt','w',function(err){
	console.log('created')
})
fs.writeFile('file.txt','this is new file',function(err){
console.log('writen')
})
fs.unlink('file.txt',function(err){
	console.log('file deleted')
})
fs.rename('newfile.txt','file_new.txt',function(err){
	console.log('renamed')
})

http.createServer(function(req,res){
	var myurl = url.parse(req.url,true)
	var filename = '.'+myurl.pathname
	console.log(filename)
	fs.readFile(filename,function(err,data){
		if(err){
			res.end('400 not found')
		} else{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data)
		}
		
	})
}).listen(4000)