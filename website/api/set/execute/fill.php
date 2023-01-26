<?php
if(isset($_POST['id'])){
		try {
			$message = shell_exec('/usr/bin/python /var/www/html/api/set/execute/scripts/fill.py 0:5000');
			echo json_encode(array('success'=> true, 'message' => $message, 'remainingTime'=> 5000 ));
			exit;
		} catch (Exception $e) {
			echo json_encode(array('success'=> false, 'error' => $e->getMessage()));
			exit;
		}
}
