var exercises;
var foodRunningTotal = 0;
var exerciseRunningTotal = 0;
var calorificNeed  = 0;
var remainingCalories;
var cDate;

$(document).ready(function(){

	cDate = whatDate();

		$.ajax({
			type: "POST",
			url:  "https://localhost/workout-diary/php/module_pull_athlete.php",
			success: function(response)
			{
				user = JSON.parse(response);
				writeAthlete();
			}
		});

		$.ajax({
			type: "POST",
			url:  "https://localhost/workout-diary/php/module_pull_exercises.php",
			data: {
				filter: whatDate()
			},
			success: function(exercises)
			{
				writeExercises(exercises);
			}
		});

		$.ajax({
			type: "POST",
			url:  "https://localhost/workout-diary/php/module_pull_diet.php",
			data: "dateFilter=" + cDate,
			success: function(diet)
			{
				parseDiet(diet);
			}
		});

		$.ajax({
			type: "POST",
			url:  "https://localhost/workout-diary/php/module_manage_timings.php",
			data: {
				getDate: true,
			},
			success: function(jsonString)
			{
				// i just get a json string back from 
				// the server with bits of useful shit in

				var jsonObj = JSON.parse(jsonString);

				// the next block is the logic that
				// figures out how far you are in

				var dayOfYear = dayOfYearCounter();
				var dayStarted = jsonObj[0].days_in;


				var difference = dayOfYear - dayStarted;
				var weekCount = Math.floor(difference / 7);	

				$("#startDate").html(jsonObj[0].date);

				$("#weekNumber").html(weekCount + 1);
				$("#daysInToWeek").html(difference + 1);

				$("#pictures_illustration .jumbo").html(7 - difference);

				if (7 - difference <= 0)
				{
					$(".alert_panel").html("<div class='alert'><p>It is time for a picture!</p></div>")
				}

			}
		});

	$("#currentDate").html(cDate); 

	$("#initialise_weeks").click(function(){
		startWeeksCount();
	});
});


function writeAthlete()
{
	// this calculates how many calories you've burned today
	// does it by hour, then plops on 
	var dateObj = new Date();
	var dateHours =	dateObj.getHours();
	$("#calories_out").html(parseInt(user[0].calories / 24 * dateHours))
}

function writeExercises(exerciseString)
{
	var eString = JSON.parse(exerciseString);
	var itemQ = 0;
	$("#exercise_output p").html("");
	for (i = 0; i <= eString.length - 1; i++)
	{
		itemQ++;

		var p = eString[i];

		var temp = p.calories_total;
			temp = parseInt(temp);
			exerciseRunningTotal += temp;

		$("#exercise_output p").append("<div class='database_output_panel'>\
			<div class='item_number'>"+itemQ+"</div>\
			<div class='item_description'>"+p.exercise_name+"</div>\
			<div class='item_sub_description'>("+p.calories_total+" Calories / "+p.minutes_quantity+" Mins)</div>\
			</div>\
		");

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
			foodRunningTotal += temp;
	}	
		// our loop which grabs the total number of calories for each obj
		// and converts it to a number

	$("#calories_in").html(foodRunningTotal);
		// overwrite whatever value is there

	var itemQ = 0;

	$("#food_output p").html("");

	for (i = 0; i <= pString.length; i++)
	{
		var p = JSON.parse(pString[i].json);

		for (k in p)
		{
			for (values in p[k])
			{
				itemQ++

				$("#food_output p").append("<div class='database_output_panel'>\
						<div class='item_number'>"+itemQ+"</div>\
						<div class='item_description'>"+values+"</div>\
						<div class='item_sub_description'>("+p[k][values]+" Calories)</div>\
					</div>\
				");
			}
		}
	}


}

function startWeeksCount()
{
	$.ajax({
		type: "POST",
		url:  "https://localhost/workout-diary/php/module_manage_timings.php",
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

