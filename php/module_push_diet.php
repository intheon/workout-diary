<?php

require "db_conf.php";

session_start();

$loggedInUser = $_SESSION['username'] ;

if(isset($_POST["whole"]))
{
	// store the entire json string in the db
	$strng = $_POST["whole"];
	$date = $_POST["dateDone"];
	$totalCals = $_POST["totalCalories"];

	// queries
	$sql = mysqli_query($connect,"INSERT INTO diet (date_done,json,total_calories,owner) VALUES ('$date','$strng','$totalCals','$loggedInUser')");

	mysqli_close($connect);
}

?>