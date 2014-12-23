<?php

require "db_conf.php";

$connect = mysqli_connect($host,$username,$password,$database);

$sql = mysqli_query($connect,"SELECT * FROM types_cardio");

$json = array();

while ($row = mysqli_fetch_assoc($sql))
{
	$json[] =  $row;
}

echo json_encode($json);

?>