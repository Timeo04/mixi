<?php
header('Content-Type: application/json');
require_once "../../../includes/db.php";
if(!isset($_POST['basedrink'])){
    http_response_code(400);
    echo '{"status":"error","error":"parameter_unset"}';
    exit;
}
$id = set_add_basedrink($_POST["basedrink"]);
if ($id!=false){
    echo '{"status":"ok","id":'.$id.'}';
}else{
    echo '{"status":"error"}';
}
