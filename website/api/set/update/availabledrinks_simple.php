<?php
header('Content-Type: application/json');
require_once "../../../includes/db.php";
if (!isset($_POST['id']) || !isset($_POST['basedrinkid'])) {
    http_response_code(400);
    echo '{"status":"error","error":"parameter_unset"}';
    exit;
}

$row = set_update_availabledrink2($_POST["id"], $_POST["basedrinkid"]);
if ($row != false) {
    echo '{"status":"ok","affected_row":' . $row . '}';
} else {
    echo '{"id":"' . $_POST['id'] . '","status":"error"}';
}
