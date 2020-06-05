<?php

$array = array('config', 'common', 'jobs', 'users','category', 'package', 'skills', 'education', 'industry','joblevel','benefits', 'location', 'language', 'designation','pages', 'frontend/company_dashboard', 'frontend/user_dashboard', 'upload');

foreach ($array as $key => $value) {
	include $value.'.php';
}

$_POST = (array) json_decode(file_get_contents('php://input'));

if(isset($_GET['debug'])){
	echo '<pre>';
	print_r($_POST);
}

if(isset($_GET['action'])){
	$data = $_GET['action']();
	if(isset($_GET['debug'])){
		echo '<pre>';
		print_r($data);
	} else {
		echo json_encode($data);
	}
}