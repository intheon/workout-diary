<?php

session_start();

require "db_conf.php";

$connect = mysqli_connect($host,$username,$password,$database);

if (isset($_SESSION['username']))
{
	$date =  $_POST['dateFilter'];
	$loggedInUser = $_SESSION['username'];
	$data = mysqli_query($connect,"SELECT * FROM athlete WHERE username = '$loggedInUser'");
	$result = mysqli_query($connect,"SELECT * FROM exercise_tracker WHERE date = '$date' AND user_id = '$loggedInUser'");

}

$json = array();

while ($row = mysqli_fetch_assoc($data))
{
	$json[] =  $row;
}

while ($row2 = mysqli_fetch_assoc($result))
{
	$json[] =  $row2;
}


$_SESSION["gym_visits"] =  $json[0]["gym_visits_per_week"];

echo json_encode($json);





?>