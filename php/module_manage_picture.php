<?php

require "db_conf.php";

if (!isset($_FILES['file']))
{
	echo "no_image_uploaded";
}
else
{

	
	$prefix 			= "img_";
	$destination 		= "C:/wamp/www/workout-diary/img/uploads/";
	$img_name 			= $_FILES['file']['name'];
	$img_size 			= $_FILES['file']['size'];
	$img_temp			= $_FILES['file']['tmp_name'];
	$target 			= $destination . $prefix . $img_name;

	move_uploaded_file($img_temp, $target);
}



?>

