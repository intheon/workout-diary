<?php session_start(); ?>
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

<div id="menu_panel">
        <div><a href="index.php">Dashboard < </a></div>
        <div><a href="fooddrink.php">Food and Drink</a></div>
        <div><a href="exercises.php">Exercises</a></div>
        <div><a href="stats.php">Statistics</a></div>
</div>

<div class="right_content">

    <div id="modules_bar">
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

        <div class="information_panel">

            <h1>Welcome to the WorkOut Diary</h1>
            <div class="time_ticker">
                <div class="time_item">Todays date: <span id="currentDate"></span></div>
                <div class="time_item">Workout started: <span id="startDate"></span></div>
            </div>

            <div class="welcome_messages">
                Welcome back, <span id="currentUser"><?php echo $_SESSION["username"]; ?></span>
            </div>
            <div id="week_information_panel">
                <div class="flex_item"><span id="weekNumber"></span> week in. <span id="initialise_weeks">reset?</span></div>
                <div class="flex_item"><span id="daysInToWeek"></span> days in.</div>
            </div>
                
            <div class="alert" style="display:none">
                <h1>It's time for a picture!</h1>
                <form name="pictureUploadForm" enctype="multipart/form-data" id="pictureUploadForm">
                    <p>Click to upload a picture for this week.</p>
                        <input type="file" name="fileUpload" id="fileUpload">
                        <input type="button" value="Submit" id="pictureSubmitButton">
                </form>
                <div id="debug"></div>
            </div>


            <div id="timeline_panel">
            <p>Week planner</p>
				<div id="calendar"></div>
            </div>

            <!--
            <div id="motivation_panel">
                <p>You are at a deficit. You will lose weight. The healthy amount of intake is 1800 calories.</p>
                <p>You are over your calorie limit. You need to burn X amount.</p>
                <p>As you want to burn the fat off, you need to burn 3500 calories per week to lose 1 pound</p>
                <p>This means you need to burn 500 more calories than you eat a day</p>
                <p>This week, you have burned X number of calories so far. You have eaten X number of calories so far.</p>
            </div> 
            -->

        </div>


        <div class="localstorage_panel" id="exercise_output">
            <h1>Exercises done today</h1>
            <p>None.</p>
        </div>

        <div class="localstorage_panel" id="food_output">
            <h1>Food and drink consumed today</h1>
            <p>None.</p>
        </div>

    </div>

</div>

<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
<script src="js/index_engine.js"></script>
</body>
</html>