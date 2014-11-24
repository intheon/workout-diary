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
    <form id="registerCredentials">
        <input type="text" placeholder="Username" name="usernameField"/> <br/> 
        <input type="password" placeholder="Password" name="regPasswordField"/> <br/> 
        <input type="password" placeholder="Repeat Password" name="regPasswordRepeatField"/> <br/> 
        <input type="text" placeholder="Email" name="emailField"/> <br/> 
        <input type="button" id="submitButton" value="Sign in >>" onclick="grabValues('new')"/>
    </form>
</div>

<div class="alerts"></div>



<script src="js/jquery.js"></script>
<script src="js/login_engine.js"></script>
</body>
</html>