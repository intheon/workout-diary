<?php

$host = "localhost";
$username = "root";
$password = "";
$database = "wholegrain";

$connect = mysqli_connect($host,$username,$password,$database);

if (isset($_POST['athletenum']))
{
	$athleteId = $_POST['athletenum'];
	$data = mysqli_query($connect,"SELECT * FROM athlete WHERE id = '$athleteId'");
}
else
{
	$data = mysqli_query($connect,"SELECT * FROM athlete");
}

$json = array();

while ($row = mysqli_fetch_assoc($data))
{
	$json[] =  $row;
}

echo json_encode($json);

?>