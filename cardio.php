<!DOCTYPE html>
<html lang="en" xml:lang="en">
<head>
    <link href="css/global_framework.css" rel="stylesheet" type="text/css">
    <link href="css/cardio_page.css" rel="stylesheet" type="text/css">
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

    <!-- THE INTERACTION PANEL IS PURELY WHERE INTERACTIONS OCCUR -->
<div class="right_content">
    <div id="interaction_panel">

        <div class="information_panel">
            <h1>Cardiovascular <span class="edit"><span id="editCardio">Edit</span> | <span id="addCardio">Add</span></span></h1>
            <p>Please enter the cardiovascular activity you are doing by clicking on the headers.</p>
        </div>

        <!-- THE ELEMENTS ARE DYNAMICALLY DRAWN BY JAVASCRIPT -->
        <!-- THEY HAVE BEEN DEFINED IN THE MYSQLI DB -->
        <div class="cardio_panel">
        
        </div>

        <!-- THE FORM IS DYNAMICALLY DRAWN BY JAVASCRIPT -->
        <div class="cardio_forms" style="display:none">
        
        </div>

        <!-- AND A HIDDEN SUBMIT BUTTON TO SUBMIT ALL -->
        <div class="cardio_submit_all" style="display:none">
            <form><input type="button" value="Submit All"></form>        
        </div>

    </div> <!-- END INTERACTION PANEL -->
</div>





<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
<script src="js/cardio_engine.js"></script>

</body>
</html>