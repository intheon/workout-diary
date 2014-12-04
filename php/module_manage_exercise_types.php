<?php


require "db_conf.php";

$connect = mysqli_connect($host,$username,$password,$database);

if (isset($_POST['newCardioName']) && isset($_POST['newCardioCalorieConsumption']))
{
	$newName = $_POST['newCardioName'];
	$newCalories = $_POST['newCardioCalorieConsumption'];

	$sql = mysqli_query($connect,"INSERT INTO cardio_exercises (exercise_name,calorie_consumption_per_minute) VALUES ('$newName','$newCalories')");
	echo $newName;
}

if (isset($_POST['modName']) && isset($_POST['existingId']) && isset($_POST['modQuant']))
{
	$id = $_POST['existingId'];
	$newName = $_POST['modName'];
	$newCalories = $_POST['modQuant'];

	$sql = mysqli_query($connect,"UPDATE cardio_exercises SET exercise_name = '$newName', calorie_consumption_per_minute = '$newCalories' WHERE id = '$id'");

	//echo "editCardio" . $newName;


}



?>