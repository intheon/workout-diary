$(document).ready(function(){

  gatherExercises();

});

function gatherExercises()
{
  $.ajax({
    type: "GET",
    url: "http://localhost/workout-diary/php/module_pull_exercise_types.php",
    success: function(response)
    {
      // on success you get this huge json string
      // just pass it to a parsing function
        drawHTML(response);
    }
  });
}

function drawHTML(raw)
{
  // turn it into json object i can play with
  var entireString = JSON.parse(raw);

    // loop through
    for (properties in entireString)
    {
      // spit out each name
      var exNames = entireString[properties].exercise_name;
      $(".cardio_panel").append("<div class='tab_item'>"+exNames+"</div>");
    }

}

// allow manipulation and addition straight from the front end.
$("#editCardio").one("click",function(){

});

// ADDING A NEW CARDIO EXERCISE

function bindButton(element)
{
  $(element).unbind("click").one("click",function(){
    $(".information_panel p").fadeOut(500, function(){
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
        $(".submitCalories").click(function(){
          //var cName = $("#newCardioName").val();
          //var cCalories = $("#newCardioCalorieConsumption").val();
          var formData = $(".addCardio").serialize();
          // fire it to php

          // TODO ADD VALIDATION SO CALORIES CAN ONLY BE AN INTEGER

            $.ajax({
              type: "POST",
              url: "http://localhost/workout-diary/php/module_manage_exercise_types.php",
              data: formData,
              success: function(response)
              {
                // redraw the exercises
                $(".cardio_panel").append("<div class='tab_item'>"+response+"</div>");
              }
            });

        });

        $("#addCardio").html("Resume");
        // using "callbacks" to reset the .one() functionality
        $("#addCardio").on("click", function(){
          bindButton("#addCardio");
          $(".addCardio").fadeOut(500, function(){
            $(".addCardio").remove();
            $("#addCardio").html("Add");
            $("#addCardio").hide().fadeIn();
          });
        });
    });
  });
}

bindButton("#addCardio");

