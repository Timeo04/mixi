<?php
header('Content-Type: application/json');
require_once "../../../includes/db.php";
// if(!isset($_POST['id']) && !isset($_POST['name'])){
if (!isset($_POST['id']) && !isset($_POST['name'])) {
    http_response_code(400);
    // var_dump($_POST);
    // echo json_encode($_POST);
    echo '{"status":"error","error":"parameter_unset"}';
    exit;
}
$row = set_update_basedrink($_POST['id'], $_POST['name']);
if ($row != false) {
    echo '{"status":"ok","affected_row":' . $row . '}';
} else {
    echo '{"id":"'.$_POST['id'].'","name":"'.$_POST['name'].'","status":"error"}';
}
