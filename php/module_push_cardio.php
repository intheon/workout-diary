<?php

// a module to take a json string passed from cardio.php to the db

if (isset($_POST['payload']))
{
	$entire_json_string = json_decode($_POST['payload']);

	foreach($entire_json_string as $key => $value)
	{
		echo $key;
		echo $value;
	}
}

?>