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
                    <a href="#">Sign Out</a>
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
        <h1>My Account</h1>
        <p>View your account here, and manage your information</p>

    <div class="table_panel">
        <h2>Logged in as:</h2>
        <p>Ben</p>
        <h2>Current Weight:</h2>
        <p>78kgs</p>
        <h2>Current BMI:</h2>
        <p>22.07</p>
        <h2>Calories per day</h2>
        <p>2307</p>
    </div>

    </div>

</div>


<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
</body>
</html>