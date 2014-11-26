<?php

$password = "cheese";

$hash = password_hash($password,PASSWORD_DEFAULT);

$correct = "cheese";

$incorrect = "iwefhweof";

$test1 = password_verify($hash,$incorrect);

echo "************<br />";
echo "plaintext password = " . $password . "<br />";
echo "************<br />";
echo "hashed password = " . $hash . "<br />";
echo "************<br />";
echo $test1;
echo "************<br />";
echo "************<br />";
echo "************<br />";
?>