var entireString;
var attr = [];
var count = 0;
var previouslyClicked = [];

$(document).ready(function()
{
	gatherExercises("types_cardio");
	gatherExercises("types_weights");

	gymVisited();

});


function gatherExercises(type)
{
	$.ajax(
	{
		type: "POST",
		url: globalURL + "php/module_pull_exercise_types.php",
		data: {
			type: type
		},
		success: function(response)
		{
			// on success you get this huge json string or an empty response
			// just pass it to a parsing function
			attr.push(response);
			drawHTML(response);

		}
	});
}

function drawHTML(raw)
{
	// turn it into json object i can play with
	entireString = JSON.parse(raw);

	// very first element is the exercise type
	var type = entireString[0];
		type = type.substr(6,type.length);
		type = type + "_panel";

	// dont need the first element anymore
	entireString.shift();

	// loop through
		for (properties in entireString)
		{
			// spit out each name
			var exNames = entireString[properties].exercise_name;
			var exCals = entireString[properties].calorie_consumption_per_minute;
			$("." + type).append("<div class='tab_item' data-exercise-name="+exNames+" data-calories="+exCals+">" + exNames + "</div>");
		}

		makeEventListeners(type);
}

// registers an onclick handler to buttons
function makeEventListeners(type)
{

	var reference = type;
	// just loop through and give them an id based on their name
	$("." + reference + " .tab_item").each(function()
	{

		// TODO :
		// - have spaces in id name

		var name = $(this).context.innerHTML;

		$(this).attr("id", name);

		$(this).click(function(event)
		{
			var frame = event.currentTarget.parentElement.className;
				frame = frame.substr(0,frame.length - 6);
			showForm(name,frame);
		}); // register click handlers

		}); // close each loop
}

var frames = [];

function showForm(formName,frame)
{
	$("#"+formName).css({'text-decoration':"line-through",'color':"#8F8A8A",});
	// this is to prevent the same form from being shown twice
	if ($.inArray(frame,frames) === -1)
	{	
		$("."+frame+"_forms").hide().fadeIn();
		$("."+frame+"_submit_all").hide().fadeIn(2000);
		frames.push(frame);
		previouslyClicked.push(formName);
		manageSubmitAll(frame)
		drawSubForm(formName,frame);
	}
	else
	{
		if ($.inArray(formName,previouslyClicked) === -1)
		{
			previouslyClicked.push(formName);
			drawSubForm(formName,frame);
		}
		else
		{
			return false;
		}
	}
}
var testArr = [];

function drawSubForm(formName,frame)
{
	var name = formName.toLowerCase();

	for (index in attr)
	{
		var jsonString = attr[index];

			jsonString = JSON.parse(jsonString);

			jsonString.shift()

			for (index in jsonString)
			{
				if (formName == jsonString[index].exercise_name)
				{
					var calories = jsonString[index].calorie_consumption_per_minute;
				}
			}
	}
	drawSubForms(frame,name,name,calories);

}

function drawSubForms(frame,name,e,c)
{
	var cals = "test";

	$("."+frame+"_forms").append("\
		<form id='" + name + "_form'>\
		<p>How much " + name + " did you do?</p>\
		<input type='text' placeholder='Quantity (minutes done)' id='" + name + "_input' data-name='"+e+"' data-cals='"+c+"';>\
		</form>");

	$("#" + name + "_form").hide().fadeIn(600);
}

var exercises = [];

function manageSubmitAll(frame)
{
	$("."+frame+"_submit_all form input").click(function()
	{
		$("."+frame+"_forms form input[type='text']").each(function(i)
		{
			var targetValue = $(this).val();
			var targetFullName = $(this).context.id;
			var targetName = targetFullName.substr(0,targetFullName.length-6);
			var calories = $(this).data("cals");

			var r = new RegExp("^[0-9]*$");

			if (r.test(targetValue) == false)
			{
				showWarning("Enter a number");
				return false;
			}
			else if (targetValue >= 1000)
			{
				showWarning("too big");
				return false;
			}
			else
			{
				exercises.push({name: targetName, value: targetValue, calories: calories,});

				$("."+frame+"_forms form").each(function(i)
				{
					$(this).delay((i + 1) * 300).fadeOut(function()
					{
						$(this).hide();
						$("."+frame+"_submit_all form").fadeOut(function()
						{
							$(this).hide();
						});
					});
				});
			}
		});

		submitToDB(JSON.stringify(exercises));
	});
}

function submitToDB(json)
{

	var parsedObject = JSON.parse(json);

	var array = [];
	var total = 0;

	for (properties in parsedObject)
	{
		array.push(parseInt(parsedObject[properties].value * parsedObject[properties].calories));
	}

	$.each(array,function(){
		total += this;
	});

	// build an object
	var formData = {
		date_done: whatDate(),
		json: json,
		calories_total: total,
	};

	// send to php

	$.ajax(
	{
		type: "POST",
		url: globalURL + "php/module_push_exercises.php",
		data: formData,
		success: function(response)
		{
			console.log(response);
		}
	});

}


function gymVisited()
{
	$.ajax(
	{
		type: "POST",
		url: globalURL + "php/module_manage_exercises.php",
		data: {
			date: whatDate(),
			checkForVisit: true
		},
		success: function(response)
		{
			if (response == "nothing")
			{
				$(".messages").html("Gym Not Visited");
				$(".toggle input[type='checkbox']").attr("checked",false);
			}
			else if (response == "match")
			{
				$(".messages").html("Gym Visited");
				$(".messages").addClass("switched");
				$(".toggle input[type='checkbox']").attr("checked",true);
				$(".toggle input[type='checkbox']").attr("disabled",true);
			}
		}
	});
}
