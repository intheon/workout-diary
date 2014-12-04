$(document).ready(function(){
	showElement("#logInPrompt");

	// register a event listeners for weight and height, gender, age, and activity
	// as these need to dynamically update the calorific needs

	var weightInt, heightInt, ageInt, gender, activityLevel;

	$("#weightField").on("change",function(){
		weightInt = $(this).val();
	});

	$("#heightField").on("keyup",function(){
		heightInt = $(this).val();
		check();
	});

	$("#AgeField").on("change",function(){
		ageInt = $(this).val();
	});

	$("input[name='Gender']").on("change",function(){
		gender = $(this).val();
	});

	$("input[name='Activity']").on("change",function(){
		activityLevel = $(this).val();
	});


	function check()
	{
		if (weightInt && heightInt)
		{
			var amount = calculateHBEquation(weightInt,heightInt,ageInt,gender,activityLevel);
			$("#baseCalorieField").attr("value",amount);
		}
	}

	function calculateHBEquation(weightInt,heightInt,ageInt,gender,activityLevel)
	{
		if (gender == "male")
		{
			//formula:
			// 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age in years)

			var BMR = 13.397 * weightInt;
				BMR += 4.799 * heightInt;
				BMR += 88.362;
				BMR -= 5.677 * ageInt;
			
			return applyExcerciseConsideration(BMR,activityLevel);
		}
		else if (gender == "female")
		{
			//formula:
			//447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age in years)

			var BMR = 9.247 * weightInt;
				BMR += 3.098 * heightInt;
				BMR += 447.593;
				BMR -= 4.330 * ageInt;

			return applyExcerciseConsideration(BMR,activityLevel);
		}
		else 
		{
			console.log("shit broke y0");
		}

		// Harris Benedict Equation has a second step, a multiplier
			function applyExcerciseConsideration(BMR,activityLevel)
			{
				switch (activityLevel)
				{
					case "little":
						return BMR * 1.2;
					break;

					case "light":
						return BMR * 1.375;
					break;

					case "moderate":
						return BMR * 1.55;
					break;

					case "heavy":
						return BMR * 1.725;
					break;

					default:
					break;
				}
			}
	}

});

function showElement(element)
{
	$(element).fadeIn(800);
}

function grabValues(flag)
{
		// existing user
	if (flag == "existing")
	{
		var formData = $("#loginCredentials").serializeArray();
		var username = formData[0].value;
		var password = formData[1].value;
			
			$.ajax({
				type: "POST",
				url: "http://localhost/workout-diary/php/module_check_credentials.php",
				data: {
					type: 'existing',
					username: username,
					password: password
				},
				success: function(response)
				{
					console.log(response);

					switch (response)
					{
						case "exists":
							createErrorMSG("This username already exists");
							break;

						case "does_not":
							createErrorMSG("This username doesn't exist, please register");
							break;

						case "password_incorrect":
							createErrorMSG("Incorrect Password");
							break;

						case "success":
							window.location = "index.php";
							break;

						default:
							createErrorMSG("No data received");
							break;
					}
				}
			});
		console.log(formData);
	}
		// new user
	else if (flag == "new")
	{
		var formData = $("#registerCredentials").serializeArray();

		// validation first
		if (formData[1].value != formData[2].value)
		{
			createErrorMSG("These dont match!")
		}

		else if (formData[1].value == formData[2].value)
		{

			var username = formData[0].value;
			var password = formData[1].value;
			var email = formData[3].value;
			var name = formData[4].value;
			var gender = formData[5].value;
			var age = formData[6].value;
			var activity = formData[7].value;
			var weight = formData[8].value;
			var height = formData[9].value;
			var calories = formData[10].value;

			
			$.ajax({
				type: "POST",
				url: "http://localhost/workout-diary/php/module_check_credentials.php",
				data: {
					type: 'register',
					username: username,
					password: password,
					email: email,
					name: name,
					gender: gender,
					age: age,
					activity: activity,
					weight: weight,
					height: height,
					calories: calories
				},
				success: function(response)
				{
					if (response == "exists")
					{
						createErrorMSG("This username already exists!");
					}
					else if (response == "created")
					{
						createErrorMSG("This username already exists!");
					}
					else if (response == "show_login")
					{
						$("#registerPrompt").fadeOut(500,function(){
							$(this).hide();
							$("#logInPrompt").fadeIn(500);
						});
						createErrorMSG("Registration success, please log in!");
					}

				}
			});

			

		}

	}
	else 
	{
		console.log("consult manual");
	}

}


function showForm()
{
	$("#logInPrompt").fadeOut(500,function(){
		$(this).hide();
		$("#registerPrompt").fadeIn(500);
	});

}

function createErrorMSG(txt)
{
	$(".alerts").html("<div class='alertMsg'>" +txt+ " X </div>");
	$(".alertMsg").click(function(){
		$(this).fadeOut(500,function(){
			$(this).hide();
		})
	});
}