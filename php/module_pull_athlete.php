<?php

session_start();

$host = "localhost";
$username = "root";
$password = "";
$database = "wholegrain";

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

echo json_encode($json);



?>