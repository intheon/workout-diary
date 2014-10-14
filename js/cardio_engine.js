$(document).ready(function(){

getFromLS();

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
    $(this).on('click', 'a', function(e){
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
    var name = "Cross Trainer";
    var store = $("#crossTrainerTime").val();
    addToLS(name,store);
});
$("#pushUpTimeConfirm").click(function(){
    var name = "Push Ups";
    var store = $("#pushUpTime").val();
    addToLS(name,store);
})
$("#sitUpTimeConfirm").click(function(){
    var name = "Sit Ups";
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
}
function getFromLS()
{
    if (localStorage == null)
        {
            $('.localstorage_table').html("Local Storage is currently empty");
        }
    for (key in localStorage)
        {
            $('.localstorage_table').append(
                "<span id='divFor"+key+"' class='delete'>"
                    +
                "<div id=outputKey"+key+">" 
                    + 
                key 
                    + 
                "<span class='small'>X</span>"
                    +
                "</div>" 
                    + 
                "<div id=outputValue"+key+">"
                    +
                localStorage.getItem(key) 
                    + 
                "</div>"
                    +
                "</span>"
            );
        }
}


