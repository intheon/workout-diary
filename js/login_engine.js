$(document).ready(function(){
	showElement("#logInPrompt");
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
				url: "https://localhost/workout-diary/php/module_check_credentials.php",
				data: {
					type: 'existing',
					username: username,
					password: password
				},
				success: function(response)
				{
					console.log(response);
					if (response == "exists")
					{
						$(".alerts").html("<div class='alertMsg'>This username already exists X </div>");
						$(".alertMsg").click(function(){
							$(this).fadeOut(500,function(){
								$(this).hide();
							})
						});
					}
					else if (response == "does_not")
					{
						$(".alerts").html("<div class='alertMsg'>This username doesn't exist, please register X </div>");
						$(".alertMsg").click(function(){
							$(this).fadeOut(500,function(){
								$(this).hide();
							})
						});
					}
					else if (response == "success")
					{
						window.location = "http://google.com";
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
			$(".alerts").html("<div class='alertMsg'>These dont match! X</div>");
			$(".alertMsg").click(function(){
				$(this).fadeOut(500,function(){
					$(this).hide();
				})
			});
		}

		else if (formData[1].value == formData[2].value)
		{

			var username = formData[0].value;
			var password = formData[1].value;
			var email = formData[2].value;
			
			$.ajax({
				type: "POST",
				url: "https://localhost/workout-diary/php/module_check_credentials.php",
				data: {
					type: 'register',
					username: username,
					password: password,
					email: email
				},
				success: function(response)
				{
					console.log(response);
					if (response == "exists")
					{
						$(".alerts").html("<div class='alertMsg'>This username already exists X </div>");
						$(".alertMsg").click(function(){
							$(this).fadeOut(500,function(){
								$(this).hide();
							})
						});
					}

				}
			});

		}

	}
		// broke	
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