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
        <div><a href="index.php">Dashboard</a></div>
        <div><a href="fooddrink.php">Food and Drink</a></div>
        <div><a href="cardio.php">Cardio</a></div>
        <div><a href="weights.php">Weights</a></div>
        <div><a href="stats.php">Statistics</a></div>
</div>

<div class="right_content">

    <div id="modules_bar">
        <div id="exercises_illustration">
            <span class="jumbo">???</span><span class="remainder"> more gym visits remaining.</span>
        </div>
        <div id="calories_illustration">
            <span class="jumbo" id="calories_in">???</span><span class="remainder"> calories in.</span>
            <span class="jumbo" id="calories_out">???</span><span class="remainder"> calories out.</span>
            <span class="foot_notes">
            	<span id="remaining"></span> calories remaining from baseline requirement.
            </span>
        </div>
        <div id="pictures_illustration">
            <span class="jumbo">???</span><span class="remainder"> days until a picture!</span>
        </div>
    </div>

    <div id="interaction_panel">

        <div class="alert_panel"></div>

        <div class="information_panel">

            <h1>Welcome to the WorkOut Diary</h1>
            <p>Currently logged in as <span id="currentUser"></span></p>
            <p>Todays Date is <span id="currentDate"></span></p>

            <div id="week_information_panel">
                <p>You started your workout timeline on <span id="startDate"></span></p>
                <p>This is week number <span id="weekNumber"></span>.</p>
                <p><span id="initialise_weeks">Start?</span></p>
            </div>

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