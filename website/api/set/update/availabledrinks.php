<?php
header('Content-Type: application/json');
require_once "../../../includes/db.php";
if (!isset($_POST['id']) ||!isset($_POST['basedrinkid']) || !isset($_POST['port']) || !isset($_POST['active']) || !isset($_POST['capacity']) || !isset($_POST['level'])) {
    http_response_code(400);
    echo '{"status":"error","error":"parameter_unset"}';
    exit;
}
if (check_port2($_POST["port"], $_POST["id"])){
    
$row = set_update_availabledrink($_POST["id"],$_POST["basedrinkid"],$_POST["port"],$_POST["active"], $_POST["capacity"], $_POST["level"]);
if ($row != false) {
    echo '{"status":"ok","affected_row":' . $row . '}';
} else {
    echo '{"id":"'.$_POST['id'].'","status":"error"}';
}}
else{
    echo '{"status":"error", "error": "port_used"}';
}
