<?php
header('Content-Type: application/json');
require_once "../../../includes/db.php";
if(!isset($_POST['id'])){
    http_response_code(400);
    echo '{"status":"error","error":"parameter_unset"}';
    exit;
}
$row = set_delete_availabledrink($_POST['id']);
if ($row!=false){
    echo '{"status":"ok","affected_row":'.$row.'}';
}else{
    echo '{"status":"error";}';
}
