<!DOCTYPE html>
<html lang="en" xml:lang="en">
<head>
    <link href="css/global_framework.css" rel="stylesheet" type="text/css">
    <link href="css/food_page.css" rel="stylesheet" type="text/css">
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
                    <a href="myaccount.html">My Account</a>
                </li>
                <li><img src="img/settings.png" width="18%">
                    <a href="#">Sign Out</a>
                </li>
            </ul>
        </ul>
    </div>
</div>

<div id="menu_panel">
        <div><a href="index.php">Dashboard</a></div>
        <div><a href="fooddrink.php">Food and Drink <</a></div>
        <div><a href="cardio.php">Cardio</a></div>
        <div><a href="weights.php">Weights</a></div>
        <div><a href="stats.php">Statistics</a></div>
</div>

<div class="right_content">
    <div id="interaction_panel">


        <div class="information_panel">
            <h1>Enter Food and Drink</h1>
            <div id="form_here">
                <form name='foodform' class='food_form'>
                    <p>Item:<input type='text' class='item_input' /></p>
                    <p>Calories:<input type='text' class='calories_input' /></p>
                    <input type='button' name='submitFood' class='submitFood' value='Submit'/>
                </form>
            </div>
        </div>


        <div class="localstorage_panel">
            <h1>So far...</h1>
            <div id="food_here"></div>
            <div id="submitToDB">
                <form id='submit_db'>
                    <input type='button' name='submitDB' id="submitDB" value='Submit'/>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
<script src="js/food_engine.js"></script>
</body>
</html>