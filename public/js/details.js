var url = location.href
var id = url.substring(url.indexOf('id=') + 3 );
getUserDetails(id)

function getUserDetails(id) {
	$.get('/api/read/'+id,{},function(data){
		// console.log(data)
		var result = getTableReflow(data)
		$('#result').append(result)
	})
}

function getTableReflow(tablelist=[]){
	if (tablelist == null)
		return '';
	let table_html = '<table class="table">'
	entries = Object.entries(tablelist[0])
	for (i=0;i<entries.length;i++) {
		if(entries[i][0] == 'id')
			continue
		table_html += '<tr>'+
						'<td class="table-dark">'+captialize(entries[i][0])+'</td>'+
						'<td>'+entries[i][1]+'</td>'+
					  '</tr>'
	}
	table_html += '</table>'
	return table_html;
}

function captialize(str){
	 caps = str.charAt(0).toUpperCase()
	for (j=1;j<str.length;j++) {
		caps += str.charAt(j).toLowerCase();
	}
	return caps;
}