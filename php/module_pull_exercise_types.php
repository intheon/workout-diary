<?php

session_start();

require "db_conf.php";

if (isset($_POST["type"]))
{
	$type = $_POST["type"];

	$sql = mysqli_query($connect,"SELECT * FROM `$type`");

	$json = array();

	$json[] = $type;

	while ($row = mysqli_fetch_assoc($sql))
	{
		$json[] =  $row;
	}

	echo json_encode($json);


}

?>