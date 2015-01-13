var entireString;
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
    	$("." + type).append("<div class='tab_item'>" + exNames + "</div>");
  	}

  	makeEventListeners(type);
}

function makeEventListeners2(type)
{
	var storedVariable = type;

	console.log("master:" , storedVariable);

	return function(index, element)
	{
		console.log(storedVariable);
	}

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

function showForm(formName,frame)
{
	// this is to prevent the same form from being shown twice

	if ($.inArray(formName,previouslyClicked) > -1)
	{
		return false;
	}
	else
	{
		previouslyClicked.push(formName);

		count++;

		// shows the form for a first time
		if (count < 2)
		{
			$("."+frame+"_forms").hide().fadeIn();
			$("."+frame+"_submit_all").hide().fadeIn(2000);
			manageSubmitAll();
		}

		var name = formName.toLowerCase();

		$("."+frame+"_forms").append("\
			<form id='" + name + "_form'>\
			<p>How much " + name + " did you do?</p>\
			<input type='text' placeholder='Quantity' id='" + name + "_input'>\
			<input type='button' value='Submit' id='" + name + "_submit'>\
			</form>");

		$("#" + name + "_form").hide().fadeIn(600);

		$("#" + name + "_submit").click(function()
		{
			var quantity = $("#" + name + "_input").val();
			parseResults(quantity, name);
		});
	}
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

function parseResults(quantity, name)
{
  // regex for just numbers
  var r = new RegExp("^[0-9]*$");

  // test if number of calories is a number
  if (r.test(quantity) == false)
  {
    showWarning("Enter a number");
  }
  else if (quantity >= 1000)
  {
    showWarning("There's no way you've done that much");
  }
  else
  {
    submitToDB(quantity, name);
  }
}

function submitToDB(quantity, name)
{
  console.log("this has been called with", quantity, " and ", name);
  // change the first letter to uppercase
  gName = name.substr(0, 1).toUpperCase() + name.substr(1, name.length - 1);

  // match the name with the matching object
  for (keys in entireString)
  {
    if (gName == entireString[keys].exercise_name)
    {
      // calculate its totals
      var consumed = quantity * entireString[keys].calorie_consumption_per_minute
    }
  }

  // build an object
  var formData = {
    ex_name: gName,
    quantity: quantity,
    calories_total: consumed,
    date_done: whatDate()
  }

  console.log(formData);

  // send to php
  $.ajax(
  {
    type: "POST",
    url: globalURL + "php/module_push_cardio.php",
    data: formData,
    success: function(response)
    {
      $("#"+name+"_form").fadeOut(500, function()
      {
        $(this).remove();
      });
    }
  });
}

function manageSubmitAll()
{
  $(".cardio_submit_all form input").one("click", function()
  {

    $(".cardio_forms form input[type='text']").each(function()
    {
      var quantity = $(this).val();
      var name = $(this).attr("id").substr(0, $(this).attr("id").length - 6);
      parseResults(quantity, name)
    });

  })
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
