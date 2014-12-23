<?php

session_start();

require "db_conf.php";

if (isset($_SESSION['username']) && isset($_POST['checked']) && $_POST['checked'] == true)
{
	$loggedInUser = $_SESSION['username'];
	$gym_visted =  1;
	$date = $_POST['date'];

	mysqli_query($connect,"INSERT INTO exercise_index (user_id, date, gym_visited) VALUES ('$loggedInUser','$date','$gym_visited')");

}

if (isset($_POST['checkForVisit']) && isset($_SESSION['username']))
{
	$loggedInUser = $_SESSION['username'];
	$date = $_POST['date'];

	$result = mysqli_query($connect,"SELECT * FROM exercise_index WHERE date = '$date' AND user_id = '$loggedInUser'");

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