console.log('this is add.js')
$().ready(main)

function main(){
	$('#file').on('change',function(evt){
		readUrl(this)
		// file=evt.target.files
	})
}

function readUrl(input) {
	if(input.files){
			console.log('inside')
			var reader = new FileReader()
			reader.onload = function(evt) {
						 // Render thumbnail.
						 // var span = document.createElement('<span>')
						 // span.innerHtml='';
						 $('#pic').html('<img class="thumbnail" src=" '+evt.target.result+' " />')
						}
						reader.readAsDataURL(input.files[0]);
		}
}

function add_user(){
	var name = $("#user_name").val();
  var email = $("#email").val();
  var gender = $('#gender').val()
  phone = $('#phone').val()
  address = $('#address').val()

	$.post('/api/add',{name,email,gender,phone,address},function(data){
		alert(data)
		alert(typeof(data))
		if(data) {
			alert('hiii')
			window.location.href = '/views/index.html';
		}
	})
}