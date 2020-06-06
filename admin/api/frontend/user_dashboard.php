<?php
function hm_user_dashboard(){
	$data = array();
	$data['applied_jobs'] = get_count("select * from job_applicants where user_id = ".$_POST['user_id']);
	$data['shortlisted_jobs'] = get_count("select * from job_applicants where is_shortlisted = 1 and user_id = ".$_POST['user_id']);
	$data['reviews'] = get_count("select * from reviews where type = 'user' and ref_id = ".$_POST['user_id']." group by user_id");
	$data['views'] = get_count("select * from views where type = 'user' and ref_id = ".$_POST['user_id']." group by user_id");
	$data['jobs'] = get_results("SELECT a.*, b.applied_on, b.shortlisted_on, b.shortlisted_on FROM `jobs` as a LEft join job_applicants as b on a.id = b.job_id WHERE b.user_id = ".$_POST['user_id']." order by b.applied_on asc limit 0,5");
	return array('status' => 'Success', 'data' => $data);
}

function hm_user_profile(){
	if(isset($_POST['first_name'])){
		foreach ($_POST as $key => $value) {
			set_meta('users', $_POST['user_id'], $key, $value);
		}
	}
	
	return array('status' => 'Success', 'data' => get_all_meta('users', $_POST['user_id']), 'msg' => 'Profile updated Successfully');
}

function hm_user_applied_job(){
	$data = get_results("SELECT a.*, b.applied_on, b.is_shortlisted, b.shortlisted_on FROM `jobs` as a LEft join job_applicants as b on a.id = b.job_id WHERE b.user_id = ".$_POST['user_id']." order by b.applied_on asc");
	return array('status' => 'Success', 'data' => $data);
}

function hm_user_shortlist_job(){
	$data = get_results("SELECT a.*, b.applied_on, b.is_shortlisted, b.shortlisted_on FROM `jobs` as a LEft join job_applicants as b on a.id = b.job_id WHERE b.is_shortlisted = 1 and b.user_id = ".$_POST['user_id']." order by b.shortlisted_on");
	return array('status' => 'Success', 'data' => $data);
}

function hm_user_alerts(){
	$data = get_results("SELECT a.*, b.alert_on, b.is_read FROM `jobs` as a LEft join alerts as b on a.id = b.job_id WHERE b.user_id = ".$_POST['user_id']." order by b.alert_on");
	return array('status' => 'Success', 'data' => $data);
}