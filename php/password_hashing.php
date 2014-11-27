<?php

echo "baby steps";
echo "<br /><br />";

	$pass = "password";

	$staticSalt = "%$*^£@(de";

	function random_salt()
	{
		return substr(sha1(mt_rand()),4,20);
	}

echo "password: " . $pass;
echo "<br /><br />";

	$hash = md5($pass);

echo "md5 hash: " . $hash;
echo "<br /><br />";

	$hash = crc32($pass);

echo "crc32 hash: " . $hash;
echo "<br /><br />";

	$hash = sha1($pass);

echo "sha1 hash: " . $hash;
echo "<br /><br />";

	$hash = sha1($staticSalt . $pass);

echo "static salted sha1 hash: " . $hash;
echo "<br /><br />";

echo "random salt " . random_salt();
echo "<br /><br />";

	$hash = sha1(random_salt() . $pass);

echo "random salted sha1 hash: " . $hash;
echo "<br /><br />";

	$hash = password_hash($hash,PASSWORD_DEFAULT);

echo "password_hash: " . $hash;
echo "<br /><br />";
?>