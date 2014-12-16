var exercises;
var foodRunningTotal = 0;
var exerciseRunningTotal = 0;
var calorificNeed  = 0;
var remainingCalories;
var cDate;
var weekCount;
var user;

$(document).ready(function(){
	// returns the current date
	cDate = whatDate();

	// pull in information about the user.
	$.ajax({
		type: "POST",
		url:  "http://localhost/workout-diary/php/module_pull_athlete.php",
		data: "dateFilter=" + cDate, 
		success: function(response)
			{
				var resp = JSON.parse(response);
				writeAthlete(resp);
			}
	});

	// pull in the exercises they have done.
	$.ajax({
		type: "POST",
		url:  "http://localhost/workout-diary/php/module_pull_exercises.php",
		data: 
		{
			filter: whatDate()
		},
		success: function(exercises)
		{
			writeExercises(exercises);
		}
	});

	// pull in what they have eaten.
	$.ajax({
		type: "POST",
		url:  "http://localhost/workout-diary/php/module_pull_diet.php",
		data: "dateFilter=" + cDate,
		success: function(diet)
		{
			parseDiet(diet);
		}
	});

	// timing management
	$.ajax({
		type: "POST",
		url:  "http://localhost/workout-diary/php/module_manage_timings.php",
		data: 
		{
			getDate: true,
		},
		success: function(jsonString)
		{
			var jsonObj = JSON.parse(jsonString);
			handleTimings(jsonObj);
		}
	});

	$("#currentDate").html(cDate); 
	// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
	// Get and write current date.


	$("#initialise_weeks").click(function(){
		showWarning("ARE YOU SURE??? <br />\
		 <a href='#' onclick='startWeeksCount()'>YES</a>");
	});


	// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
	// When clicked, resets all the timings.
	// 	** TODO **
	// 	- I should really add in some validation for this. 
	//  - It would be a ballache if it was accidentally clicked.
	// 	** **** **

	$("#pictureSubmitButton").click(function(){
		submitPictureToDatabase();
	});
	// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
	// Submit a picture to the database.

});

function writeAthlete(resp)
{
	var user = resp;
	// this calculates how many calories you've burned today
	// does it by hour, then plops on

	var dateObj = new Date();
	var dateHours =	dateObj.getHours();
	$("#calories_out").html(Math.round((user[0].calories / 24)) * dateHours);
	//$("#exercises_illustration .jumbo").html(parseInt(user[1].gym_visits_left));
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
		url:  "http://localhost/workout-diary/php/module_manage_timings.php",
		data: {
			reset: true,
			date: cDate,
			daysIn: dayOfYearCounter()
		},
		success: function(responses)
		{
			//console.log(responses);
		}
	});
}

function submitPictureToDatabase()
{
	// ** Gets the image from #pictureUploadForm and submits to PHP **

	var currentWeek = weekCount + 1;
	var formData = new FormData();
	formData.append("file", $("#fileUpload")[0].files[0]);
	formData.append("cWeek", currentWeek);

	$.ajax({
		url: "http://localhost/workout-diary/php/module_manage_picture.php",
		type: "POST",
		contentType: false,
		cache: false,
		processData: false,
		data: formData,
		success: function(response)
		{
			$("#debug").html(response);
		}
	});

}


function handleTimings(jsonObj)
{
	// the next block is the logic that
	// figures out how far you are in
		var dayOfYear = dayOfYearCounter();
		var dayStarted = jsonObj[0].days_in;

		var difference = dayOfYear - parseInt(dayStarted);
		weekCount = Math.floor(difference / 7);	

		$("#startDate").html(jsonObj[0].date);

		$("#weekNumber").html(weekCount + 1);
		$("#daysInToWeek").html(difference);

		if (7 - difference >= 0)
		{
			$("#pictures_illustration .jumbo").html(7 - difference);
		}
		else if (7 - difference < 0)
		{
			$("#pictures_illustration").html("You harshly need to take a picture");
		}

		calendarHandler(jsonObj[0].date);

			// check for picture
		$.ajax({
			type: "POST",
			url:  "http://localhost/workout-diary/php/module_manage_picture.php",
			data: 
			{
				checkPicture: true,
				weekNumber: weekCount + 1
			},
			success: function(pictureDone)
			{
				console.log(pictureDone);

				if (pictureDone == true)
				{
					console.log()
					$(".alert").hide();
				}
				else
				{
					$(".alert").hide().fadeIn(1400);
				}

			}
		});

}

function calendarHandler(veryFirstDate)
{
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	// useful!
	var workOutStartDate = convertStringToComponents(veryFirstDate);
	// lets see this as a true date object
	var workOutStartDateObj = new Date(workOutStartDate.y, workOutStartDate.p, workOutStartDate.d);

	var multiplier = weekCount;

	var calendarStart = findWeeksAfterStart(workOutStartDateObj,multiplier);

	function findWeeksAfterStart(workOutStartDateObj,multiplier)
	{
		// workOutStartDateObj  is your start date, interpretted as a valid Date() object
		// multiplier is number of weeks since that date
		var currentWeekDateObj = new Date();

		currentWeekDateObj.setTime( workOutStartDateObj.getTime() + (7 * multiplier) * 86400000 );
		return currentWeekDateObj;
	}

	console.log(calendarStart);

	for (i = 0; i<=6; i++)
	{
		var remainingWeek = new Date();
		remainingWeek.setTime( calendarStart.getTime() + i * 86400000 );

		$("#calendar:not(:first-child)").each(function(){
			$(this).append("<div class='day_column' id='dayNum"+remainingWeek.getDate()+"'>" + days[remainingWeek.getDay()] + " the " + remainingWeek.getDate() + getOrdinal(remainingWeek.getDate()) + " of " + months[remainingWeek.getMonth()] + "</div>");
			//if (test2.getDate() == time.getDate())
			//{
			//	$("#dayNum"+time.getDate()).append("<div class='calendar_entry'>last day of week</div>");
			//}
		});
	}




	function convertStringToComponents(string)
	{
    	// very clever shit! extract any word thats split by a space
    	var dayNumber = string.split(/\s+/).slice(2,3).join(" ");
			dayNumber = parseInt(dayNumber.substr(0,dayNumber.length-2));
		var month = string.split(/\s+/).slice(4,5).join(" ");
		var year = string.split(/\s+/).slice(5,6).join(" ");
		var monthPosition = parseInt(jQuery.inArray(month,months));

		return {
			m: month,
			d: dayNumber,
			y: year,
			p:monthPosition
		};
	}

}
