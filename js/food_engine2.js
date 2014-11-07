$(document).ready(function(){

// OK GET EXISTING
var ls = JSON.parse(localStorage.getItem("food"));


// THIS SECTION IS CONFUSING
// BASICALLY I WANT A UNIQUE COUNT, RATHER THAN STARTING FROM 1 ALL THE TIME
var arr = [];
var count;

for (k in ls)
{
	var full = k;
	var strp = full.substr(10,full.length)
	arr.push(strp);
}

if (ls)
{
	count = arr[arr.length - 1];
}
else if (!ls)
{
	count = 0;
}

for (k in ls)
{
	for (m in ls[k])
	{
		// this is one hell of a confusing loop
		// goes through NESTED OBJECTS (!)
		console.log("items:")
		console.log(m);
		console.log("calories:")
		console.log(ls[k][m]);
		drawSomething(m,ls[k][m]);
	}
}

	$(".submitFood").click(function(){
			count++;
		var id = "itemnumber" + count;

		var tag = $(".item_input").val();
		var quantity = $(".calories_input").val();

		//i want to merge all this into an object
		var o = {};

		o[tag] = quantity;

		// draw a nice output div
		localStorageController(id,o,"food");
		drawSomething(tag,quantity);

	});

});

function drawSomething(tag,quantity)
{
	$("#food_here").append("<div class='consume_panel'>\
		<span>Item</span><div class='nest'>"+tag+"</div>\
		<span>Calories</span><div class='nest'>"+quantity+"</div>\
		<div class='delete'>x</div>\
		</div>");
}

