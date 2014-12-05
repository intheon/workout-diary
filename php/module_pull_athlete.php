<?php

session_start();

require "db_conf.php";

$connect = mysqli_connect($host,$username,$password,$database);

if (isset($_SESSION['username']))
{
	$loggedInUser = $_SESSION['username'];
	$data = mysqli_query($connect,"SELECT * FROM athlete WHERE username = '$loggedInUser'");
}

$json = array();

while ($row = mysqli_fetch_assoc($data))
{
	$json[] =  $row;
}

$_SESSION["gym_visits"] =  $json[0]["gym_visits_per_week"];

echo json_encode($json);





?>