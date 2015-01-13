<?php

session_start();

require "db_conf.php";

if (isset($_POST['checkForVisit']) && isset($_SESSION['username']))
{
	$loggedInUser = $_SESSION['username'];
	$date = $_POST['date'];


	$result = mysqli_query($connect,"SELECT * FROM exercises_log WHERE date_done = '$date' AND user = '$loggedInUser'");

	if ($result->num_rows <= 0)
	{
		echo "nothing";
	}
	else
	{
		echo "match";
	}
}



?>