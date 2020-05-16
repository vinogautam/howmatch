<?php

function hm_login(){

	$username = $_POST['username'];
	$password = md5($_POST['password']);

	$res = get_row("select * from users where (username = '$username' or email = '$username') and password = '$password'");

	if(isset($res['id'])){
		return array('status' => 'Success', 'data' => $res);
	} else {
		return array('status' => 'Error', 'msg' => 'Invalid Credentials');
	}
}

function hm_candidates(){
	$res = get_row("select * from users where user_type = 2");
	return array('status' => 'Success', 'data' => $res);
}

function hm_company(){
	$res = get_row("select * from users where user_type = 3");
	return array('status' => 'Success', 'data' => $res);
}