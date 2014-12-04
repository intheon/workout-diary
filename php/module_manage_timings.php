<?php

require "db_conf.php";

if (isset($_POST['reset']))
{
	if ($_POST['reset'] == true)
	{
		$date = $_POST['date'];
		$daysIn = $_POST['daysIn'];
		$delete = mysqli_query($connect,"DELETE FROM timings");
		$sql = mysqli_query($connect,"INSERT INTO timings (week_number,date,day_of_week,days_in) VALUES (1,'$date',1,'$daysIn') ");
	}
}

if (isset($_POST['getDate']))
{
	if ($_POST['getDate'] == true)
	{

		$sql = mysqli_query($connect,"SELECT * FROM timings WHERE `id` = (SELECT MAX(id) FROM `timings`)");

		$row = mysqli_fetch_assoc($sql);

		$array = array();

		$array[] = $row;

		echo json_encode($array);

	}
}

mysqli_close($connect);
?>