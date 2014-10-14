<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'hiya';

try{


$connect = mysqli_connect($host,$username,$password,$database);

$data = mysqli_query($connect,'SELECT exercise_name,calories_per_min FROM exercise_calories');

$json = array();

while($row = mysqli_fetch_assoc($data))
{
		$json[] =  $row;
}
}
catch($e)
{
	echo "caught: ", $e->getMessage();
}

mysqli_close($connect);

echo json_encode($json);


?>