<?php
$db = mysqli_connect("localhost", "mixi_web", "JiJY17mkJEO0jfgy", "mixi");
define("NUM_PORTS", 5);
define("VOLUMEN", 250);
define("VOLUMENR", 10);
define("MOTOR_SPEED", 40);
$volumen = 250;
$volumenr = 10;
$speed = 40;

function get_drinks()
{
    global $db;
    $res = mysqli_query($db, "SELECT id, name, image, alcoholic, JSON_EXTRACT (content,'$[*].basedrinkid') as basedrinks, content FROM drink");
    $arrays =  mysqli_fetch_all($res, MYSQLI_ASSOC);
    foreach ($arrays as &$array) {
        $array['content'] = json_decode($array['content'], true);
        $array['basedrinks'] = json_decode($array['basedrinks'], true);
    }
    return $arrays;
}
function get_selected_drink($id)
{
    global $db;
    $stmt = mysqli_prepare($db, "SELECT *  FROM drink where id = ?");
    mysqli_stmt_bind_param($stmt, "s", $id);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    $res = mysqli_fetch_array($res, MYSQLI_ASSOC);
    return $res;
}

function set_add_basedrink($base)
{
    global $db;
    $stmt = mysqli_prepare($db, "INSERT INTO `basedrink` ( `name`) VALUES (?)");
    mysqli_stmt_bind_param($stmt, "s", $base);
    mysqli_stmt_execute($stmt);
    return mysqli_insert_id($db);
}

function set_delete_basedrink($baseid)
{
    global $db;
    $stmt = mysqli_prepare($db, "DELETE FROM `basedrink` WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $baseid);
    mysqli_stmt_execute($stmt);
    return mysqli_affected_rows($db);
}
function set_update_basedrink($baseid, $name)
{
    global $db;
    $stmt = mysqli_prepare($db, "UPDATE `basedrink` SET `name`= ? WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "si", $name, $baseid);
    mysqli_stmt_execute($stmt);
    return mysqli_affected_rows($db);
}

function get_basedrinks()
{
    global $db;
    $res = mysqli_query($db, "SELECT * FROM basedrink");
    return mysqli_fetch_all($res, MYSQLI_ASSOC);
}
function get_availabledrinks()
{
    global $db;
    $res = mysqli_query($db, "SELECT * FROM availabledrink WHERE active = true");
    $arrays =  mysqli_fetch_all($res, MYSQLI_ASSOC);
    foreach ($arrays as &$array) {

        $array = intval($array['basedrinkid']);
    }
    return $arrays;
}
function get_availabledrinks2()
{
    global $db;
    $res = mysqli_query($db, "SELECT availabledrink.id, availabledrink.basedrinkid, availabledrink.port, availabledrink.capacity, availabledrink.level, basedrink.name FROM availabledrink LEFT JOIN basedrink ON availabledrink.basedrinkid = basedrink.id WHERE availabledrink.active = true ORDER BY availabledrink.port asc");
    $arrays =  mysqli_fetch_all($res, MYSQLI_ASSOC);
    foreach ($arrays as &$array) {

        $array['basedrinkid'] = intval($array['basedrinkid']);
    }
    return $arrays;
}
function set_add_availabledrink($baseid, $port, $active, $capacity, $level)
{
    global $db;
    $stmt = mysqli_prepare($db, "INSERT INTO `availabledrink` ( `basedrinkid`, `port`, `active`, `capacity`, `level` ) VALUES (?,?,?,?,?)");
    mysqli_stmt_bind_param($stmt, "iiiii", $baseid, $port, $active, $capacity, $level);
    mysqli_stmt_execute($stmt);

    return mysqli_insert_id($db);
}
function set_delete_availabledrink($availableid)
{
    global $db;
    $stmt = mysqli_prepare($db, "DELETE FROM `availabledrink` WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $availableid);
    mysqli_stmt_execute($stmt);
    return mysqli_affected_rows($db);
}
function check_port($port)
{
    global $db;
    $stmt = mysqli_prepare($db, "SELECT * FROM `availabledrink` WHERE port  = ?");
    mysqli_stmt_bind_param($stmt, "i", $port);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    return mysqli_num_rows($res) == 0;
}
function set_update_availabledrink($id, $baseid, $port, $active, $capacity, $level)
{
    global $db;
    $stmt = mysqli_prepare($db, "UPDATE `availabledrink` SET `basedrinkid`= ?, `port`= ?, `active`=?, `capacity`=?, `level`=? WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "iiiiii", $baseid, $port, $active, $capacity, $level, $id);
    mysqli_stmt_execute($stmt);
    return mysqli_affected_rows($db);
}
function set_update_availabledrink2($id, $baseid)
{
    global $db;
    $stmt = mysqli_prepare($db, "UPDATE `availabledrink` SET `basedrinkid`= ? WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "ii", $baseid, $id);
    mysqli_stmt_execute($stmt);
    return mysqli_affected_rows($db);
}
function check_port2($port, $id)
{

    global $db;
    $stmt = mysqli_prepare($db, "SELECT id FROM `availabledrink` WHERE port  = ? AND active = 1");
    mysqli_stmt_bind_param($stmt, "i", $port);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($res) == 0) {
        return true;
    } else {

        $data = mysqli_fetch_array($res);
        if ($data["id"] == $id) {
            return true;
        } else {
            return false;
        }
    }
}
function calculate_rotation($grösse)
{
    global $volumen, $volumenr;

    if ($grösse == 1) {
        $volumen = 20;
    }
    if ($grösse == 2) {
        $volumen = 100;
    }
    if ($grösse == 3) {
        $volumen = 250;
    }
    if ($grösse == 4) {
        $volumen = 300;
    }
    $rotation = $volumen / $volumenr;
    return $rotation;
}
function get_port($id)
{
    global $db;
    $stmt = mysqli_prepare($db, "SELECT port FROM availabledrink where basedrinkid = ? AND active = true");
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    $res = mysqli_fetch_array($res, MYSQLI_ASSOC);

    return $res;
}
function get_id($id)
{
    global $db;
    $stmt = mysqli_prepare($db, "SELECT id FROM availabledrink where basedrinkid = ? AND active = true");
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    $res = mysqli_fetch_array($res, MYSQLI_ASSOC);
    return $res;
}
function get_time($rotation)
{
    global $speed;
    $ms = intval($rotation / $speed * 60 * 1000);
    return ($ms);
}
function get_capacity($id)
{
    global $db;
    $stmt = mysqli_prepare($db, "SELECT capacity FROM availabledrink WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    $res = mysqli_fetch_array($res, MYSQLI_ASSOC);
    return $res["capacity"];
}
function update_capacity($id, $capacity)
{
    global $db;
    $stmt = mysqli_prepare($db, "UPDATE availabledrink SET `capacity`= ? WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "ii", $capacity, $id);
    mysqli_stmt_execute($stmt);
    return mysqli_affected_rows($db);
}
function new_capacity($rotation)
{
    global $volumenr;
    $capacity = $volumenr * $rotation;
    // echo $capacity;
    return $capacity;
}

function set_add_drink($name,$content,$alcoholic)
{
    global $db;
    $stmt = mysqli_prepare($db, "INSERT INTO `drink` ( `name`, `content`, `alcoholic`) VALUES (?,?,?)");
    mysqli_stmt_bind_param($stmt, "ssi", $name, $content, $alcoholic);
    mysqli_stmt_execute($stmt);

    return mysqli_insert_id($db);
}
function set_delete_drink($id){
    global $db;
    $stmt = mysqli_prepare($db, "DELETE FROM `drink` WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    return mysqli_affected_rows($db);
}
function set_update_drink($name,$image,$content,$alcoholic,$id){
    global $db;
    $stmt = mysqli_prepare($db, "UPDATE `drink` SET `name`= ?, `image`= ?, `content`=?, `alcoholic`=?  WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "ssssi", $name, $image, $content, $alcoholic, $id);
    mysqli_stmt_execute($stmt);
    return mysqli_affected_rows($db);
} 
