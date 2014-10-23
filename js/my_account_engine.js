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
		<form name='user_info' id='user_info'>\
			<div class='column_item'>\
				<p class='column_title'>Name</p>\
				<input class='column_content' type='text' placeholder='Name' name='name'/>\
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
			<h2>Metabolism</h2>\
			<div class='column_item'>\
				<p class='column_title'>Base Calorific need</p>\
				<input class='column_content' type='text' placeholder='BMR' name='bmr'/>\
			</div>\
			<div class='column_item'>\
				<p class='column_title'>Actual Calorific need</p>\
				<input class='column_content' type='text' placeholder='Actual' name='acn'/>\
			</div>\
			<div class='column_item'>\
				<p class='column_title'>Submit</p>\
				<a class='column_content' href='#' onclick='submit()'>Submit</a>\
			</div>\
		</form>\
	");

	}

function submit()
{
	var formData = 	$("#user_info").serialize();

	$.ajax({
		type: "POST",
		url:  "http://localhost/workout-diary/php/module_push_athlete.php",
		data: formData,
		success: function(response)
		{
			console.log(response);
		}
	});

}	

$ ( document ).ready(function(){
	retreive();
});

var userData;

function retreive()
{

	$.ajax({
		type: "GET",
		url:  "http://localhost/workout-diary/php/module_pull_athlete.php",
		success: function(response)
		{
			userData = response;
		}
	});

}	

var selectDropdown = [];
var user = {};

$ ( document ).ajaxSuccess(function(){

	var parsed = JSON.parse(userData);

	for (key in parsed)
	{
		selectDropdown.push("<option value='" + parsed[key].id + "'>" + parsed[key].name + "</option>");
	}

	for (i = 0; i <= parsed.length - 1; i++)
	{
		//console.log(parsed[i]);
	}

	$(".panel_content").append("\
		<div class='column_item'>\
			<div class='column_title'>Logged in as</div>\
			<div class='column_content'>\
				<select class='select_athlete'>\
				" + selectDropdown + "\
				</select>\
			</div>\
		</div>\
		");

	$(".select_athlete").on("change",function(){
		var currentlySelectedUser = $(this).val();

		localStorage.setItem("currentUser",currentlySelectedUser);

		$(".moar").html("\
			<div class='column_item'>\
				<div class='column_title'>Sex</div>\
				<div class='column_content'>\
				"+ parsed[currentlySelectedUser - 1].sex +"\
				</div>\
			</div>\
			<div class='column_item'>\
				<div class='column_title'>Weight</div>\
				<div class='column_content'>\
				"+ parsed[currentlySelectedUser - 1].weight +"\
				</div>\
			</div>\
			<div class='column_item'>\
				<div class='column_title'>Height</div>\
				<div class='column_content'>\
				"+ parsed[currentlySelectedUser - 1].height +"\
				</div>\
			</div>\
			<div class='column_item'>\
				<div class='column_title'>BMR</div>\
				<div class='column_content'>\
				"+ parsed[currentlySelectedUser - 1].bmr +"\
				</div>\
			</div>\
			<div class='column_item'>\
				<div class='column_title'>ACN</div>\
				<div class='column_content'>\
				"+ parsed[currentlySelectedUser - 1].acn +"\
				</div>\
			</div>\
		");
	});



})

			