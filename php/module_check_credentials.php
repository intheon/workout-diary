<?php
require "db_conf.php";

$connect = mysqli_connect($host,$username,$password,$database);

if (isset($_POST['userToCheck']))
{
	$usr = mysqli_real_escape_string($connect,$_POST['userToCheck']);

	$result = checkUsername($usr);

	echo htmlspecialchars($result);

}

if (isset($_POST['username']) && isset($_POST['type']))
{
	if ($_POST['type'] == "register")
	{
		$clientSideUsername = $_POST['username'];

		$doesUserExist = checkUsername($clientSideUsername);

		if ($doesUserExist == "true")
		{
			echo htmlspecialchars("exists");
		}
		else if ($doesUserExist == "false")
		{
			createUser();
		}
	}
	else if ($_POST['type'] == "existing")
	{
		$clientSideUsername = mysqli_real_escape_string($connect,$_POST['username']);

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
				echo htmlspecialchars("incorrectpw");
			}
		}
		else if (!$doesUserExist)
		{
			// they need to register instead
			echo htmlspecialchars("nonexistent");
		}
	}
}

function createUser()
{ 
	global $connect;

	// vars about the user
		$username = mysqli_real_escape_string($connect,$_POST['username']);
		$plaintext_password = mysqli_real_escape_string($connect,$_POST['password']);
		$email = mysqli_real_escape_string($connect,$_POST['email']);
		$name = mysqli_real_escape_string($connect,$_POST['name']);
		$gender = mysqli_real_escape_string($connect,$_POST['gender']);
		$age = mysqli_real_escape_string($connect,$_POST['age']);
		$activity = mysqli_real_escape_string($connect,$_POST['activity']);
		$weight = mysqli_real_escape_string($connect,$_POST['weight']);
		$gym = mysqli_real_escape_string($connect,$_POST['gym']);
		$height = mysqli_real_escape_string($connect,$_POST['height']);
		$calories = mysqli_real_escape_string($connect,$_POST['calories']);
		$dateCreated = mysqli_real_escape_string($connect,$_POST['dateCreated']);
		$daysIn = mysqli_real_escape_string($connect,$_POST['daysIn']);

	// hash the users password. i dont need the plaintext anymore.
	$hashed = hashPassword($plaintext_password);

	// the idea here is to insert data into two tables. one is the generic info. one is the auth table.

	// the auth table will have a foreign key pointing to the record in the auth table.

	mysqli_query($connect,"INSERT INTO athlete (username,name,email,gender,age,activity,weight,height,calories,gym_visits_per_week) VALUES ('$username','$name','$email','$gender','$age','$activity','$weight','$height','$calories','$gym')");

	$newUsrID = mysqli_query($connect,"SELECT id FROM athlete WHERE username = '$username'");

	$id = mysqli_fetch_row($newUsrID);

	foreach ($id as $idActual)

	$createAuth = mysqli_query($connect,"INSERT INTO auth (username,password,athlete_id) VALUES ('$username','$hashed','$idActual')");

	$initialiseTiming = mysqli_query($connect,"INSERT INTO timings (week_number,date,days_in,user_name) VALUES (1,'$dateCreated','$daysIn','$username')");

	echo htmlspecialchars("show_login");
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
		return "true";
	}
	else if ($check->num_rows == 0)
	{
		return "false";
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
	echo htmlspecialchars("success");
}


?>