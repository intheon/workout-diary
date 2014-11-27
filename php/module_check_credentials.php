<?php

$host = "localhost";
$username = "root";
$password = "";
$database = "wholegrain";

$connect = mysqli_connect($host,$username,$password,$database);

if (isset($_POST['username']) && isset($_POST['type']))
{
	if ($_POST['type'] == "register")
	{
		$clientSideUsername = $_POST['username'];

		$doesUserExist = checkUsername($clientSideUsername);

		if ($doesUserExist == true)
		{
			echo "exists";
		}
		else if ($doesUserExist == false)
		{
			createUser();
		}
	}
	else if ($_POST['type'] == "existing")
	{
		$clientSideUsername = $_POST['username'];

		$doesUserExist = checkUsername($clientSideUsername);

		if ($doesUserExist)
		{
			// because they exist, need to 
			// check if password matches existing hash
			$isPasswordCorrect = checkPassword($clientSideUsername);

			if ($isPasswordCorrect == true)
			{
				logUserIn($clientSideUsername);
			}
			else if ($isPasswordCorrect == false)
			{
				echo "password_incorrect";
			}
		}
		else if (!$doesUserExist)
		{
			// they need to register instead
			echo "does_not";
		}
	}
}

function createUser()
{ 
	global $connect;
	$user = $_POST['username'];
	$plaintext_password = $_POST['password'];
	$email = $_POST['email'];
	$hashed = hashPassword($plaintext_password);
	$createUsrSQL = mysqli_query($connect,"INSERT INTO auth (username,password,email) VALUES ('$user','$hashed','$email')");
}

function hashPassword($plaintext_password)
{
	return password_hash($plaintext_password,PASSWORD_DEFAULT);
}

function checkUsername($clientSideUsername)
{
	global $connect;
	$check = mysqli_query($connect,"SELECT username FROM auth WHERE username = '$clientSideUsername'");

	if ($check->num_rows >= 1)
	{
		return true;
	}
	else if ($check->num_rows == 0)
	{
		return false;
	}
}

function checkPassword($clientSideUsername)
{
	global $connect;

	$plaintext_password = $_POST['password'];

	$checkPW = mysqli_query($connect,"SELECT password FROM auth WHERE username = '$clientSideUsername'");

	$var = mysqli_fetch_row($checkPW);

	foreach ($var as $row)

	if (!password_verify($plaintext_password,$row))
	{
		return false;
	}

	if (password_verify($plaintext_password,$row))
	{
		return true;
	}

}

function logUserIn($clientSideUsername)
{
	session_start();
	$_SESSION['username'] = $clientSideUsername;
	echo "success";
}


?>