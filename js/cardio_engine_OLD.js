$(document).ready(function(){
  checkIfCanSubmit();
  getFromLS();
  listenForDelete();

// THIS IS TO HANDLE THE TABS
  $('ul.tabs').each(function(){
    var $active, $content, $links = $(this).find('a');
    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
    $active.addClass('active');
    $content = $($active[0].hash);
    $links.not($active).each(function () {
      $(this.hash).hide();
    });
    $(this).on('click',"a",function(e){
      $active.removeClass('active');
      $content.hide();
      $active = $(this);
      $content = $(this.hash);
      $active.addClass('active');
      $content.show();
      e.preventDefault();
    });
  });

});

// GATHERS INFORMATION FROM HTML FORMS AND GETS 
// DATA INTO KEY/VALUE PAIRS NEEDED
$("#tab_content div form input").click(function(event){
  var type = "cardiovascular";
  var clickedId = event.currentTarget.id;
  var formId = clickedId.substr(0,clickedId.length - 7);
  var selected = $("#" + formId).val();
      localStorageController(formId,selected,type);
      drawShit(formId,selected); 
});


function getFromLS()
{
  for (var key in localStorage)
  {
    if (key == "cardiovascular")
    {
      var all = localStorage.getItem(key);
      var par = JSON.parse(all);
      for (props in par)
      {
        drawShit(props,par[props]);
      }
    }
  }
}

function drawShit(name,store)
{
  $(".localstorage_table").append("\
      <div class='item_content'>"+
          "<img src='http://localhost/workout-diary/img/delete.png' width='10%' class='cancel'>"+
          "<p>Excercise: <span class='key'>"+ name +"</span></p>"+
          "<p>Quantity: "+ store + "</p>"+
      "</div>");

    listenForDelete();  


}




function listenForDelete()
{

    $(".cancel").click(function(event){
        event.currentTarget.parentNode.remove();
        var toRemove = event.currentTarget.parentElement.children[1].children[0].innerHTML

        var stored = localStorage.getItem("cardiovascular");
        var p = JSON.parse(stored);

        delete p[toRemove];

        var updated = JSON.stringify(p);
        localStorage.setItem("cardiovascular",updated);
        checkIfCanSubmit();
    });
}

function checkIfCanSubmit()
{

  if (localStorage.getItem("cardiovascular"))
  {
    var check = localStorage.getItem("cardiovascular");
    check = JSON.parse(check);
    var s = Object.keys(check).length;
  }


  if (s !== 0)
  {
    $(".submission_panel").html("<input type='button' value='Submit to database' id='submitCardioButton' />");
    bindAndAttach();
  }
    else if (s === 0)
  {
    $(".submission_panel").hide();
  }

}

function bindAndAttach()
{

  $("#submitCardioButton").click(function(){
    var json = JSON.stringify(localStorage.getItem("cardiovascular"));
      sendToDB(json);
  });

}

function sendToDB(json)
{
  $.ajax({
    type: "POST",
    url: "http://localhost/workout-diary/php/module_push_cardio.php",
    data: "payload="+json,
    success: function(result)
    {
      console.log(result);
    }
  });
}








