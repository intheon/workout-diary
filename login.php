<!DOCTYPE html>
<html lang="en" xml:lang="en">
<head>
    <link href="css/login_page.css" rel="stylesheet" type="text/css">
</head>

<body>

<div id="logInPrompt" class="roundPane" style="display:none">
    <h1>Hi there, you aren't logged in.</h1>
    <h2>Please enter your credentials</h2>
    <form id="loginCredentials">
        <input type="text" placeholder="Username" name="usernameField"/> <br/> 
        <input type="button" id="submitButton" value="Next >>" onclick="grabValues()"/>
    </form>
</div>


<script src="js/jquery.js"></script>
<script src="js/login_engine.js"></script>
</body>
</html>