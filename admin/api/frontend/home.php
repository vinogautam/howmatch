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

		insert('contact_request', $arr);
	}

	return array('status' => 'Success');
}

function get_home_data(){
	$data = array();
	$res = get_results("select * from jobs where status = 1");
	foreach ($res as $key => $value) {
		$data[] = array('title' => $value['title'], 'type' => 'job');
	}

	$res = get_results("SELECT *, (SELECT count(*) from jobs where jobs.category = category.id) as cnt FROM `category` where status = 1");
	foreach ($res as $key => $value) {
		if($value['cnt']){
			$data[] = array('id' => $value['id'], 'title' => $value['name'], 'type' => 'category', 'cnt' => $value['cnt'], 'image' => $value['image']);
		}
	}

	$location = array();

	$res = get_results("select * from jobs where is_featured = 1 and status = 1 order by id desc");
	$featured_jobs = [];
	foreach ($res as $key => $value) {
		$value['company_name'] = get_meta('users', $value['posted_by'], 'company_name');
		$value['company_image'] = get_meta('users', $value['posted_by'], 'company_image');

		$arr = array('industry', 'career_level', 'qualification', 'job_level', 'keywords', 'location');

		foreach ($arr as $key => $val) {
			$value[$val] = get_relative_data('jobs', $val, $value['id']);
		}

		$value['title'] = stripslashes($value['title']);
		$value['description'] = stripslashes($value['description']);

		$featured_jobs[] = $value;
	}

	$res = get_results("select * from users where is_featured = 1 and user_type = 2 and status = 1 ");
	$featured_company = array();
	foreach ($res as $key => $value) {
		$value['profile'] = get_all_meta('users', $value['id']);
		unset($value['password']);
		$featured_company[] = $value;
	}

	return array('status' => 'Success', 'data' => $data, 'location' => $location, 'featured_jobs' => array_chunk($featured_jobs, 4), 'featured_company' => $featured_company);
}