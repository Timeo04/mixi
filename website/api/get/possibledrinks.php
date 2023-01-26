<?php
header("Content-Type:application/json");
require_once "../../includes/db.php";
// echo json_encode(get_possibledrinks());
// echo json_encode(get_availabledrinks());
$drinks = get_drinks();
$available = get_availabledrinks();

echo json_encode(array_filter($drinks, "checkpossible"));
// foreach ($available as $values) {
//     foreach ($values as $value) {
//         if (in_array($value, $available)){

//         }
//     }

// }
function checkpossible($var){
    global $available;
    foreach ($var['basedrinks'] as $basedrink){
        
        if(!in_array($basedrink,$available)){
            return false;
        }
    }
    return true;
}
