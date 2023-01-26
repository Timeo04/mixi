<?php
header('Content-type: application/json');
//var_dump($_GET);

if(isset($_POST['action'])){
	if($_POST['action']=='on'){
		try {
			$message = shell_exec('/usr/bin/python /var/www/html/api/set/execute/scripts/led.py on');
			echo json_encode(array('success'=> true, 'message' => $message ));
			exit;
		} catch (Exception $e) {
			echo json_encode(array('success'=> false, 'error' => $e->getMessage()));
			exit;
		}
	}else if($_POST['action']=='off'){
		try {
			$message = shell_exec('/usr/bin/python /var/www/html/api/set/execute/scripts/led.py off');
			echo json_encode(array('success'=> true, 'message' => $message ));
			exit;
		} catch (Exception $e) {
			echo json_encode(array('success'=> false, 'error' => $e->getMessage()));
			exit;
		}
	}else if($_POST['action']=='rainbow_on'){
		try {
			$message = shell_exec('/usr/bin/python /var/www/html/api/set/execute/scripts/led.py rainbow_on');
			echo json_encode(array('success'=> true, 'message' => $message ));
			exit;
		} catch (Exception $e) {
			echo json_encode(array('success'=> false, 'error' => $e->getMessage()));
			exit;
		}
	}else if($_POST['action']=='rainbow_off'){
		try {
			$message = shell_exec('/usr/bin/python /var/www/html/api/set/execute/scripts/led.py rainbow_off');
			echo json_encode(array('success'=> true, 'message' => $message ));
			exit;
		} catch (Exception $e) {
			echo json_encode(array('success'=> false, 'error' => $e->getMessage()));
			exit;
		}
	}else if($_POST['action']=='color'&&isset($_POST['color'])){
		try {
			if(strlen($_POST['color'])==7){
				$color = substr($_POST['color'],1,6);
			}else{
				$color = $_POST['color'];
			}
			$message = shell_exec('/usr/bin/python /var/www/html/api/set/execute/scripts/led.py color_'.$color);
			echo json_encode(array('success'=> true, 'message' => $message ));
			exit;
		} catch (Exception $e) {
			echo json_encode(array('success'=> false, 'error' => $e->getMessage()));
			exit;
		}
	}else if($_POST['action']=='rainbow_speed'&&isset($_POST['speed'])){
		try {
			$speed = intval($_POST['speed']);
			$message = shell_exec('/usr/bin/python /var/www/html/api/set/execute/scripts/led.py rainbow_speed_'.$speed);
			echo json_encode(array('success'=> true, 'message' => $message ));
			exit;
		} catch (Exception $e) {
			echo json_encode(array('success'=> false, 'error' => $e->getMessage()));
			exit;
		}
	}
}

