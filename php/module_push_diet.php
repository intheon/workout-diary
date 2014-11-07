<?php

if(isset($_POST["whole"]))
{
	// store the entire json string in the db
	$strng = $_POST["whole"];
	$date = $_POST["dateDone"];
	$totalCals = $_POST["totalCalories"];

	// connection details
	$host = "localhost";
	$username = "root";
	$password = "";
	$database = "wholegrain";
	$connect = mysqli_connect($host,$username,$password,$database);

	// queries
	$sql = mysqli_query($connect,"INSERT INTO diet (date_done,json,total_calories) VALUES ('$date','$strng','$totalCals')");

	mysqli_close($connect);
}

?>