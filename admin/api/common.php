<?php
function insert($table, $array){
	global $db;

	$keys = implode(",", array_keys($array));
	$values = implode("','", array_values($array));
	echo $sql = "INSERT INTO $table ($keys) VALUES ('$values')";
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

function get_all_meta($table, $id){
	$res = get_results("select * from meta_data where ref = '$table' and ref_id = $id");
	$new_res = array();

	foreach ($res as $key => $value) {
		$data = @unserialize($value['meta_value']);
		if ($data !== false) {
		    $new_res[$value['meta_name']] = $data;
		} else {
		    $new_res[$value['meta_name']] = $value['meta_value'];
		}
	}
	return $new_res;
}

function get_meta($table, $id, $name){
	$res = get_row("select * from meta_data where ref = '$table' and meta_name = '$name' and ref_id = $id");
	$value = isset($res['meta_value']) ? $res['meta_value'] : '';
	$data = @unserialize($value);
	if ($data !== false) {
	    return $data;
	} else {
	    return $value;
	}
}

function set_meta($table, $id, $name, $value){
	$res = get_row("select * from meta_data where ref = '$table' and meta_name = '$name' and ref_id = $id");

	$value = is_array($value) ? serialize($value) : $value;

	if(isset($res['id'])){
		update('meta_data', array('meta_value' => $value), array('id' => $res['id']));
	} else {
		insert('meta_data', array('ref' => $table, 'ref_id' => $id, 'meta_name' => $name, 'meta_value' => $value));
	}
}

function hm_test_meta(){
	echo '<pre>';
	echo get_meta('users', 1, 'first_name');
	set_meta('users', 1, 'roles', array('a', 'b'));
	print_r(get_meta('users', 1, 'roles'));
	set_meta('users', 1, 'roles', array('b', 'c'));
	print_r(get_meta('users', 1, 'roles'));
	print_r(get_all_meta('users', 1));
}