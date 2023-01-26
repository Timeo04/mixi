<?php
		try {
			$message = shell_exec('/usr/bin/python /var/www/html/api/set/execute/scripts/send.py poweroff');
			echo json_encode(array('success'=> true, 'message' => $message, 'remainingTime'=> 5000 ));
			shell_exec('(sleep 20 && sudo shutdown now) &');
			exit;
		} catch (Exception $e) {
			echo json_encode(array('success'=> false, 'error' => $e->getMessage()));
			exit;
		}
