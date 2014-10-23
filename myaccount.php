<!DOCTYPE html>
<html lang="en" xml:lang="en">
<head>
    <link href="css/global_framework.css" rel="stylesheet" type="text/css">
    <link href="css/myaccount_page.css" rel="stylesheet" type="text/css">
</head>

<body>
<!-- TOP TOOLBAR -->
<div id="toolbar">
    <div id="greeting">WorkoutDiary v.01</div>
    <div id="settings">
        <ul>
            <li><img src="img/settings.png" width="50%"></li>
            <ul>
                <li><img src="img/settings.png" width="18%">
                    <a href="myaccount.php">My Account</a>
                </li>
                <li><img src="img/settings.png" width="18%">
                    <a href="login.php">Sign Out</a>
                </li>
            </ul>
        </ul>
    </div>
</div>

<!-- SIDE PANEL -->

<div id="menu_panel">
    <div><a href="index.php">Dashboard</a></div>
    <div>Food and Drink</div>
    <div><a href="cardio.php">Cardio</a></div>
    <div>Weights</div>
    <div>Statistics</div>
</div>

<!-- MAIN CONTENT PANEL -->

<div id="interaction_panel">
    <div class="information_panel">
        <h1>My Account <span class="click_options"><a href="#" onclick="editUser()">Edit</a> | <a href="#" onclick="newUser()">New</a></span></h1>
        <div class="panel_content">
	        <p>View your account here, and manage your information.</p>

	        <!--
			    <div class="column_item">
			    	<div class="column_title">Logged in as</div>
			    	<div class="column_content">Ben</div>
			    </div>
			    <div class="column_item">
			    	<div class="column_title">Current Weight</div>
			    	<div class="column_content">78kgs</div>
			   	</div>
			    <div class="column_item">
			    	<div class="column_title">Height</div>
			    	<div class="column_content">5 ft 8</div>
			   	</div>
			    <div class="column_item">
			    	<div class="column_title">Gender</div>
			    	<div class="column_content">Male</div>
			    </div>
			    <div class="column_item">
			    	<div class="column_title">Body Mass Index</div>
			    	<div class="column_content">22.96</div>
			   	</div>
			    <div class="column_item">
			    	<div class="column_title">BMR</div>
			    	<div class="column_content">2108</div>
			   	</div>
			    <div class="column_item">
			    	<div class="column_title">Calories per day</div>
			    	<div class="column_content">2508</div>
			   	</div>
			   	<div class="column_item">
			    	<div class="column_title">Body Fat</div>
			    	<div class="column_content">22%</div>
			   	</div>
			   	-->
		</div>
		<div class="moar"></div>
    </div>

</div>


<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
<script src="js/my_account_engine.js"></script>

</body>
</html>