<?php
function user_dashboard(){
	$data = array();
	$data['applied_jobs'] = get_count("select * from job_applicants where user_id = ".$_POST['user_id']);
	$data['shortlisted_jobs'] = get_count("select * from job_applicants where is_shortlisted = 1 and user_id = ".$_POST['user_id']);
	$data['reviews'] = get_count("select * from reviews where user_id = ".$_POST['user_id']);
	$data['views'] = get_count("select * from reviews where user_id = ".$_POST['user_id'].' group_by ');
	$res = get_results("select * from skills");
	return array('status' => 'Success', 'data' => $data);
}