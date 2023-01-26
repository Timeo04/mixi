<?php
		try {
			$message = shell_exec('/usr/bin/python /var/www/html/api/set/execute/scripts/send.py motor_flush');
			echo json_encode(array('success'=> true, 'message' => $message, 'remainingTime'=> 21000 ));
			exit;
		} catch (Exception $e) {
			echo json_encode(array('success'=> false, 'error' => $e->getMessage()));
			exit;
		}
