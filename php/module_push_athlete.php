<?php


$name = $_POST['name'];
$sex = $_POST['sex'];
$weight = $_POST['weight'];
$height = $_POST['height'];
$bmr = $_POST['bmr'];
$acn = $_POST['acn'];

$host = "localhost";
$username = "root";
$password = "";
$database = "wholegrain";

$connect = mysqli_connect($host,$username,$password,$database);

mysqli_query($connect,"INSERT INTO athlete (name,sex,weight,height,bmr,acn) VALUES ('$name','$sex','$weight','$height','$bmr','$acn')");

?>