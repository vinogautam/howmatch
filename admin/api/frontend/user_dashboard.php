<?php
function hm_user_dashboard(){
	$data = array();
	$data['applied_jobs'] = get_count("select * from job_applicants where user_id = ".$_POST['user_id']);
	$data['shortlisted_jobs'] = get_count("select * from job_applicants where is_shortlisted = 1 and user_id = ".$_POST['user_id']);
	$data['reviews'] = get_count("select * from reviews where user_id = ".$_POST['user_id']);
	$data['views'] = get_count("select * from reviews where user_id = ".$_POST['user_id'].' group_by ');
	$res = get_results("select * from skills");
	return array('status' => 'Success', 'data' => $data);
}

function hm_user_profile(){
	if(isset($_POST['profile'])){
		$profile = $_POST['profile'];
		foreach ($profile as $key => $value) {
			set_meta('users', $_POST['user_id'], $key, $value);
		}
	}
	
	return array('status' => 'Success', 'data' => get_all_meta('users', $_POST['user_id']), 'msg' => 'Profile updated Successfully');
}

function hm_user_applied_job(){
	
}