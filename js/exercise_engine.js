var entireString;
var attr = [];
var count = 0;
var previouslyClicked = [];

$(document).ready(function()
{
	gatherExercises("types_cardio");
	gatherExercises("types_weights");

	//gymVisited();

 //bindButton("#addCardio");

	//bindButton("#editCardio");

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
		console.log(formName,frame);
		//drawSubForm(formName,frame);
	}
	else
	{
		if ($.inArray(formName,previouslyClicked) === -1)
		{
			previouslyClicked.push(formName);
					console.log(formName,frame,entireString);
			//drawSubForm(formName,frame);
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
	var e, c;

	//console.log(formName);

	for (index in attr)
	{
		var jsonFrameName = attr[index];
			jsonFrameName = JSON.parse(jsonFrameName);

			for (b = 1; b < jsonFrameName.length; b++)
			{
				e = jsonFrameName[b].exercise_name;
				c = jsonFrameName[b].calorie_consumption_per_minute;
				test5(frame,formName,e,c)
			}

		var comp = "types_" + frame;


	}
	//console.log(testArr);




}

function test5()
{
	var cals = "test";

	$("."+frame+"_forms").append("\
		<form id='" + name + "_form'>\
		<p>How much " + name + " did you do?</p>\
		<input type='text' placeholder='Quantity (minutes done)' id='" + name + "_input' data-name='"+e+"' data-cals='"+c+"' ';>\
		</form>");

	$("#" + name + "_form").hide().fadeIn(600);
}

var exercises = [];

function manageSubmitAll(frame)
{
	$("."+frame+"_submit_all form input").one("click", function()
	{
		$("."+frame+"_forms form input[type='text']").each(function(i)
		{
			var targetValue = $(this).val();
			var targetFullName = $(this).context.id;
			var targetName = targetFullName.substr(0,targetFullName.length-6);

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
				exercises.push({name: targetName, value: targetValue});
			}
		});

		submitToDB(JSON.stringify(exercises));

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
	});
}

function submitToDB(json)
{
	var parsedObject = JSON.parse(json);
		var array = [];
		var total = 0;

		for (properties in parsedObject)
		{
			array.push(parseInt(parsedObject[properties].value));
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
				console.log("WINNER");

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
			console.log(response);
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


// ADDING A NEW CARDIO EXERCISE

function bindButton(element)
{
	$(element).unbind("click").one("click", function()
	{
		$(".information_panel p").fadeOut(500, function()
		{

			// IF ADDING
			if (element == "#addCardio")
			{
				$(".information_panel").append("\
						<form class='addCardio'>\
						<input type='text' name='newCardioName' id='newCardioName' placeholder='Name'/>\
						<input type='text' name='newCardioCalorieConsumption' id='newCardioCalorieConsumption' placeholder='Calorie consumption per minute'/>\
						<input type='button' value='Add new exercise' class='submitCalories'/>\
						</form>");
				// this fades it in nicely
				$(".addCardio").hide().fadeIn();
				// change the text to tell the user to resume
				// bind event listener to find new values
				$(".submitCalories").click(function()
				{
					//var cName = $("#newCardioName").val();
					//var cCalories = $("#newCardioCalorieConsumption").val();
					var formData = $(".addCardio").serialize();
					// fire it to php
					// TODO ADD VALIDATION SO CALORIES CAN ONLY BE AN INTEGER
					$.ajax(
					{
						type: "POST",
						url: globalURL + "php/module_manage_exercise_types.php",
						data: formData,
						success: function(response)
						{
							// redraw the exercises
							$(".cardio_panel").append("<div class='tab_item'>" + response + "</div>");
							makeEventListeners();
						}
					});
				});
				$("#addCardio").html("Resume");
				// using "callbacks" to reset the .one() functionality
				$("#addCardio").on("click", function()
				{
					bindButton("#addCardio");
					$(".addCardio").fadeOut(500, function()
					{
						$(".addCardio").remove();
						$("#addCardio").html("Add");
						$("#addCardio").hide().fadeIn();
					});
				});
			}

			//IF EDITING
			else if (element == "#editCardio")
			{
				$("#cardio_completed_panel p").fadeOut(100);

				for (keys in entireString)
				{
					$("#cardio_completed_panel").append("\
						<form class='editCardio' id='editCardio" + entireString[keys].exercise_name + "_form'>\
						<input type='text' name='existingCardioName' class='existingCardioName' value='" + entireString[keys].exercise_name + "'/>\
						<input type='text' name='newCardioCalorieConsumption' class='existingCardioCalorieConsumption' value='" + entireString[keys].calorie_consumption_per_minute + "'/>\
						<input type='hidden' name='int' class='existingId' value='" + entireString[keys].id + "'/>\
						<input type='button' value='Modify Exercise' class='submitCalories' id='submitCardioForm" + entireString[keys].exercise_name + "'/>\
						</form>");

					$(".editCardio").each(function(i)
					{
						$(this).delay((i + 1) * 100).hide().fadeIn();
					});

					$("#submitCardioForm" + entireString[keys].exercise_name).click(function(event)
					{
						// traverse that dom motherfucker!
						var currentName = $(this)[0].parentNode[0].value;
						var currentQuant = $(this)[0].parentNode[1].value;
						var exist = $(this)[0].parentNode[2].value;

						$.ajax(
						{
							type: "POST",
							url: globalURL + "php/module_manage_exercise_types.php",
							data:
							{
								existingId: exist,
								modName: currentName,
								modQuant: currentQuant
							},
							success: function(response)
							{
								var targ = event.currentTarget.form.id;

								$("#"+targ).fadeOut(500, function()
								{
									 $("#"+targ).remove();
								});

								gatherExercises(true)

							}
						});
					})
				}

				$("#editCardio").html("Close");

				$("#editCardio").on("click", function()
				{
					bindButton("#editCardio");
					$(".editCardio").each(function()
					{
						$(this).remove();
						$("#editCardio").html("Edit");
					});
				});
			}



		});
	});
}

$(".toggle input[type='checkbox']").click(function(){
	var isChecked = $(".toggle input[type='checkbox']").is(":checked");

	if (isChecked)
	{
		$(".messages").html("Gym Visited");
		$(".messages").addClass("switched");
		$(".toggle input[type='checkbox']").attr("disabled",true);

		$.ajax(
			{
				type: "POST",
				url: globalURL + "php/module_manage_exercises.php",
				data: {
					checked: true,
					date: whatDate()
				},
				success: function(response)
				{
					console.log(response);
				}
		});
	}
	else
	{
		$(".messages").html("Gym Not Visited");
		$(".messages").removeClass("switched")
	}

});
