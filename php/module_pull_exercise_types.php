<?php

require "db_conf.php";

$sql = mysqli_query($connect,"SELECT * FROM types_cardio");

$json = array();

while ($row = mysqli_fetch_assoc($sql))
{
	$json[] =  $row;
}

echo json_encode($json);

?>