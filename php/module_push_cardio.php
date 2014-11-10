<?php

// a module to take a json string passed from cardio.php to the db

if (isset($_POST['payload']))
{
	$str = $_POST['payload'];

	echo $str;
}

?>