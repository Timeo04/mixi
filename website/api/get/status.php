<?php
header('Content-type: application/json');

try {
	$message = shell_exec('/usr/bin/python /var/www/html/api/get/scripts/status.py');
	$message_json = json_decode($message,true);
	$message_json['success']=true;
	echo json_encode(array('success'=> true, 'status' => $message_json, 'statustext' => $message ));
	exit;
} catch (Exception $e) {
	echo json_encode(array('success'=> false, 'error' => $e->getMessage()));
	exit;
}


