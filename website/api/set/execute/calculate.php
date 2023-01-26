<?php

header("Content-Type: application/json; charset=UTF-8");
require_once "../../../includes/db.php";
if (isset($_POST["drink"]) && isset($_POST["size"])) {
    $drink = get_selected_drink($_POST["drink"]);
    $rotation =  calculate_rotation($_POST["size"]);

    $drinkcontent = (json_decode($drink["content"], true));
    $basedrinknum = count($drinkcontent);
    get_port(1);
    foreach ($drinkcontent as  &$drinkcontentcalc) {
        $drinkcontentcalc["rotation"] = round($rotation / 100 * $drinkcontentcalc["ratio"], 0);
        $drinkcontentcalc["port"] = get_port($drinkcontentcalc["basedrinkid"])["port"];
        $drinkcontentcalc["time"] = get_time($drinkcontentcalc["rotation"]);
        $id = get_id($drinkcontentcalc["basedrinkid"]);
        $capacity = get_capacity($id) - new_capacity($drinkcontentcalc["rotation"]);
        update_capacity($id, $capacity);
    }
    //var_dump($drinkcontent);
    $remainingTime = max(array_column($drinkcontent, 'time'))+1000;
    $wert = "";
    $count = 0;
    foreach ($drinkcontent as $drinkcontentw) {

        if ($count > 0) {
            $wert .= "_" . $drinkcontentw["port"] . ":" . $drinkcontentw["time"];
        } else {
            $wert .= $drinkcontentw["port"] . ":" . $drinkcontentw["time"];
        }
        $count++;
    }

    try {
        $message = shell_exec('/usr/bin/python /var/www/html/api/set/execute/scripts/fill.py ' . $wert);
        echo json_encode(array('success' => true, 'message' => $message, 'remainingTime' => $remainingTime));
        exit;
    } catch (Exception $e) {
        echo json_encode(array('success' => false, 'error' => $e->getMessage()));
        exit;
    }
} else {
    http_response_code(400);
    echo '{"status":"error","error":"parameter_unset"}';
    exit;
}
