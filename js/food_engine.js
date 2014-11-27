$(document).ready(function(){

// OK GET EXISTING
var ls = JSON.parse(localStorage.getItem("food"));

// THIS SECTION IS CONFUSING
// BASICALLY I WANT A UNIQUE COUNT, RATHER THAN STARTING FROM 1 ALL THE TIME
var arr = [];
var count;

// LOOP THROUGH ALL 'itemnumber[n]' properties and push 
// their unique number onto an array stack
for (k in ls)
{
	var full = k;
	var strp = full.substr(10,full.length)
	arr.push(strp);
}
// determine if it should resume
	if (ls)
	{
		count = arr[arr.length - 1];
	}
	else if (!ls)
	{
		count = 0;
	}

// Once the page loads, draw the fooking stuff!
	for (k in ls)
	{
		for (m in ls[k])
		{
			// this is one hell of a confusing loop
			// goes through NESTED OBJECTS (!)
			drawSomething(m,ls[k][m],k);
		}
	}

// register an event handler for the submit buttom
	$(".submitFood").click(function(){
		count++;
		var id = "itemnumber" + count;
		var tag = $(".item_input").val();
		var quantity = $(".calories_input").val();
		var r = new RegExp("^[0-9]*$");

			// test if number of calories is a number
			if (r.test(quantity) == false)
			{
				showWarning("Calories needs to be positive!");
			}
			else if (quantity >= 2000)
			{
				showWarning("There's no way you've eaten that much!");
			}
			else
			{
				//i want to merge all this into an object
				var o = {};
				o[tag] = quantity;
				// draw a nice output div
				localStorageController(id,o,"food");
				drawSomething(tag,quantity,id);
			}
	$(".item_input").val("");
	$(".calories_input").val("");


	});

	$(".delete").click(function(event){
		// the magic of passing ids into the html!
		var uni = event.currentTarget.parentNode.id;
		delete ls[uni];
		$("#"+uni).fadeOut(500, function(){
			$(this).remove()
		});
		localStorage.setItem("food",JSON.stringify(ls));
	});

	$("#submitDB").click(function()
	{
		var finalString = localStorage.getItem("food");
		var currentDate = whatDate();
		var totalcals = calculateCalories(finalString);

		$.ajax({
			type: "POST",
			url: "https://localhost/workout-diary/php/module_push_diet.php",
			data: {
				whole: finalString,
				dateDone: currentDate,
				totalCalories: totalcals
			},
			success: function(response)
			{
				removeForm();
			}
		});
		
		function removeForm()
		{
			$(".consume_panel").each(function(i){
       			$(this).delay((i + 1) * 300).fadeOut();
			});
			localStorage.removeItem("food");
			$("#submitDB").fadeOut(400, function(){
				$(this).remove();
			});

			setTimeout(function(){
				$(".consume_panel").remove();
			},2000);
		}

	});
});

function drawSomething(tag,quantity,uniqueLabel)
{

	$("#food_here").append("<div class='consume_panel' id='"+uniqueLabel+"'>\
		<span>Item</span><div class='nest'>"+tag+"</div>\
		<span>Calories</span><div class='nest'>"+quantity+"</div>\
		<div class='delete'>x</div>\
		</div>");
}



// just takes a json string, loops through it, adds to an array and calculates the total value.
function calculateCalories(json)
{
	var parsedObject = JSON.parse(json);
	var array = [];
	var total = 0;

	for (properties in parsedObject)
	{
		for (subProperties in parsedObject[properties])
		{
			array.push(parseInt(parsedObject[properties][subProperties]));
		}
	}

	$.each(array,function(){
		total += this;
	});

	return total;
}

// use this for debugging.
//localStorage.removeItem("food");
