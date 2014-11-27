$(document).ready(function()
{
  gatherExercises();

});


function gatherExercises(flag)
{
  $.ajax(
  {
    type: "GET",
    url: "https://localhost/workout-diary/php/module_pull_exercise_types.php",
    success: function(response)
    {
      // on success you get this huge json string
      // just pass it to a parsing function
      drawHTML(response,flag);
    }
  });
}

var entireString;

function drawHTML(raw,resetFlag)
{
  if (resetFlag == true)
  {
    $(".cardio_panel").html("");
  }
  // turn it into json object i can play with
  entireString = JSON.parse(raw);

  // loop through
  for (properties in entireString)
  {
    // spit out each name
    var exNames = entireString[properties].exercise_name;
    $(".cardio_panel").append("<div class='tab_item'>" + exNames + "</div>");
  }

  makeEventListeners();
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
            url: "https://localhost/workout-diary/php/module_manage_exercise_types.php",
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
        $(".information_panel p").fadeOut(100);
        for (keys in entireString)
        {
          $(".information_panel").append("\
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
              url: "https://localhost/workout-diary/php/module_manage_exercise_types.php",
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

bindButton("#addCardio");
bindButton("#editCardio");

// this is called and registers and onclick handler to all cardio buttons
function makeEventListeners()
{
  // just loop through and give them an id based on their name
  $(".tab_item").each(function()
  {
    var name = $(this).context.innerHTML;
    $(this).attr("id", name);

    $(this).click(function()
    {
      showForm(name);
    }); // register three click handlers
  }); // close each loop
}

var count = 0;
var previouslyClicked = [];

// draw the form
function showForm(formName)
{

  if ($.inArray(formName,previouslyClicked) > -1)
  {
    console.log("ive found a match");
  }
  else
  {
    previouslyClicked.push(formName);

    count++;
    // cos the form would have never been shown before
    if (count < 2)
    {
      $(".cardio_forms").hide().fadeIn();
      $(".cardio_submit_all").hide().fadeIn(2000);
      manageSubmitAll();
    }

    var name = formName.toLowerCase();

    $(".cardio_forms").append("\
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

  // send to php
  $.ajax(
  {
    type: "POST",
    url: "https://localhost/workout-diary/php/module_push_cardio.php",
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