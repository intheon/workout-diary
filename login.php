<!DOCTYPE html>
<html lang="en" xml:lang="en">
<head>
    <link href="css/login_page.css" rel="stylesheet" type="text/css">
</head>

<body>

<div id="logInPrompt" class="roundPane" style="display:none">
    <h1>Hi there, you aren't logged in.</h1>
    <h2>Log in here:</h2>
    <form id="loginCredentials">
        <input type="text" placeholder="Username" name="usernameField"/> <br/> 
        <input type="password" placeholder="Password" name="passwordField"/> <br/> 
        <input type="button" id="submitButton" value="Sign in >>" onclick="grabValues('existing')"/>
        <input type="button" id="registerButton" value="Register" onclick="showForm()"/>
    </form>
</div>


<div id="registerPrompt" class="roundPane" style="display:none">
    <h1>Or Register</h1>
    <h2>Enter your details</h2>
    <form id="registerCredentials" autocomplete="off">
        <p>These are your authentication details. Please enter carefully!</p>
        <input type="text" placeholder="Username" name="usernameField"/> <br/> 
        <input type="password" placeholder="Password" name="regPasswordField"/> <br/> 
        <input type="password" placeholder="Repeat Password" name="regPasswordRepeatField"/> <br/> 
        <input type="text" placeholder="Email" name="emailField"/> <br/> 
        <p>Physical information about you to tailor your plan.</p>
        <input type="text" placeholder="Name" name="nameField"/> <br/> 
        <span class="radioHolder">
            <span class="radioItem">
                <input type="radio" name="Gender" value="male"/>Male
            </span>
            <span class="radioItem">
                <input type="radio" name="Gender" value="female"/>Female
            </span>
        </span>
        <input type="text" placeholder="Age" name="Age" id="AgeField"/> <br/>
        <p>Activity Level (daily)</p>
        <span class="radioHolder">
            <span class="radioItem">
                <input type="radio" name="Activity" value="little"/>Little
            </span>
            <span class="radioItem">
                <input type="radio" name="Activity" value="light"/>Light
            </span>
            <span class="radioItem">
                <input type="radio" name="Activity" value="moderate"/>Moderate
            </span>
            <span class="radioItem">
                <input type="radio" name="Activity" value="heavy"/>Heavy
            </span>
        </span>
        <input type="text" placeholder="Weight (kgs)" name="weightField" id="weightField"/> <br/> 
        <input type="text" placeholder="Height (cms)" name="heightField" id="heightField"/> <br/> 
        <p>Below is worked on based on Harris-Benedict equation.</p>
        <input type="text" placeholder="Calorific Need to maintain bodyweight" name="baseCalorieField" id="baseCalorieField"/> <br/>
        <input type="button" id="submitButton" value="Register >>" onclick="grabValues('new')"/>
    </form>
</div>

<div class="alerts"></div>



<script src="js/jquery.js"></script>
<script src="js/login_engine.js"></script>
</body>
</html>