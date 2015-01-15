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
    <div id="appName"></div>
    <div id="settings"></div>
</div>

<div class="menu_panel"></div>

<div class="main_content">

    <div id="modules_bar"> <!-- MODULES | CONTAINS STATS -->
        <div id="exercises_illustration">
            <span class="jumbo">???</span><span class="remainder"> more gym visits remaining.</span>
        </div>
        <div id="calories_illustration">
            <span class="jumbo" id="calories_in">0</span><span class="remainder"> calories consumed.</span><br />
            <span class="jumbo" id="calories_out">0</span><span class="remainder"> calories burned.</span><br />
        </div>
        <div id="pictures_illustration">
            <span class="jumbo">???</span><span class="remainder"> ...</span>
        </div>
    </div>

    <div id="interaction_panel">

        <div class="information_panel first"> <!-- FIRST PANEL | WELCOME -->

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

        <div class="information_panel"> <!--  THIRD PANEL | PICTURES -->

            <div class="picture_upload_panel">

            	<div>Picture time! Take a picture and upload it below</div>

                <form name="pictureUploadForm" enctype="multipart/form-data" id="pictureUploadForm">
                    <input type="file" name="fileUpload" id="fileUpload" placeholder="Browse">
                    <input type="button" value="Submit" id="pictureSubmitButton">
                </form>

            	<div id="debug"></div>

            </div>

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

        <div class="information_panel database">

            <div id="exercise_output" class="database_output"> <!-- FIFTH PANEL | EXERCISES-->
                <h2>Exercises done today</h2>
                <p>None.</p>
            </div> <!-- END FIFTH-->

            <div id="food_output" class="database_output"> <!-- FIFTH SIXTH | FOOD AND DRINK-->
                <h2>Food and drink consumed today</h2>
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