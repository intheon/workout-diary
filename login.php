<!DOCTYPE html>
<html lang="en" xml:lang="en">
<head>
    <meta charset="UTF-8">
    <link href="css/global_framework.css" rel="stylesheet" type="text/css">
    <link href="css/login_page.css" rel="stylesheet" type="text/css">

</head>

<body>

<div id="logInPrompt" class="roundPane" style="display:none">
    <h1>Hi there, you aren't logged in.</h1>
    <form id="loginCredentials">
        <input type="text" placeholder="Username" name="usernameField"/>
        <input type="password" placeholder="Password" name="passwordField"/> 
        <input type="button" id="submitButton" value="Sign in >>" onclick="grabValues('existing')"/>
        <input type="button" id="registerButton" value="Register" onclick="showForm()"/>
    </form>
</div>


<div id="registerPrompt" class="roundPane" style="display:none">
    <h1>Register</h1>
    <h2>Enter your details</h2>
    <p>Authentication. Enter carefully as you will be asked to remember these.</p>
    <form id="registerCredentials" autocomplete="off">
    <div class="chunk">
        <input type="text" placeholder="Username" name="usernameField" id="usernameField"/>
        <input type="password" placeholder="Password" name="regPasswordField"/>
        <input type="password" placeholder="Repeat Password" name="regPasswordRepeatField"/>
        <input type="text" placeholder="Email" name="emailField"/>
    </div>
    <p>Physical information about you to tailor your plan.</p>
    <div class="chunk">
        <input type="text" placeholder="Name" name="nameField"/>
        <input type="text" placeholder="Age" name="Age" id="AgeField"/>
        <input type="radio" name="Gender" value="male" id="maleCheck" /><label for="maleCheck">Male</label>
        <input type="radio" name="Gender" value="female" id="femaleCheck" /><label for="femaleCheck">Female</label>
    </div>
    <p>Activity Level (daily)</p>
    <div class="chunk">
        <input type="text" placeholder="Weight (kgs)" name="weightField" id="weightField"/> <br/> 
        <input type="text" placeholder="Height (cms)" name="heightField" id="heightField"/> <br/> 
        <input type="radio" name="Activity" value="little" id="littleCheck"/><label for="littleCheck">Little</label>
        <input type="radio" name="Activity" value="light" id="lightCheck"/><label for="lightCheck">Light</label>
        <input type="radio" name="Activity" value="moderate" id="moderateCheck"/><label for="moderateCheck">Moderate</label>
        <input type="radio" name="Activity" value="heavy" id="heavyCheck"/><label for="heavyCheck">Heavy</label>
    </div>
    <p>Below is worked on based on Harris-Benedict equation.</p>
    <div class="chunk">
        <input type="text" placeholder="Calories to maintain bodyweight" name="baseCalorieField" id="baseCalorieField"/> <br/>
        <input type="button" id="submitButton" value="Register >>" onclick="grabValues('new')"/>
    </div>
    </form>
</div>

<div class="alerts"></div>



<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
<script src="js/login_engine.js"></script>
</body>
</html>