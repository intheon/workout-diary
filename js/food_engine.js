$(document).ready(function(){

// OK GET EXISTING
var ls = JSON.parse(localStorage.getItem("food"));

console.log(ls);

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
		//i want to merge all this into an object
		var o = {};
			o[tag] = quantity;
		// draw a nice output div
		localStorageController(id,o,"food");
		drawSomething(tag,quantity,id);
		console.log(ls);
	});

	$(".delete").click(function(event){
		// the magic of passing ids into the html!
		var uni = event.currentTarget.parentNode.id;
		delete ls[uni];
		$("#"+uni).fadeOut(500, function(){
			$(this).remove()
		});
		console.log(ls);
		localStorage.setItem("food",JSON.stringify(ls));
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

//localStorage.removeItem("food");
