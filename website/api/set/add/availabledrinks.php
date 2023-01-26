<?php
header('Content-Type: application/json');
require_once "../../../includes/db.php";
if(!isset($_POST['basedrinkid']) || !isset($_POST['port']) || !isset($_POST['active']) || !isset($_POST['capacity']) || !isset($_POST['level'])){
    http_response_code(400);
    echo '{"status":"error","error":"parameter_unset"}';
    exit;
}
if (check_port($_POST["port"])){

$id = set_add_availabledrink($_POST['basedrinkid'], $_POST['port'], $_POST['active'], $_POST['capacity'], $_POST['level']);
if ($id!=false){
    echo '{"status":"ok","id":'.$id.'}';
}else{
    echo '{"status":"error"}';
}
}
else {
    echo '{"status":"error", "error": "port_used"}';}
