var user;
var exercises;
var runningTotal = 0;
var calorificNeed  = 0;
var remainingCalories;
var cDate;

$(document).ready(function(){

	var value = localStorage.getItem("currentUser");
		value = parseInt(value);




	cDate = whatDate();

		$.ajax({
			type: "POST",
			url:  "http://localhost/workout-diary/php/module_pull_athlete.php",
			data: "athletenum=" + value,
			success: function(response)
			{
				user = JSON.parse(response);
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
			type: "POST",
			url:  "http://localhost/workout-diary/php/module_pull_diet.php",
			data: "dateFilter=" + cDate,
			success: function(diet)
			{
				parseDiet(diet);
			}
		});

		$.ajax({
			type: "POST",
			url:  "http://localhost/workout-diary/php/module_manage_timings.php",
			data: {
				getDate: true,
				currentDays: dayOfYearCounter()
			},
			success: function(responses)
			{
				$("#weekNumber").append(responses);
			}
		});

	$("#currentDate").html(cDate); 

	$("#initialise_weeks").click(function(){
		startWeeksCount();
	});
});

$(document).ajaxSuccess(function(){
	writeAthlete();
});


function writeAthlete()
{
	$("#currentUser").html(user[0].name);
	calorificNeed = parseInt(user[0].acn);
	remainingCalories = calorificNeed - parseInt(runningTotal);
	$("#calories_illustration .jumbo").html(remainingCalories);
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

function parseDiet(dietString)
{
	// first thing I want to do is tally up the total 
	// number of calories done today and spit it back client side.
	var pString = JSON.parse(dietString);
		// our raw data



	for (keys in pString)
	{
		var temp = pString[keys].total_calories;
			temp = parseInt(temp);
			runningTotal += temp;
	}	
		// our loop which grabs the total number of calories for each obj
		// and converts it to a number

	$("#existing_calories_illustration .jumbo").html(runningTotal);
		// overwrite whatever value is there

}

function startWeeksCount()
{
	$.ajax({
		type: "POST",
		url:  "http://localhost/workout-diary/php/module_manage_timings.php",
		data: {
			reset: true,
			date: cDate,
			daysIn: dayOfYearCounter()
		},
		success: function(responses)
		{
			console.log(responses);
		}
	});
}

