<?php

// a module to take a json string passed from cardio.php to the db

if (isset($_POST['payload']))
{
	$entire_json_string = json_decode($_POST['payload']);
	$count = 0;
	foreach($entire_json_string as $exercise_name => $value)
	{
		$count++;
		echo "Exercise number " . $count . ": " . $exercise_name . " | Quantity: " . $value . "\n";
		echo $value . " " . $exercise_name . " takes n calories\n\n" ;
	}
}

?>