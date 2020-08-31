<?php
/* Admin Side*/
function hm_jobs(){
	$res = get_results("select * from jobs");

	$new = [];
	foreach ($res as $key => $value) {
		$arr = array('industry', 'career_level', 'qualification', 'job_level', 'tags');

		foreach ($arr as $key => $val) {
			$value[$val] = get_relative_data('jobs', $val, $value['id']);
		}
		
		$value['title'] = stripslashes($value['title']);
		$value['description'] = stripslashes($value['description']);

		$new[] = $value;
	}
	return array('status' => 'Success', 'data' => $new);
}

function hm_save_job(){
	$data = $_POST;

	$data['title'] = addslashes($data['title']);
	$data['description'] = addslashes($data['description']);

	$data['is_featured'] = isset($data['is_featured']) ? 1 : 0;

	if(isset($data['id'])){
		delete('relative_data', array('ref_table' => 'jobs', 'ref_id' => $data['id']));
		$id = $data['id'];
		unset($data['id']);
		update('jobs', $data, array('id' => $id));
		$ret = array('status' => 'Success', 'msg' => 'Job Updated Successfully');
	} else {
		$data['posted_on'] = date('Y-m-d H:i:s');
		$data['status'] = 1;
		insert('jobs', $data);
		$id = last_id();
		$ret = array('status' => 'Success', 'msg' => 'Job Added Successfully');
	}

	$arr = array('industry', 'career_level', 'qualification', 'job_level', 'tags');

	foreach ($arr as $key => $value) {
		if(isset($data[$value]) && is_array($data[$value])){
			set_relative_data('jobs', $value, $id, $data[$value]);
		}
	}

	return $ret
}

function hm_delete_job(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('jobs', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Job Deleted Successfully');
}

function hm_change_status(){
	update('jobs', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Job Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Job Unpublished Successfully');
	}
}