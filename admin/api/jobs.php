<?php
/* Admin Side*/
function hm_jobs(){
	$res = get_results("select * from jobs");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_job(){
	$data = $_POST;
	
	if(isset($data['industry'])){
		$data['industry'] = serialize($data['industry']);
	}
	if(isset($data['career_level'])){
		$data['career_level'] = serialize($data['career_level']);
	}
	if(isset($data['qualification'])){
		$data['qualification'] = serialize($data['qualification']);
	}

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
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