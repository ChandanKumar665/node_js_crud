var url = location.href
var id = url.substring(url.indexOf('id=') + 3 );
getUserDetails(id)

function getUserDetails(id) {
	$.get('/api/read/'+id,{},function(data){
		$('#name').val(data[0]['name'])
		$('#gender').val(data[0]['gender'])
		$('#email').val(data[0]['email'])
		$('#phone').val(data[0]['phone'])
		$('#address').val(data[0]['address'])
		$('#id').val(id)
	})
}