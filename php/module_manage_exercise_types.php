<?php


$host = "localhost";
$username = "root";
$password = "";
$database = "wholegrain";

$connect = mysqli_connect($host,$username,$password,$database);


if (isset($_POST['newCardioName']) && isset($_POST['newCardioCalorieConsumption']))
{
	$newName = $_POST['newCardioName'];
	$newCalories = $_POST['newCardioCalorieConsumption'];

	$sql = mysqli_query($connect,"INSERT INTO cardio_exercises (exercise_name,calorie_consumption_per_minute) VALUES ('$newName','$newCalories')");
	echo $newName;
}

?>