<?php
header('Content-Type: application/json');
require_once "../../../includes/db.php";
if(!isset($_POST['name']) || !isset($_POST['content']) || !isset($_POST['alcoholic'])){
    http_response_code(400);
    echo '{"status":"error","error":"parameter_unset"}';
    exit;
}

$content = stripslashes($_POST['content']);
// $content = json_encode($content);
// echo $content;
$id = set_add_drink($_POST['name'], $content, $_POST['alcoholic']);
if ($id!=false){
    echo '{"status":"ok","id":'.$id.'}';
}else{
    echo '{"status":"error"}';
}

