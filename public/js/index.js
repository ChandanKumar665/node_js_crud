
read()

function read() {
	$.get('/api/read',{},function(data) {
		user_details = []
		console.log(data)
		for (var i =0;i< data.length; i++) {
			file = (data[i]['file_path'] == null || data[i]['file_path'] == "")?'./public/images/profile_img/default.png':data[i]['file_path'];
			user_details[i] = {
								'name':data[i]['name'],'gender':data[i]['gender'],'email':data[i]['email'],
								'phone':data[i]['phone'],'address':data[i]['address'],
								'pic':"<img src=."+file+" width='50px' height='50px'></img>",
								'action':"<a href='/views/edit.html?id="+data[i]['id']+" '><i class='far fa-edit'></i></a>| "+
										 "<a href='/views/details.html?id="+data[i]['id']+" '><i class='fas fa-info'></i></a> | "+
										 "<a href='/api/delete/"+data[i]['id']+" '><i class='fas fa-trash-alt'></i></a> | "+
										 "<a href='view.html?path="+file+" '><i class='fa fa-file'></i></a>"
										 
							  }
		}
		var table = getTable([
								{'id':'mytable'},
								{'header':[
											'Name',
											'Gender',
											'Email',
											'Phone',
											'Address',
											'Pic',
											'Action'
										  ]
								},
								{'content':user_details}			
						   ])
		$('#tableres').append(table)
	});
}

function displayResult(data) {
	// $.each(data,function(i,item){
	// 	var x=$('<div>Title:'+item.title+'</div>'+
				// '<div>instructor:'+item.instructor+'</div>'+
				// '<div>level:'+item.level+'</div>'+
				// '<div>total_videos:'+item.total_videos+'</div>')
	// 	$('#result').append(x)		
	// })

	for (x in data) {
		// console.log(x)
		var r='<div>Title:'+data[x]["title"]+'</div>'+
				'<div>instructor:'+data[x].instructor+'</div>'+
				'<div>level:'+data[x].level+'</div>'+
				'<div>total_videos:'+data[x].total_videos+'</div>'
		$('#result').append(r)			
	}
}

function getTable(tablelist=[]){
	var tableResult='';
	var id=''
	if(tablelist == null)
		return ''
	for(obj in tablelist) {
		if (tablelist[obj].id){
			id='id='+tablelist[obj].id
			continue
		}
		else if(tablelist[obj].header){
			tableResult = '<table class="table" '+id+'>'+
							'<thead class="thead-dark">'+
								'<tr>'
			 for(value in tablelist[obj].header) {
			 	tableResult += 		'<th>'+tablelist[obj].header[value]+'</th>'	
			}
			tableResult += 		'</tr>'+
							'</thead>'
		}
		else if(tablelist[obj].content){
			for(value in tablelist[obj].content) {
				tableResult += '<tr>'
				var arr = Object.entries(tablelist[obj].content[value])
				for(i=0;i<arr.length;i++){	
					tableResult += '<td>'+arr[i][1]+'</td>'
				}
				tableResult += '</tr>'
			}
		}
		
	}
	tableResult += '</table>'
	return tableResult;
}