<!DOCTYPE html>
<html lang="en" xml:lang="en">
<head>
    <link href="css/global_framework.css" rel="stylesheet" type="text/css">
    <link href="css/index_page.css" rel="stylesheet" type="text/css">
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

<div id="menu_panel">
    <div><a href="index.php">Dashboard</a></div>
    <div>Food and Drink</div>
    <div><a href="cardio.php">Cardio</a></div>
    <div>Weights</div>
    <div>Statistics</div>
</div>


<div id="modules_bar">
    <div id="exercises_illustration">
        <span class="jumbo">4</span> more exercises to go.
    </div>
    <div id="calories_illustration">
        <span class="jumbo">???</span> more calories for today.
    </div>
    <div id="pictures_illustration">
        <span class="jumbo">2</span> days until a picture!
    </div>
</div>

<div id="interaction_panel">
    <div class="information_panel">
        <h1>Welcome to the WorkOut Diary</h1>
        <p>Currently logged in as <span id="currentUser"></span></p>
        <p>Todays Date is <span id="currentDate"></span></p>
    </div>
    <div class="localstorage_panel">
        <h1>Exercises done today</h1>
        <p>These are ready to be added to the database</p>
    </div>
</div>



<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
<script src="js/index_engine.js"></script>
</body>
</html>