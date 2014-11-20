<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'wholegrain';
$connect = mysqli_connect($host,$username,$password,$database);

if (isset($_POST['filter']))
{
	$filterBy = $_POST['filter'];

	$cardio = mysqli_query($connect,"SELECT * FROM cardio_complete WHERE date_done = '$filterBy'");


	$json = array();

	while($row = mysqli_fetch_assoc($cardio))
	{
		$json[] =  $row;
	}


	mysqli_close($connect);

	echo json_encode($json);

}

?>