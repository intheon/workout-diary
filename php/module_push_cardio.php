<?php

// this gets passed a shit ton of params
require "db_conf.php";

	// store the post variables into their own vars
	$exercise = $_POST["ex_name"];
	$quantity = $_POST["quantity"];
	$totalCals = $_POST["calories_total"];
	$date = $_POST["date_done"];


	// queries
	$sql = mysqli_query($connect,"INSERT INTO cardio_complete (exercise_name,date_done,calories_total,minutes_quantity) VALUES ('$exercise','$date','$totalCals','$quantity')");
	
	mysqli_close($connect);


?>


?>