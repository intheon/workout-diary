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
		url:  globalURL + "php/module_pull_athlete.php",
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
		url:  globalURL + "php/module_pull_exercises.php",
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
		url:  globalURL + "php/module_pull_diet.php",
		data: "dateFilter=" + cDate,
		success: function(diet)
		{
			parseDiet(diet);

			//console.log(diet);
		}
	});

	// timing management
	$.ajax({
		type: "POST",
		url:  globalURL + "php/module_manage_timings.php",
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

	// Get and write current date.
	$("#currentDate").html(cDate); 

	// show a warning, just, because
	$("#initialise_weeks").click(function(){
		//resets all the timings. hence warning
		showWarning("Are you sure?? <br />\
		<a href='#' onclick='startWeeksCount()'>YES</a>");
	});

	$("#pictureSubmitButton").click(function(){
		submitPictureToDatabase();
	});

});

function writeAthlete(resp)
{
	var user = resp;
	// this calculates how many calories you've burned today
	// does it by hour, then plops on

	var dateObj = new Date();
	var dateHours =	dateObj.getHours();
	$("#calories_out").html(Math.round((user[0].calories / 24)) * dateHours);
}

function writeExercises(exerciseString)
{

	// the entire json string from the db decoded
	var eString = JSON.parse(exerciseString);

	if (exerciseString.length <= 2)
	{
		$("#exercise_output").hide();
	}
	else
	{
		if (eString[0].gym_visited == 1)
		{
			checkForCurrentDate(true)
		}

	}

}

function parseDiet(dietString)
{

	// first thing I want to do is tally up the total 
	// number of calories done today and spit it back client side.

	if (dietString.length <= 2)
	{
		$("#food_output").hide();
	}
	else
	{
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

					$("#food_output p").append("<span class='database_output_panel'>\
							<span class='item_number'>"+itemQ+"</span>\
							<span class='item_description'>"+values+"</span>\
							<span class='item_sub_description'>("+p[k][values]+" Calories)</span>\
						</span>\
					");
				}
			}
		}
	}

}

function startWeeksCount()
{
	$.ajax({
		type: "POST",
		url:  globalURL + "php/module_manage_timings.php",
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
		url: globalURL + "php/module_manage_picture.php",
		type: "POST",
		contentType: false,
		cache: false,
		processData: false,
		data: formData,
		success: function(outcome)
		{
			console.log(outcome);

			if (parseInt(outcome) === 1)
			{
				$(".picture_upload_panel").fadeOut(function(){
					$("#pictures_illustration .jumbo").html("<span class='picTaken'>&#10004;</span>");
					$("#pictures_illustration .remainder").html("Picture taken this week");
					$(this).hide()
				});
			}
			else if (parseInt(outcome) === 0)
			{
				$("#debug").html("error, please try again");
			}
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

		calendarHandler(jsonObj[0].date);

			// check for picture
		$.ajax({
			type: "POST",
			url:  globalURL + "php/module_manage_picture.php",
			data: 
			{
				checkPicture: true,
				weekNumber: weekCount + 1
			},
			success: function(pictureDone)
			{
				if (pictureDone == true)
				{
					$(".picture_upload_panel").hide();
					$("#pictures_illustration .jumbo").html("<span class='picTaken'>&#10004;</span>");
					$("#pictures_illustration .remainder").html("Picture taken this week");
				}
				else
				{
					$(".picture_upload_panel").hide().fadeIn(1400);
					$("#pictures_illustration .jumbo").html("<span class='picNotTaken'>&#10006;</span>");
					$("#pictures_illustration .remainder").html("Picture not taken this week");
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
		// workOutStartDateObj is your start date, interpretted as a valid Date() object
		// multiplier is number of weeks since that date
		var currentWeekDateObj = new Date();

		currentWeekDateObj.setTime( workOutStartDateObj.getTime() + (7 * multiplier) * 86400000 );
		return currentWeekDateObj;
	}

	// loop through 7 days and plonk them in the calendar
	for (i = 0; i<=6; i++)
	{
		var remainingWeek = new Date();
		remainingWeek.setTime( calendarStart.getTime() + i * 86400000 );

		$("#calendar:not(:first-child)").each(function(){
			$(this).append("<div class='day_column' id='dayNum"+remainingWeek.getDate()+"'>" + days[remainingWeek.getDay()] + " the " + remainingWeek.getDate() + getOrdinal(remainingWeek.getDate() - 1) + " of " + months[remainingWeek.getMonth()] + "</div>");
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
			p: monthPosition
		};
	}

	checkForCurrentDate(false);
}


var fcount = 0;
function checkForCurrentDate(gymBool)
{

	var matchId;
	var current = cDate.substr(0,cDate.length-5);

	// matches the current day to the relevant calendar div
	$("#calendar .day_column").each(function()
	{
		var innards = $(this).context.innerHTML;
			if (current == innards)
			{
				fcount++;
				return matchId = $(this)[0].id;
			}
	});

	if (gymBool)
	{
		$("#"+matchId).append("<span class='dynamic_calendar_item'>GYM VISITED</span>");
	}
	if (!gymBool)
	{
		$("#"+matchId).append("<span class='dynamic_calendar_item'>YOU ARE HERE</span>");
	}

}