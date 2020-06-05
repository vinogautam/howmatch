<?php

function hm_upload(){
	$name = strtotime('now').rand(1111,9999).'.'.$_POST['ext'];
	$data = explode(";", $_POST['data'])[1];
	$data = base64_decode(explode("base64,", $data)[1]);
	file_put_contents("uploads/$name", $data);

	return array('status' => 'Success', 'data' => $name);
}