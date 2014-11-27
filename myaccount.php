<?php session_start(); ?>
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
        <div><a href="fooddrink.php">Food and Drink</a></div>
        <div><a href="cardio.php">Cardio</a></div>
        <div><a href="weights.php">Weights</a></div>
        <div><a href="stats.php">Statistics</a></div>
</div>
<!-- MAIN CONTENT PANEL -->
<div class="right_content">

    <div id="interaction_panel">

        <div class="information_panel">

            <h1>My Account</h1>

            <p>View and modify your account information here.</p>

            <div class="person_info_panel"></div>

        </div>

      </div>

</div>


<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
<script src="js/my_account_engine.js"></script>

</body>
</html>