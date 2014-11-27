$(document).ready(function(){

	$.ajax({
		type: "POST",
			url:  "https://localhost/workout-diary/php/module_pull_athlete.php",
			success: function(response)
			{
				var user = JSON.parse(response);
				presentInfo(user);
			}
		});	

});

function presentInfo(jsonString)
{
	for (k in jsonString)
	{
		for (p in jsonString[k])
		{
			// append all your values from your json obj to the dom
			$(".person_info_panel").append("<div class='row' id='"+p+"UserCell'>\
				<div class='title'>"+p+"</div>\
				<div class='cell_value'>"+jsonString[k][p]+"</div>\
				<div class='edit'>editable</div>\
				</div>");

			// this is magic, it fades shit in!
			$(".row").each(function(i)
          	{
            	$(this).delay((i + 1) * 100).hide().fadeIn();
         	 });
		}

	}
}

