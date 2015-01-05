<?php 
session_start();

if (!isset($_SESSION['username']))
{
    header("Location: login.php");
    die();
}

?>

<!DOCTYPE html>
<html lang="en" xml:lang="en">
<head>
    <meta charset="UTF-8">
    <link href="css/global_framework.css" rel="stylesheet" type="text/css">
    <link href="css/index_page.css" rel="stylesheet" type="text/css">
</head>

<body>
<!-- TOP TOOLBAR -->
<div id="toolbar">
    <div id="greeting">WorkoutDiary v1</div>
    <div id="settings">
        <ul>
            <li><img src="img/settings.png" width="50%"></li>
            <ul>
                <li>
                    <a href="myaccount.php">My Account</a>
                </li>
                <li>
                    <a href="#" id="logMeOut">Sign Out</a>
                </li>
            </ul>
        </ul>
    </div>
</div>

<div class="menu_panel"></div>

<div class="main_content">

    <div id="modules_bar"> <!-- MODULES | CONTAINS STATS -->
        <div id="exercises_illustration">
            <span class="jumbo">???</span><span class="remainder"> more gym visits remaining.</span>
        </div>
        <div id="calories_illustration">
            <span class="jumbo" id="calories_in">???</span><span class="remainder"> calories consumed.</span><br />
            <span class="jumbo" id="calories_out">???</span><span class="remainder"> calories burned.</span><br />
        </div>
        <div id="pictures_illustration">
            <span class="jumbo">???</span><span class="remainder"> days until a picture!</span>
        </div>
    </div>

    <div id="interaction_panel">

        <div class="information_panel"> <!-- FIRST PANEL | WELCOME -->

            <h1>Welcome back, <span id="currentUser"><?php echo $_SESSION["username"]; ?></span></h1>
            <p>How the hell are you today? Get entering some information!</p>

            <div id="timeline_panel">
                <p>Week planner</p>
				<div id="calendar"></div>
            </div> 

        </div> <!-- END FIRST -->

        <div class="information_panel"> <!-- SECOND PANEL | STATS-->

            <div id="week_information_panel">
                <div class="flex_item">Todays date: <span id="currentDate"></span></div>
                <div class="flex_item">Workout started: <span id="startDate"></span></div>
                <div class="flex_item">Week number: <span id="weekNumber"></span><span id="initialise_weeks"> reset?</span></div>
                <div class="flex_item">Days in: <span id="daysInToWeek"></span> </div>
            </div>

        </div> <!-- SECOND FIRST -->

        <div class="information_panel"> <!--  THIRD PANEL | ALERTS -->

            <div class="picture_upload_panel">
                <form name="pictureUploadForm" enctype="multipart/form-data" id="pictureUploadForm">
                    <input type="file" name="fileUpload" id="fileUpload" placeholder="Click to upload...">
                    <input type="button" value="Submit" id="pictureSubmitButton">
                </form>
            <div id="debug"></div>
        </div> <!-- END THIRD -->

        <!-- <div class="information_panel">  FORTH PANEL | MOTIVATIONAL MESSAGES
        
            <div id="motivation_panel">
                <div class="flex_item"><span id="calorieDifference"></span></div>
                <div class="flex_item">You need to burn 3500 calories per week to lose 1 pound</div>
                <p>You are at a deficit. You will lose weight. The healthy amount of intake is 1800 calories.</p>
                <p>You are over your calorie limit. You need to burn X amount.</p>
                <p>As you want to burn the fat off, you need to burn 3500 calories per week to lose 1 pound</p>
                <p>This means you need to burn 500 more calories than you eat a day</p>
                <p>This week, you have burned X number of calories so far. You have eaten X number of calories so far.</p>
                
            </div> 

        </div>  END FORTH -->

        <div class="localstorage_panel_wrapper">

            <div class="localstorage_panel" id="exercise_output"> <!-- FIFTH PANEL | EXERCISES-->
                <h1>Exercises done today</h1>
                <p>None.</p>
            </div> <!-- END FIFTH-->

            <div class="localstorage_panel" id="food_output"> <!-- FIFTH SIXTH | FOOD AND DRINK-->
                <h1>Food and drink consumed today</h1>
                <p>None.</p>
            </div> <!-- END SIXTH-->

        </div>

    </div>

</div>

<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
<script src="js/index_engine.js"></script>
</body>
</html>