<?php
function insert($table, $array){
	global $db;

	$keys = implode(",", array_keys($array));
	$values = implode("','", array_values($array));
	$sql = "INSERT INTO $table ($keys) VALUES ('$values')";
	return mysqli_query($db, $sql);
}

function last_id(){
	global $db;
	return $db->insert_id;
}

function update($table, $array, $where){
	global $db;

	$arr = [];

	foreach ($array as $key => $value) {
		$arr[] = $key."='$value'";
	}

	$arr = implode(',', $arr);

	$arr2 = [];

	foreach ($where as $key => $value) {
		$arr2[] = $key."='$value'";
	}
	$arr2 = implode(',', $arr2);

	return mysqli_query($db, "UPDATE $table SET $arr where $arr2");
}

function delete($table, $array){
	global $db;

	$arr = [];

	foreach ($array as $key => $value) {
		$arr[] = $key."='$value'";
	}

	$arr = implode(',', $arr);

	return mysqli_query($db, "DELETE FROM $table where $arr");
}

function get_row($sql){
	global $db;
	$result = mysqli_query($db, $sql);
	$res = mysqli_fetch_assoc($result);
	return $res ? $res : array();
}

function get_results($sql){
	global $db;
	$result = mysqli_query($db, $sql);
	$res =  mysqli_fetch_all($result, MYSQLI_ASSOC);
	return $res ? $res : array();
}

function get_count($sql){
	global $db;
	$result = mysqli_query($db, $sql);
	return mysqli_num_rows($result);
}

function get_data_by_id($table, $id){
	return get_row("select * from $table where id = $id");
}