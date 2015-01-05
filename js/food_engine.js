var ls,arr,count;

$(document).ready(function(){
	// THIS IS THE STUFF THAT IS FIRED WHEN THE PAGE IS LOADED 

	// START WITH EVERYTHING SAVED IN THE 'food' OBJECT IN LOCALSTORAGE
	ls 		= JSON.parse(localStorage.getItem("food"));
	arr 	= [];
	count = 0;

	localStorageStateCheck();
	assignDelete();
	assignLocalStorageSubmitListener();
	assignSubmitToPhpListener();
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

function assignDelete()
{

	$(".delete").click(function(event){

		var uni = event.currentTarget.parentNode.id;

		console.log(uni);

		delete ls[uni];

		$("#"+uni).fadeOut(500, function(){
			$(this).remove()
		});

		localStorage.setItem("food",JSON.stringify(ls));

	});

}

// checks whether the ls localstorage object is empty or not
function lsBOOL()
{
	ls = JSON.parse(localStorage.getItem("food"));

	if ($.isEmptyObject(ls))
	{
		return false;
	}
	else
	{
		return true;
	}
}

function localStorageStateCheck()
{
	// FUNCTION RETURNS BOOL IF EMPTY OR NOT
	// IF FALSE, OBJECT IS EMPTY AND NO ITEMS HAVE BEEN ENTERED PREVIOUSLY
	if (!lsBOOL())
	{
		$(".localstorage_panel").hide();
	}
	// IF OBJECT IS FULL (TRUE)
	else
	{
		// STRIPS IDENTIFIER DOWN TO INTEGER + PUSHES IT TO ARRAY
		for (key in ls)
		{
			var integer = key.substr(10,key.length);
			arr.push(integer);
		}

		// KEEPS THE COUNTER GOING IF OBJECT IS ALREADY POPULATED
		if (lsBOOL())
		{
			count = arr[arr.length - 1];
		}
		else
		{
			count = 0;
		}

		console.log(count);

		for (keys in ls)
		{
			for (secondKey in ls[keys])
			{
			// CONFUSING NESTED OBJECTS (!)
			drawSomething(secondKey,ls[keys][secondKey],keys);
			}
		}
	}	
}

function assignLocalStorageSubmitListener()
{
	// ADDS NEW FORM DATA TO LOCALSTORAGE
	$(".submitFood").click(function(){

		var tag 		= $(".item_input").val();
		var quantity 	= $(".calories_input").val();

		// A BIT OF VALIDATION
		if (!tag || !quantity)
		{
			showWarning("These fields must be filled out!");
		}
		else
		{
			// REGEX TO TEST FOR A NUMBER
			var r = new RegExp("^[0-9]*$");

			// NAN
			if (r.test(quantity) == false)
			{
				showWarning("Calories needs to be a positive number!");
			}
			// TOO BIG
			else if (quantity >= 2000)
			{
				showWarning("There's no way you've eaten that much!");
			}
			// OK
			else
			{
				count++;
				var id 	= "itemnumber" + count;
				var o 	= {};
				o[tag] 	= quantity;

				// off to localstorage it goes
				localStorageController(id,o,"food");
				if (lsBOOL())
				{
					$(".localstorage_panel").show();
				}
				drawSomething(tag,quantity,id);
			}

			$(".item_input").val("");
			$(".calories_input").val("");

			assignDelete();
		}

	});
}

function assignSubmitToPhpListener()
{
	$("#submitDB").click(function()
	{

		var finalString 		= localStorage.getItem("food");
		var currentDate 		= whatDate();
		var totalcals 			= calculateCalories(finalString);

		$.ajax({
			type				: "POST",
			url                 : globalURL + "php/module_push_diet.php",
			data 				: 
			{
				whole			: finalString,
				dateDone		: currentDate,
				totalCalories	: totalcals
			},
			success				: function(response)
			{
				removeForm();
			}
		});
		
		function removeForm()
		{
			$(".consume_panel").each(function(i)
			{
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
}

// use this for debugging.
//localStorage.removeItem("food");
