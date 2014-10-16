$(document).ready(function(){
checkIfCanSubmit();
getFromLS();
listenForDelete();

  $('ul.tabs').each(function(){
    // For each set of tabs, we want to keep track of
    // which tab is active and it's associated content
    var $active, $content, $links = $(this).find('a');

    // If the location.hash matches one of the links, use that as the active tab.
    // If no match is found, use the first link as the initial active tab.
    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
    $active.addClass('active');

    $content = $($active[0].hash);

    // Hide the remaining content
    $links.not($active).each(function () {
      $(this.hash).hide();
    });

    // Bind the click event handler
    $(this).on('click',"a",function(e){
      // Make the old tab inactive.
      $active.removeClass('active');
      $content.hide();

      // Update the variables with the new link and content
      $active = $(this);
      $content = $(this.hash);

      // Make the tab active.
      $active.addClass('active');
      $content.show();

      // Prevent the anchor's default click action
      e.preventDefault();
    });
  });

});

$("#crossTrainerTimeConfirm").click(function(){
    var name = "Cross_Trainer";
    var store = $("#crossTrainerTime").val();
    addToLS(name,store);
});
$("#pushUpTimeConfirm").click(function(){
    var name = "Push_Ups";
    var store = $("#pushUpTime").val();
    addToLS(name,store);
});
$("#sitUpTimeConfirm").click(function(){
    var name = "Sit_Ups";
    var store = $("#sitUpTime").val();
    addToLS(name,store);
});
$("#treadmillTimeConfirm").click(function(){
    var name = "Treadmill";
    var store = $("#treadmillTime").val();
    addToLS(name,store);
});
$("#rowingTimeConfirm").click(function(){
    var name = "Rowing";
    var store = $("#rowingTime").val();
    addToLS(name,store);
});
$("#stepperTimeConfirm").click(function(){
    var name = "Stepper";
    var store = $("#stepperTime").val();
    addToLS(name,store);
});

function addToLS(name,store)
{
    localStorage.setItem(name,store);
      if (localStorage.length !== 0)
      {
        $(".submission_panel").show();
      }
      else if (localStorage.length === 0)
      {
        $(".submission_panel").hide();
      }
    drawShit(name,store);
    listenForDelete();
}

function drawShit(name,store)
{
  $(".localstorage_table").append("\
      <div class='item_content'>"+
          "<img src='http://localhost/workout-diary/img/delete.png' width='10%' class='cancel'>"+
          "<p>Excercise: <span class='key'>"+ name +"</span></p>"+
          "<p>Quantity: "+ store + "</p>"+
      "</div>");
  checkIfCanSubmit();
}


function getFromLS()
{

  for (key in localStorage)
  {
        drawShit(key,localStorage.getItem(key));
  }

}

function listenForDelete()
{
    $(".cancel").click(function(event){
        event.currentTarget.parentNode.remove();
        var toRemove = event.currentTarget.parentElement.children[1].children[0].innerHTML
        localStorage.removeItem(toRemove);
        checkIfCanSubmit();
    });
}

function checkIfCanSubmit()
{

  if (localStorage.length !== 0)
  {
    $(".submission_panel").html("<input type='button' value='Submit to database' id='submitCardioButton' />");
    bindAndAttach();
  }
    else if (localStorage.length === 0)
  {
    $(".submission_panel").hide();
  }

}

function bindAndAttach()
{
  var postData = {};

  $("#submitCardioButton").click(function(){
  for (key in localStorage)
  {
      postData[key] = localStorage.getItem(key);
  }

  var formedJSON = JSON.stringify(postData);

  sendToDB(formedJSON);

  });

}

function sendToDB(json_feed)
{
  $.ajax({
    type: "POST",
    url: "http://localhost/workout-diary/php/module_push_cardio.php",
    data: "payload="+json_feed,
    success: function(result)
    {
      console.log(result);
    }
  });
}







