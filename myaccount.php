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
    <link href="css/myaccount_page.css" rel="stylesheet" type="text/css">
</head>

<body>
<!-- TOP TOOLBAR -->
<div id="toolbar">
    <div id="appName"></div>
    <div id="settings"></div>
</div>

<!-- SIDE PANEL -->
<div class="menu_panel"></div>
<!-- MAIN CONTENT PANEL -->
<div class="main_content">

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