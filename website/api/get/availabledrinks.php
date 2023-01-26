<?php
header("Content-Type:application/json");
require_once "../../includes/db.php";
echo json_encode(get_availabledrinks2());
