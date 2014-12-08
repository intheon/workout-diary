<?php


require "db_conf.php";

session_start();

$loggedInUser = $_SESSION['username'] ;

if (isset($_POST['dateFilter']))
{
	$dateParam = $_POST['dateFilter'];
	$sql = mysqli_query($connect,"SELECT * FROM diet WHERE date_done = '$dateParam' AND owner = '$loggedInUser'");
}

$json = array();

while ($row = mysqli_fetch_assoc($sql))
{
	$json[] =  $row;
}

echo json_encode($json);

?>