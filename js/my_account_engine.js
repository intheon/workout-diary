function wipeDiv()
{
	$(".panel_content *").fadeOut(function(){
		draw();
	});
}

function editUser()
{
	wipeDiv();
}
function newUser()
{
	wipeDiv();
}

function draw()
{
	$(".panel_content").html("\
		<h2>Basic</h2>\
		<p>Enter some basic information about yourself</p>\
		<form name='new_user' id='new_user'>\
			<div class='column_item'>\
				<p class='column_title'>Name</p>\
				<input class='column_content' type='text' placeholder='Name' name='username'/>\
			</div>\
			<div class='column_item'>\
				<p class='column_title'>Sex</p>\
				<p class='column_content'>Male</p>\
				<input class='column_content' type='radio' value='Male' name='sex'/>\
				<p class='column_content'>Female</p>\
				<input class='column_content' type='radio' value='Female' name='sex'/>\
			</div>\
			<div class='column_item'>\
				<p class='column_title'>Weight</p>\
				<input class='column_content' type='text' placeholder='Weight in kilograms' name='weight'/>\
			</div>\
			<div class='column_item'>\
				<p class='column_title'>Height</p>\
				<input class='column_content' type='text' placeholder='Height in centimeters' name='height'/>\
			</div>\
			<div class='column_item'>\
				<p class='column_title'>Submit</p>\
				<a class='column_content' href='#' onclick='submitBasic()'>Submit</a>\
			</div>\
		</form>\
	");

	}

function submitBasic()
{
	var formData = 	$("#new_user").serialize();
	var arr = formData.split("&");
		for (i = 0; i < arr.length; i++)
			{
				var arrProp = arr[i].split("=");
				localStorage.setItem(arrProp[0],arrProp[1]);
			}

}	

			