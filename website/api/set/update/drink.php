<?php
header('Content-Type: application/json');
require_once "../../../includes/db.php";
if (!isset($_POST['id']) ||!isset($_POST['name']) || !isset($_POST['image']) || !isset($_POST['content']) || !isset($_POST['alcoholic'])) {
    http_response_code(400);
    echo '{"status":"error","error":"parameter_unset"}';
    exit;
}

$row = set_update_drink($_POST["name"],$_POST["image"],$_POST["content"],$_POST["alcoholic"], $_POST["id"]);
if ($row != false) {
    echo '{"status":"ok","affected_row":' . $row . '}';
} else {
    echo '{"id":"'.$_POST['id'].'","status":"error"}';
}
