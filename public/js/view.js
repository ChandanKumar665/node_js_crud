console.log('this is file view')
var url = location.href
path = url.substring(url.indexOf('path=')+5);
console.log(path)
getImage(path)

function getImage(file_path){
	// let reader = new FileReader();
	// reader.onload = function(evt){
	// 	file = evt.target.result
	// 	img = $('#dp')
	// 	img.src = file
	// }
	// reader.readAsDataURL(file_path);
	$('#dp').attr('src','.'+file_path)
}
