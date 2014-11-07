$(document).ready(function(){

count = 0;
count2 = 0;

var raw = localStorage.getItem("food");
var json = JSON.parse(raw);

draw();
attachListener();

$(".submitFood").click(function(){
	count++;
	var item = $("#item").val();
	var calories = $("#calories").val();

	console.log(item);
	console.log(calories);

	localStorageController(item,calories,"food");

	$("#food_here").append("<p class='item_"+count2+"'>Item: "+item+" Calories: "+calories+"&nbsp;<span class='delete'>x</span></p>");

});

function draw()
{
	raw = localStorage.getItem("food");
	json = JSON.parse(raw);
		for (key in json)
		{
			count2++;
			$("#food_here").append("<p class='item_"+count2+"'>Item: <span class='key'>"+key+"</span> Calories: "+json[key]+"&nbsp;<span class='delete'>x</span></p>");
			attachListener();
		}
}

function attachListener()
{
	$(".delete").click(function(event){
	var propToDelete = event.currentTarget.parentElement.firstElementChild.innerHTML;

	for (k in json)
	{
		if (k == propToDelete)
		{
			delete json[k];
			overwriteController(json);
		}
	}
	});
}





//localStorage.removeItem("food");
















































});

