$(document).ready(function(){
	showElement("#logInPrompt");
});

function showElement(element)
{
	$(element).fadeIn(800);
}

function grabValues()
{
	var object = $('#getAccessKeys').serialize();
	var arr = object.split("&");;
		for (i = 0; i < arr.length; i++)
		{
			var arrProp = arr[i].split("=");
			localStorage.setItem(arrProp[0],arrProp[1]);
			localStorage.setItem("athleteLoggedIn",true);
		}
	window.location = "index.php"
}




