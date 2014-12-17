<?php

if (isset($_POST['signMeOut']))
{
	$s = $_POST['signMeOut'];

	if ($s)
	{
		session_start();
		session_destroy();
		echo "success";
	}
}

?>