<?php
function hm_company_jobs(){
	$res = get_results("select * from jobs where posted_by = ".$_POST['user_id']);
	return array('status' => 'Success', 'data' => $res);
}

function hm_view_company(){
	
}

function hm_company_profile(){
	if(isset($_POST['company_name'])){
		foreach ($_POST as $key => $value) {
			set_meta('users', $_POST['user_id'], $key, $value);
		}
		update(array('slug' => $_POST['slug']), array('id' => $_POST['user_id']));
	}
	
	return array('status' => 'Success', 'data' => get_all_meta('users', $_POST['user_id']), 'msg' => 'Profile updated Successfully');
}

function hm_company_dashboard(){
	$data = array();
	$data['applied_jobs'] = get_count("select * from job_applicants where user_id = ".$_POST['user_id']);
	$data['shortlisted_jobs'] = get_count("select * from job_applicants where is_shortlisted = 1 and user_id = ".$_POST['user_id']);
	$data['reviews'] = get_count("select * from reviews where type = 'user' and ref_id = ".$_POST['user_id']." group by user_id");
	$data['views'] = get_count("select * from views where type = 'user' and ref_id = ".$_POST['user_id']." group by user_id");
	$data['jobs'] = get_results("SELECT a.*, b.applied_on, b.shortlisted_on, b.shortlisted_on FROM `jobs` as a LEft join job_applicants as b on a.id = b.job_id WHERE b.user_id = ".$_POST['user_id']." order by b.applied_on asc limit 0,5");
	return array('status' => 'Success', 'data' => $data);
}