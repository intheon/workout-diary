<?php

require "db_conf.php";

session_start();

$loggedInUser = $_SESSION['username'] ;

if (isset($_POST['reset']))
{
	if ($_POST['reset'] == true)
	{
		$date = $_POST['date'];
		$daysIn = $_POST['daysIn'];
		$delete = mysqli_query($connect,"DELETE FROM timings");
		$sql = mysqli_query($connect,"INSERT INTO timings (week_number,date,days_in) VALUES (1,'$date','$daysIn','$loggedInUser') ");
	}
}

if (isset($_POST['getDate']))
{
	if ($_POST['getDate'] == true)
	{

		$sql = mysqli_query($connect,"SELECT * FROM timings WHERE `user_name` = '$loggedInUser'");

		$row = mysqli_fetch_assoc($sql);

		$array = array();

		$array[] = $row;

		echo json_encode($array);

	}
}

mysqli_close($connect);
?>