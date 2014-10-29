$(document).ready(function(){

for (var key in localStorage)
{
    if (key == "food")
    {
      var all = localStorage.getItem(key);
      var par = JSON.parse(all);
		for (props in par)
		{
			$("#food_here").append("<p>Item: "+props+" Calories: "+par[props]+"</p>");
		}
    }
}


$(".submitFood").click(function(){
	var item = $("#item").val();
	var calories = $("#calories").val();
	localStorageController(item,calories,"food");
	$("#food_here").append("<p>Item: "+item+" Calories: "+calories+"</p>");
});





















































});

