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
                    <a href="#">Sign Out</a>
                </li>
            </ul>
        </ul>
    </div>
</div>

<div id="main">
<!-- SIDE PANEL -->

    <div id="menu_panel">
        <div><a href="index.php">Dashboard</a></div>
        <div>Food and Drink</div>
        <div><a href="cardio.php">Cardio</a></div>
        <div>Weights</div>
        <div>Statistics</div>
    </div>

    <div id="interaction_panel">

        <div class="information_panel">
            <h1>Cardiovascular</h1>
            <p>Please enter the cardiovascular activity you are doing by clicking on the headers.</p>
        </div>

        <div class="tab_panel">

        <!-- TAB BOXES -->

            <ul class="tabs">
                <a href="#ct_tab_content"><li id="ct_tab">Cross Trainer</li></a>
                <a href="#pu_tab_content"><li id="pu_tab">Push Ups</li></a>
                <a href="#su_tab_content"><li id="su_tab">Sit Ups</li></a>
                <a href="#tm_tab_content"><li id="tm_tab">Treadmill</li></a>
                <a href="#ro_tab_content"><li id="ro_tab">Rowing</li></a>
                <a href="#st_tab_content"><li id="st_tab">Stepper</li></a>
            </ul>

        <!-- TAB CONTENT -->

            <div id="tab_content">

                <div id="ct_tab_content">
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

                <div id="pu_tab_content">
                    <form name="pushUpTimeForm">
                        <select name="pushUpTime" id="pushUpTime">
                            <option name="5up" value="5">5 Push Ups</option>
                            <option name="10up" value="10">10 Push Ups</option>
                            <option name="15up" value="15">15 Push Ups</option>
                            <option name="20up" value="20">20 Push Ups</option>
                            <option name="25up" value="25">25 Push Ups</option>
                        </select>
                        <input type="button" id="pushUpTimeConfirm" value="OK">
                    </form>
                </div>

                <div id="su_tab_content" style="display:none;">
                    <form name="sitUpTimeForm">
                        <select name="sitUpTime" id="sitUpTime">
                            <option name="5sup" value="5">5 Sit Ups</option>
                            <option name="10sup" value="10">10 Sit Ups</option>
                            <option name="15sup" value="15">15 Sit Ups</option>
                            <option name="20sup" value="20">20 Sit Ups</option>
                            <option name="25sup" value="25">25 Sit Ups</option>
                        </select>
                        <input type="button" id="sitUpTimeConfirm" value="OK">
                    </form>
                </div>

                <div id="tm_tab_content">
                    <form name="treadmillTimeForm">
                        <select name="treadmillTime" id="treadmillTime">
                            <option name="5tminutes" value="5">5 Minutes</option>
                            <option name="10tminutes" value="10">10 Minutes</option>
                            <option name="15tminutes" value="15">15 Minutes</option>
                            <option name="20tminutes" value="20">20 Minutes</option>
                            <option name="25tminutes" value="25">25 Minutes</option>
                        </select>
                        <input type="button" id="treadmillTimeConfirm" value="OK">
                    </form>
                </div>

                <div id="ro_tab_content">
                    <form name="rowingTimeForm">
                        <select name="rowingTime" id="rowingTime">
                            <option name="5rminutes" value="5">5 Minutes</option>
                            <option name="10rminutes" value="10">10 Minutes</option>
                            <option name="15rminutes" value="15">15 Minutes</option>
                            <option name="20rminutes" value="20">20 Minutes</option>
                            <option name="25rminutes" value="25">25 Minutes</option>
                        </select>
                        <input type="button" id="rowingTimeConfirm" value="OK">
                    </form>
                </div>

                <div id="st_tab_content">
                    <form name="stepperTimeForm">
                        <select name="stepperTime" id="stepperTime">
                            <option name="srminutes" value="5">5 Minutes</option>
                            <option name="10sminutes" value="10">10 Minutes</option>
                            <option name="15sminutes" value="15">15 Minutes</option>
                            <option name="20sminutes" value="20">20 Minutes</option>
                            <option name="25sminutes" value="25">25 Minutes</option>
                        </select>
                        <input type="button" id="stepperTimeConfirm" value="OK">
                    </form>
                </div>

            </div> <!-- END TAB CONTENT WRAPPER -->

        </div> <!-- END TAB PANEL -->

    <div class="localstorage_panel">
        <h1>Saved</h1>
        <p class="localstorage_table"></p>
    </div>

    <div class="submission_panel">
    </div>

    </div> <!-- END INTERACTION PANEL -->



</div> <!-- END MAIN -->


<script src="js/jquery.js"></script>
<script src="js/global_engine.js"></script>
<script src="js/cardio_engine.js"></script>

</body>
</html>