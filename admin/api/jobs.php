<?php
/* Admin Side*/
function hm_jobs(){
	$res = get_results("select * from jobs");

	$new = [];
	foreach ($res as $key => $value) {
		if(isset($value['industry'])){
			$value['industry'] = unserialize(stripslashes($value['industry']));
		}
		if(isset($value['career_level']) && $value['career_level']){
			$value['career_level'] = unserialize(stripslashes($value['career_level']));
		}
		if(isset($value['qualification']) && $value['qualification']){
			$value['qualification'] = unserialize(stripslashes($value['qualification']));
		}
		if(isset($value['job_level']) && $value['job_level']){
			$value['job_level'] = unserialize(stripslashes($value['job_level']));
		}
		if(isset($value['tags']) && $value['tags']){
			$value['tags'] = unserialize(stripslashes($value['tags']));
		}
		
		$value['title'] = stripslashes($value['title']);
		$value['description'] = stripslashes($value['description']);

		$new[] = $value;
	}
	return array('status' => 'Success', 'data' => $new);
}

function hm_save_job(){
	$data = $_POST;
	
	if(isset($data['industry'])){
		$data['industry'] = addslashes(serialize($data['industry']));
	}
	if(isset($data['career_level'])){
		$data['career_level'] = addslashes(serialize($data['career_level']));
	}
	if(isset($data['qualification'])){
		$data['qualification'] = addslashes(serialize($data['qualification']));
	}
	if(isset($data['job_level'])){
		$data['job_level'] = addslashes(serialize($data['job_level']));
	}
	if(isset($data['tags'])){
		$data['tags'] = addslashes(serialize($data['tags']));
	}

	$data['title'] = addslashes($data['title']);
	$data['description'] = addslashes($data['description']);

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		//print_r($data);
		update('jobs', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Job Updated Successfully');
	} else {
		$data['posted_on'] = date('Y-m-d H:i:s');
		$data['status'] = 1;
		insert('jobs', $data);
		return array('status' => 'Success', 'msg' => 'Job Added Successfully');
	}
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