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
			'subject' => $_POST['subject']
			'message' => $_POST['message'],
			'posted_on' => date('Y-m-d H:i:s')
		);
	}
}