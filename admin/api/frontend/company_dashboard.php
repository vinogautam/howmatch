<?php
function hm_company_jobs(){
	$res = get_results("select * from jobs where posted_by = ".$_POST['user_id']." order by id desc");

	$new = [];
	foreach ($res as $key => $value) {
		$value['company_name'] = get_meta('users', $value['posted_by'], 'company_name');
		$value['company_image'] = get_meta('users', $value['posted_by'], 'company_image');
		$value['no_of_applicants'] = get_count("select * from job_applicants where job_id = ".$value['id']." and is_applied = 1");

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

function hm_view_company(){

	$data = get_all_meta('users', $_POST['id']);
	$data['basic'] = get_data_by_id('users', $_POST['id']);

	return array('status' => 'Success', 'data' => $data);
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

function hm_get_Applicants(){
	$applicants = get_results("select * from job_applicants where job_id = ".$_POST['job_id']." and is_applied = 1");
	$new = [];
	foreach ($applicants as $key => $value) {
		$dd = array('id' => $value['user_id']);
		$arr = array('profile_image', 'name', 'location');
		foreach ($arr as $key => $val) {
			$dd[$val] = get_meta('users', $value['user_id'], $val);
		}
		$new[] = $dd;
	}

	return array('status' => 'Success', 'data' => $new);
}

function hm_company_shortlist(){
	$applicants = get_results("select * from job_applicants where is_selected = 1 and selected_by = ".$_POST['user_id']);
	$new = [];
	foreach ($applicants as $key => $value) {
		$dd = array('id' => $value['user_id']);
		$arr = array('profile_image', 'name', 'location');
		foreach ($arr as $key => $val) {
			$dd[$val] = get_meta('users', $value['user_id'], $val);
		}
		$new[] = $dd;
	}

	return array('status' => 'Success', 'data' => $new);
}

function hm_remove_shortlist(){
	update('job_applicants', array('is_selected' => 0), array('user_id' => $_POST['user'], 'selected_by' => $_POST['emp']));

	return array('status' => 'Success');
}