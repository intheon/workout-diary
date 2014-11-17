<?php

	$host = "localhost";
	$username = "root";
	$password = "";
	$database = "wholegrain";
	$connect = mysqli_connect($host,$username,$password,$database);

if (isset($_POST['reset']))
{
	if ($_POST['reset'] == true)
	{
		$date = $_POST['date'];
		$daysIn = $_POST['daysIn'];
		$sql = mysqli_query($connect,"INSERT INTO timings (week_number,date,day_of_week,days_in) VALUES (1,'$date',1,'$daysIn') ");

	}
}



if (isset($_POST['getDate']) && isset($_POST['currentDays']))
{
	if ($_POST['getDate'] == true)
	{
		//$currentDays = $_POST['currentDays'];

		$currentDays = 328;

		$sql = mysqli_query($connect,"SELECT * FROM timings WHERE `id` = (SELECT MAX(id) FROM `timings`)");

		$row = mysqli_fetch_assoc($sql);

		$date = $row['days_in'];

		if ($currentDays - $date < 7)
		{
			echo $date - $currentDays;
			echo "\n";
			echo $date;
			echo "\n";
			echo $currentDays;
			echo "\n";
			echo "First Condition";
		}
		else if ($currentDays - $date >= 7)
		{
			echo $date;
			echo "\n";
			echo $currentDays;
			echo "\n";
			echo "Second Condition";
		}
		else 
		{
			echo "bork";
		}


	}
}

mysqli_close($connect);
?>