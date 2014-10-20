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
        <div class="modules_footer">View Details...</div>
    </div>
    <div id="calories_illustration">
        <span class="jumbo">890</span> more calories for today.
        <div class="modules_footer">View Details...</div>
    </div>
    <div id="pictures_illustration">
        <span class="jumbo">2</span> days until a picture!
        <div class="modules_footer">View Details...</div>
    </div>
</div>



<div id="interact"> <!-- MAIN DIV FOR QUESTIONS -->
<p>welcome to the workout diary. have you been to the gym today?<a href="#" onClick="did()">Yes</a>
<a href="#" onClick="">No</a></p>

<div id="output"></div>

<div id="form"></div>

<div id="table">
    <div id="header">
        <h1>Excercise</h1>
    </div>
    <div id="content">
        <h1>Calories Spent</h1>
    </div>
    <div id="total"></div>
</div>

<!-- THIS STUFF IS THE QUESTIONS -->

<div id="ask">

    <!-- CHECK IF CARDIO WAS DONE FIRST -->
    <div id="didCardio" style="display:none">
    Did you do cardio exercise?
        <form name="didCardio">
            <input type="button" value="Yes" name="cYes" onClick="yesFunc(this.value)">
            <input type="button" value="No" name="cNo" onClick="noFunc(this.value)">
        </form>
    </div>
    <!-- START CARDIO QUESTIONS -->
    <div id="whatCardio" style="display:none"> 
    What cardio did you do?
        <form id="whatTypeOfCardio">
            <input type="button" value="Cross Trainer" id="crossTrainerBtn">
            <input type="button" value="Push Ups" id="pushUpBtn">
            <input type="button" value="Sit Ups" id="sitUpBtn">
            <input type="button" value="Treadmill" id="treadmillBtn">
            <input type="button" value="Rowing" id="rowingBtn">
            <input type="button" value="Stepper" id="stepperBtn">
        </form>

    <div id="testWrapper">
    <div id="crossTrainerDiv" style="display:none;">
    <h2>Cross Trainer</h2>
        <form name="crossTrainerTimeForm" id="crossTrainerTimeForm">
            <select name="crossTrainerTime" id="crossTrainerTime">
                <option value="5" name="ct5minutes">5 Minutes</option>
                <option value="10" name="ct10minutes">10 Minutes</option>
                <option value="15" name="ct15minutes">15 Minutes</option>
                <option value="20" name="ct20minutes">20 Minutes</option>
                <option value="25" name="ct25minutes">25 Minutes</option>
            </select>
            <input type="button" id="crossTrainerTimeConfirm" value="OK">
        </form>
    </div>
    <div id="pushUpDiv" style="display:none;">
        <h2>Push Ups</h2>
        <form name="pushUpTimeForm">
            <select name="pushUpTime" id="pushUpTime">
                <option name="5up" value="5">5 Push Ups</option>
                <option name="10up" value="10">10 Push Ups</option>
                <option name="15up" value="15">15 Push Ups</option>
                <option name="20up" value="20">20 Push Ups</option>
                <option name="25up" value="25">25 Push Ups</option>
            </select>
            <input type="button" id="pushUpTimeConfirm" value="OK" onClick="submitToPHP(pushUpTime.name,pushUpTime.value);">
        </form>
     </div>
    <div id="sitUpDiv" style="display:none;">
    <h2>Sit Ups</h2>
        <form name="sitUpTimeForm">
            <select name="sitUpTime" id="sitUpTime">
                <option name="5sup" value="5">5 Sit Ups</option>
                <option name="10sup" value="10">10 Sit Ups</option>
                <option name="15sup" value="15">15 Sit Ups</option>
                <option name="20sup" value="20">20 Sit Ups</option>
                <option name="25sup" value="25">25 Sit Ups</option>
            </select>
            <input type="button" id="sitUpTimeConfirm" value="OK" onClick="submitToPHP(sitUpTime.name,sitUpTime.value);">
        </form>
    </div>
     <div id="treadmillDiv" style="display:none;">
    <h2>Treadmill</h2>
        <form name="treadmillTimeForm">
            <select name="treadmillTime" id="treadmillTime">
                <option name="5tminutes" value="5">5 Minutes</option>
                <option name="10tminutes" value="10">10 Minutes</option>
                <option name="15tminutes" value="15">15 Minutes</option>
                <option name="20tminutes" value="20">20 Minutes</option>
                <option name="25tminutes" value="25">25 Minutes</option>
            </select>
            <input type="button" id="treadmillTimeConfirm" value="OK" onClick="submitToPHP(treadmillTime.name,treadmillTime.value);">
        </form>
    </div>
    <div id="rowingDiv" style="display:none;">
    <h2>Rowing</h2>
        <form name="rowingTimeForm">
            <select name="rowingTime" id="rowingTime">
                <option name="5rminutes" value="5">5 Minutes</option>
                <option name="10rminutes" value="10">10 Minutes</option>
                <option name="15rminutes" value="15">15 Minutes</option>
                <option name="20rminutes" value="20">20 Minutes</option>
                <option name="25rminutes" value="25">25 Minutes</option>
            </select>
            <input type="button" id="rowingTimeConfirm" value="OK" onClick="submitToPHP(rowingTime.name,rowingTime.value);">
        </form>
    </div>
    <div id="stepperDiv" style="display:none;">
    <h2>Stepper</h2>
        <form name="stepperTimeForm">
            <select name="stepperTime" id="stepperTime">
                <option name="srminutes" value="5">5 Minutes</option>
                <option name="10sminutes" value="10">10 Minutes</option>
                <option name="15sminutes" value="15">15 Minutes</option>
                <option name="20sminutes" value="20">20 Minutes</option>
                <option name="25sminutes" value="25">25 Minutes</option>
            </select>
            <input type="button" id="stepperTimeConfirm" value="OK" onClick="submitToPHP(stepperTime.name,stepperTime.value);">
        </form>
    </div>
    </div> 
    </div>
    <!-- END CARDIO QUESTIONS -->
    <!-- BEGIN WEIGHTS QUESTIONS -->
    <div id="whatExcercises" style="display:none">
    What weights and excercises did you do?
        <form name="whatExcercises">
            <input type="button" value="Chest" id="chestBtn" onClick="showElement('chestDiv','1')">
            <input type="button" value="Triceps" id="tricepsBtn" onClick="showElement('tricepsDiv','1')">
            <input type="button" value="Back and Biceps" id="backAndBicepBtn" onClick="showElement('backAndBicepDiv','1')">
            <input type="button" value="Shoulders" id="shouldersBtn" onClick="showElement('shouldersDiv','1')">
        </form>
    </div>
    <div id="chestDiv" style="display:none;">
    <h2>Chest Excercises</h2>
        <form name="chestExcerciseForm">
            <input type="checkbox" value="Incline Dumbell Press" onClick="showElement('chestEx1','1')">Incline Dumbell Press</input>
            <input type="checkbox" value="Incline Dumbell Flies" onClick="showElement('chestEx2','1')">Incline Dumbell Flies</input>
            <input type="checkbox" value="Dumbell Bench Press" onClick="showElement('chestEx3','1')">Dumbell Bench Press</input>
            <input type="checkbox" value="Push-Ups" onClick="showElement('chestEx4','1')">Push-Ups</input>
            <input type="checkbox" value="Dips" onClick="showElement('chestEx5','1')">Dips</input>
        </form>
    <div id="chestEx1" style="display:none">
    <h2>Incline Dumbell Press</h2>
    Sets - How many sets did you do?
        <form>
            <select id="chestEx1Sets" onChange="listSets(this.value,this.id)">
                <option name="One" value="1">One</option>
                <option name="Two" value="2">Two</option>
                <option name="Three" value="3">Three</option>
            </select>
        </form>
        <div id="chestCommitDiv">
        <form name="chestCommitForm" id="chestCommitForm">
        <input type="button" id="chestCommit" value="Commit!" onClick="captureResult();">
        </form>
                
            </div>
            </div>

            <div id="chestEx2" style="display:none"></div>
            <div id="chestEx3" style="display:none"></div>
            <div id="chestEx4" style="display:none"></div>
            <div id="chestEx5" style="display:none"></div>

        </div>

    </div>

</div> <!-- END ASK DIV -->


<div id="sidePane">
<h3>Ready to send to database</h3>

        <div id="date">Todays Date: </div><br />
        <div id="week">Week: <span id="weekNumber"></span>
        <span><a onClick="resetWeek()" href="#">&nbsp;reset?</a></span></div>
</div>

<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
</body>
</html>