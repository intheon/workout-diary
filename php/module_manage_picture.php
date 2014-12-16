<?php

require "db_conf.php";

if (isset($_POST['checkPicture']) && isset($_POST['weekNumber']))
{
	$currentWeek = $_POST['weekNumber'];

	if ($_POST['checkPicture'] == true)
	{
		$check = mysqli_query($connect,"SELECT * FROM picture WHERE week_number = '$currentWeek'");

		$result = mysqli_fetch_row($check);

		if ($result[3] == 1)
		{
			echo true;
		}
		else
		{
			echo false;
		}
	}
}

else
{

	if (!isset($_FILES['file']))
	{
		echo "no_image_uploaded!";
	}
	else
	{
		if (isset($_POST['cWeek']))
		{
			$week_count = $_POST['cWeek'];
		}
		// params about my file
		$prefix 			= "img_";
		$destination 		= "../img/uploads/";
		$img_name 			= $_FILES['file']['name'];
		$img_size 			= $_FILES['file']['size'];
		$img_temp			= $_FILES['file']['tmp_name'];
		$target 			= $destination . $prefix . $img_name;

		// i want to track this in the DB as well
		$logging = mysqli_query($connect,"INSERT INTO picture (week_number, picture_path, picture_taken) VALUES ('$week_count','$target','1')");

		// go ahead and move the fucker
		move_uploaded_file($img_temp, $target);
	}

}



?>

