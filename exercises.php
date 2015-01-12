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
    <link href="css/global_framework.css" rel="stylesheet" type="text/css">
    <link href="css/exercise_page.css" rel="stylesheet" type="text/css">
</head>

<body>

<!-- TOP TOOLBAR -->
<div id="toolbar">
    <div id="appName"></div>
    <div id="settings"></div>
</div>

<!-- MENU BAR -->
<div class="menu_panel"></div>

<!-- THE INTERACTION PANEL IS PURELY WHERE INTERACTIONS OCCUR -->
<div class="exercise_wrapper">

        <div class="information_panel" id="gym_visited_panel"> <!-- FIRST -->
            <div id="gymCheck">
                <div id="gymConf">
                    <span class="toggle">
                        <input type="checkbox" disabled="true">
                        <label data-off="&#10006;" data-on="&#10004;"></label>
                    </span>
                </div>
            <div class="messages"></div>
            </div>
        </div> <!-- END FIRST -->

        <!-- CARDIO -->
        <div class="information_panel" id="cardio_completed_panel"> <!-- SECOND -->
            <h1>Cardiovascular <span class="edit"><span id="editCardio">Edit</span> | <span id="addCardio">Add</span></span></h1>
            <p>Please enter the cardiovascular activity you did by clicking on the headers.</p>

                <!-- THE ELEMENTS ARE DYNAMICALLY DRAWN BY JAVASCRIPT -->
        		<!-- THEY HAVE BEEN DEFINED IN THE MYSQLI DB -->
        		<div class="cardio_panel"></div>

        		<!-- THE FORM IS DYNAMICALLY DRAWN BY JAVASCRIPT -->
        		<div class="cardio_forms"></div>

       			<!-- AND A HIDDEN SUBMIT BUTTON TO SUBMIT ALL -->
        		<div class="cardio_submit_all" style="display:none">
            		<form><input type="button" value="Submit All"></form>        
        		</div>

        </div>



        <!-- WEIGHTS -->
        <div class="information_panel" id="weights_completed_panel"> <!-- THIRD -->
            <h1>Weights <span class="edit"><span id="editWeights">Edit</span> | <span id="addWeights">Add</span></span></h1>
            <p>Enter the weight you've done today.</p>
        </div>


</div>





<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
<script src="js/exercise_engine.js"></script>

</body>
</html>