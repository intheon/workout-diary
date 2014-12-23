<?php

session_start();

require "db_conf.php";

if (isset($_POST['filter']) && isset($_SESSION['username']))
{

	$loggedInUser = $_SESSION['username'];

	$filterBy = $_POST['filter'];

	$result = mysqli_query($connect,"SELECT * FROM exercise_index WHERE date = '$filterBy' AND user_id = '$loggedInUser' ");

	$json = array();

	while($row = mysqli_fetch_assoc($result))
	{
		$json[] =  $row;
	}


	mysqli_close($connect);

	echo json_encode($json);

}

?>