<?php
function hm_job_search(){
	$res = get_results("select * from jobs");
	$new = [];
	foreach ($res as $key => $value) {
		$value['company_name'] = get_meta('users', $value['posted_by'], 'company_name');
		$value['company_image'] = get_meta('users', $value['posted_by'], 'company_image');

		if(isset($value['industry'])){
			$value['industry'] = unserialize($value['industry']);
		}
		if(isset($value['career_level']) && $value['career_level']){
			$value['career_level'] = unserialize($value['career_level']);
		}
		if(isset($value['qualification']) && $value['qualification']){
			$value['qualification'] = unserialize($value['qualification']);
		}
		if(isset($value['job_level']) && $value['job_level']){
			$value['job_level'] = unserialize($value['job_level']);
		}
		if(isset($value['tags']) && $value['tags']){
			$value['tags'] = unserialize($value['tags']);
		}

		$value['title'] = stripslashes($value['title']);
		$value['description'] = stripslashes($value['description']);

		$new[] = $value;
	}

	$salary = get_row("SELECT max(salary) as maxsalary, min(salary) as minsalary FROM `jobs`");

	return array('status' => 'Success', 'data' => $new, 'salary' => $salary);
}

function hm_view_job(){
	$data = get_row("select * from jobs where id =". $_POST['id']);
	if(isset($data['industry'])){
		$data['industry'] = unserialize($data['industry']);
	}
	if(isset($data['career_level']) && $data['career_level']){
		$data['career_level'] = unserialize($data['career_level']);
	}
	if(isset($data['qualification']) && $data['qualification']){
		$data['qualification'] = unserialize($data['qualification']);
	}
	if(isset($data['job_level']) && $data['job_level']){
		$data['job_level'] = unserialize($data['job_level']);
	}
	if(isset($data['tags']) && $data['tags']){
		$data['tags'] = unserialize($data['tags']);
	}

	$data['title'] = stripslashes($data['title']);
	$data['description'] = stripslashes($data['description']);

	$data['category'] = get_data_by_id('category', $data['category']);

	$data['company_name'] = get_meta('users', $data['posted_by'], 'company_name');

	$data['shortlisted'] = false;
	$data['applied'] = false;
	if(isset($_POST['user_id'])){
		$res = get_results("select * from job_applicants where job_id = ".$_POST['id']." and user_id = ".$_POST['user_id']);

		if(count($res)){
			$data['shortlisted'] = $res[0]['is_shortlisted'] == 1;
			$data['applied'] = $res[0]['is_applied'] == 1;
		}
	}

	$data['no_of_views'] = get_count("select * from views where type = 'job' and ref_id = ".$_POST['id']);

	$data['no_of_applicants'] = get_count("select * from job_applicants where job_id = ".$_POST['id']." and is_applied = 1");

	return array('status' => 'Success', 'data' => $data);
}

function hm_shortlist_job(){
	$res = get_results("select * from job_applicants where job_id = ".$_POST['job']." and user_id = ".$_POST['user']);
	
	if(count($res)){
		$arr = array(
			'is_shortlisted' => 1,
			'shortlisted_on' => date('Y-m-d H:i:s')
		);
		update('job_applicants', $arr, array('id' => $res[0]['id']));
	} else {
		$arr = array(
			'job_id' => $_POST['job'],
			'user_id' => $_POST['user'],
			'is_shortlisted' => 1,
			'shortlisted_on' => date('Y-m-d H:i:s')
		);
		insert('job_applicants', $arr);
	}
	return array('status' => 'Success');
}

function hm_apply_job(){

	if(isset($_POST['resume_list'])){
		set_meta('users', $_POST['user'], 'resume_list', $_POST['resume_list']);
	}
	$res = get_results("select * from job_applicants where job_id = ".$_POST['job']." and user_id = ".$_POST['user']);
	
	if(count($res)){
		$arr = array(
			'is_applied' => 1,
			'applied_on' => date('Y-m-d H:i:s')
		);
		update('job_applicants', $arr, array('id' => $res[0]['id']));
	} else {
		$arr = array(
			'job_id' => $_POST['job'],
			'user_id' => $_POST['user'],
			'is_applied' => 1,
			'applied_on' => date('Y-m-d H:i:s')
		);
		insert('job_applicants', $arr);
	}
	return array('status' => 'Success');
}

function hm_page_view(){
	if(isset($_POST['user'])){
		if($_POST['user'] != -1){
			$res = get_count("select * from views where type = 'job' and ref_id = ".$_POST['job']." and user_id = ".$_POST['user']);
			if($res == 0){
				$arr = array(
					'type' => 'job',
					'ref_id' => $_POST['job'],
					'user_id' => $_POST['user'],
					'view_on' => date('Y-m-d H:i:s')
				);
				insert('views', $arr);
			}
		} else {
			$arr = array(
				'type' => 'job',
				'ref_id' => $_POST['job'],
				'user_id' => $_POST['user'],
				'view_on' => date('Y-m-d H:i:s')
			);
			insert('views', $arr);
		}
	}	
	return array('status' => 'Success');
}