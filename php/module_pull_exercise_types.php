<?php

$host = "localhost";
$username = "root";
$password = "";
$database = "wholegrain";

$connect = mysqli_connect($host,$username,$password,$database);

$sql = mysqli_query($connect,"SELECT * FROM cardio_exercises");

$json = array();

while ($row = mysqli_fetch_assoc($sql))
{
	$json[] =  $row;
}

echo json_encode($json);

?>