<?php

require "db_conf.php";

$connect = mysqli_connect($host,$username,$password,$database);

if (isset($_POST['dateFilter']))
{
	$dateParam = $_POST['dateFilter'];
	$data = mysqli_query($connect,"SELECT * FROM athlete WHERE date_done = '$dateParam'");
}

$json = array();

while ($row = mysqli_fetch_assoc($data))
{
	$json[] =  $row;
}

echo json_encode($json);

?>