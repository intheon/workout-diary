<?php

session_start();

// this gets passed a shit ton of params
require "db_conf.php";

	// store the post variables into their own vars
	$date = $_POST["date_done"];
	$json = $_POST["json"];
	$totalCals = $_POST["calories_total"];
	$loggedInUser = $_SESSION['username'] ;

	// queries
	$sql = mysqli_query($connect,"INSERT INTO exercises_log (date_done,json,calories_total,owner) VALUES ('$date','$json','$totalCals','$loggedInUser')");
	
	mysqli_close($connect);


?>