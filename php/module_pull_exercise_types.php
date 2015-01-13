<?php

session_start();

require "db_conf.php";

var_dump($_POST);

/*

$sql = mysqli_query($connect,"SELECT * FROM '$type'");

$json = array();

while ($row = mysqli_fetch_assoc($sql))
{
	$json[] =  $row;
}

echo json_encode($json);
*/
?>