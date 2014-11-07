var count = 0;

$(document).ready(function(){
	drawForm();
	getFromLS();
});

function grabValues()
{
	var formData = $(".food_form").serialize();
	drawForm();
	doLocal(formData);
}

// THIS IS SLIGHTLY DIFFERENT TO THE CARDIO ONE 
// BECAUSE THERES ONLY EVER ONE FORM
function drawForm()
{
	$("#form_here").html("\
	<form name='foodform' class='food_form'>\
		<p>Item:\
			<input type='text' name='item_" + count + "' / >\
		</p>\
		<p>Calories:\
			<input type='text' name='calories_" + count + "' / >\
		</p>\
			<input type='button' name='submitFood' class='submitFood' value='Submit'/>\
	</form>\
	");

	console.log("id:" +count)

	$(".submitFood").click(function(){
		count++;
		grabValues();
	});
}

function doLocal(newStuff)
{	
	var arr = newStuff.split("&");

	for (i = 0; i < arr.length; i++)
	{
		var arrProp = arr[i].split("=");
		localStorageController(arrProp[0],arrProp[1],"food");
	}

	getFromLS();
}

var str = [];

function getFromLS()
{
	var counter = 10000;
  for (var key in localStorage)
  {
    if (key == "food")
    {
      var all = localStorage.getItem(key);
      var par = JSON.parse(all);



      for (props in par)
      {
      	      $("#food_here").html("");
      	counter--;
      	console.log(props.length);
      	console.log(counter);
      	str.push(props + " " + par[props]);
      $("#food_here").html("<p>\
		" + str + "\
			</p>\
		");

      }
    }
  }


}

