var user;
var exercises;

$(document).ready(function(){
	whatDate("currentDate");
	var value = localStorage.getItem("currentUser");
		value = parseInt(value);

		$.ajax({
			type: "POST",
			url:  "http://localhost/workout-diary/php/module_pull_athlete.php",
			data: "athletenum=" + value,
			success: function(response)
			{
				user = JSON.parse(response);
				writeAthlete();
			}
		});

		$.ajax({
			type: "GET",
			url:  "http://localhost/workout-diary/php/module_pull_exercises.php",
			success: function(response2)
			{
				exercises = JSON.parse(response2);
				writeCardio();
			}
		});

		$.ajax({
			type: "GET",
			url:  "http://localhost/workout-diary/php/module_pull_week.php",
			success: function(response3)
			{
				console.log(response3);
			}
		});

});


function writeAthlete()
{
	$("#currentUser").html(user[0].name);
	$("#calories_illustration .jumbo").html(user[0].acn);
}

function writeCardio()
{

var arr = []

for (i = 0; i <= exercises.length - 1 ; i++)
{
	arr.push(exercises[i]);
}

var cardioExercises = localStorage.getItem("cardiovascular");
	cardioExercises = JSON.parse(cardioExercises);

var count = 0;
for (keys in cardioExercises)
{
	count++
	$(".localstorage_panel").append("<div class='small_item'>\
		<p>\
		" + cardioExercises[keys] + " lots of " + keys + " which is " + arr[count].calories * cardioExercises[keys] + " calories.\
		</p>\
		</div>");
}
}
