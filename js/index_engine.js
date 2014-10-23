$(document).ready(function(){

var usersList;

	$.ajax({
		type: "GET",
		url:  "http://localhost/workout-diary/php/module_pull_athlete.php",
		success: function(response)
		{
			usersList = response;
		}
	});

	


	console.log(localStorage.getItem);


});
