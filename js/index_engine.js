var user;

$(document).ready(function(){
var value = localStorage.getItem("currentUser");
	value = parseInt(value);

	$.ajax({
		type: "POST",
		url:  "http://localhost/workout-diary/php/module_pull_athlete.php",
		data: "athletenum=" + value,
		success: function(response)
		{
			user = JSON.parse(response);
		}
	});

});


$(document).ajaxSuccess(function(){

	$("#currentUser").html(user[0].name);
	$("#calories_illustration .jumbo").html(user[0].acn);
});
