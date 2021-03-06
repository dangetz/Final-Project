<?php

require '../../App/common.php';

// 1. Go to database and get all clients
$sensors = Sensor::fetchSensor();

// 2. Convert to JSON
$json = json_encode($sensors, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
