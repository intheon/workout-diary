<?php

	$host = "localhost";
	$username = "root";
	$password = "";
	$database = "wholegrain";
	$connect = mysqli_connect($host,$username,$password,$database);

	echo "im fired";
if (isset($_POST['reset']))
{
	if ($_POST['reset'] == true)
	{
		$sql = mysqli_query($connect,"INSERT INTO timings (week_number) VALUES (1) ");
	}
}

?>