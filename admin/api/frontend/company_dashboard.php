<?php
function hm_company_jobs(){
	$res = get_results("select * from jobs where posted_by = ".$_POST['user_id']);
	return array('status' => 'Success', 'data' => $res);
}
