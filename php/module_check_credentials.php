<?php

$host = "localhost";
$username = "root";
$password = "";
$database = "wholegrain";

global $connect = mysqli_connect($host,$username,$password,$database);

if (isset($_POST['username']) && isset($_POST['type']))
{

	if ($_POST['type'] == "register")
	{
		$usr = $_POST['username'];

		$sql = mysqli_query($connect,"SELECT username FROM auth");

		$existing = array();

		while ($row = mysqli_fetch_assoc($sql))
		{
			$existing[] = $row['username'];
		}

		foreach ($existing as $pointer)
		{
			if ($usr == $pointer)
			{
				echo "exists";
				break;
			}
			else if ($usr != $pointer)
			{
				createUser();
				break;
			}
		}
	}
}

function createUser()
{
	$plaintext_password = $_POST['password'];
	$email = $_POST['email'];
	$hashed = hashPassword($plaintext_password);

	$createUsrSQL = mysqli_query($connect,"INSERT INTO auth (username,password,email) VALUES '$usr','$hashed','$email'");

}

function hashPassword($plaintext_password)
{
	return password_hash($plaintext_password,PASSWORD_DEFAULT);
}



?>