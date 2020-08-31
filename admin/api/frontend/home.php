<?php
function home(){
	$data = array();
	
	$data['featured_jobs'] = get_results("SELECT * from jobs where is_featured = 1 and DATEDIFF('".date('Y-m-d')."', posted_on) <= 7 ");
	$data['featured_company'] = get_results("SELECT * from users where user_type = 2 and is_featured = 1");
	$data['popular_category'] = get_results("SELECT c.*, count(j.id) as cnt FROM `category` as c left join jobs as j on c.id = j.category GROUP by j.category order by cnt desc");
	return array('status' => 'Success', 'data' => $data);
}

function post_query(){
	if(isset($_POST['name'])){
		$arr = array(
			'name' => $_POST['name'],
			'email' => $_POST['email'],
			'subject' => $_POST['subject'],
			'message' => $_POST['message'],
			'posted_on' => date('Y-m-d H:i:s')
		);
	}

	return array('status' => 'Success');
}

function hm_featured_company(){
	$res = get_results("select * from users where is_featured = 1 and user_type = 2 and status = 1 ");
	$new_res = array();
	foreach ($res as $key => $value) {
		$value['profile'] = get_all_meta('users', $value['id']);
		unset($value['password']);
		$new_res[] = $value;
	}
	return array('status' => 'Success', 'data' => $new_res);
}

function hm_featured_job(){
	$res = get_results("select * from jobs where is_featured = 1 and status = 1 order by id desc");
	$new = [];
	foreach ($res as $key => $value) {
		$value['company_name'] = get_meta('users', $value['posted_by'], 'company_name');
		$value['company_image'] = get_meta('users', $value['posted_by'], 'company_image');

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

	$salary = get_row("SELECT max(salary) as maxsalary, min(salary) as minsalary FROM `jobs`");

	return array('status' => 'Success', 'data' => $new, 'salary' => $salary);
}

function get_search_list(){
	$data = array();
	$res = get_results("select * from jobs where status = 1");
	foreach ($res as $key => $value) {
		$data[] = array('title' => $value['title'], 'type' => 'job');
	}

	$res = get_results("SELECT *, (SELECT count(*) from jobs where jobs.category = category.id) as cnt FROM `category` where status = 1");
	foreach ($res as $key => $value) {
		if($value['cnt']){
			$data[] = array('title' => $value['name'], 'type' => 'category', 'cnt' => $value['cnt'], 'image' => $value['image']);
		}
	}

	return array('status' => 'Success', 'data' => $data);
}