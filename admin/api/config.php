<?php
//error_reporting(0);
$hostname		=	"localhost";
$username		=	"root";
$password	    =	"";
$database		=	"howmatch_new";

global $db;
$db = mysqli_connect($hostname, $username, $password, $database) or die("not Server not connected");