<?php
function hm_job_search(){
	$res = get_results("select * from jobs");
	$new = [];
	foreach ($res as $key => $value) {
		$value['company_name'] = get_meta('users', $value['posted_by'], 'company_name');
		
		$new[] = $value;
	}

	$salary = get_row("SELECT max(salary) as maxsalary, min(salary) as minsalary FROM `jobs`");

	return array('status' => 'Success', 'data' => $res, 'salary' => $salary);
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
	if(isset($data['category']) && $data['category']){
		$data['category'] = unserialize($data['category']);
	}
	if(isset($data['tags']) && $data['tags']){
		$data['tags'] = unserialize($data['tags']);
	}

	$data['company_name'] = get_meta('users', $data['posted_by'], 'company_name');

	return array('status' => 'Success', 'data' => $res);
}