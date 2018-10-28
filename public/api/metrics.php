<?php

require '../../App/common.php';

$turbineDeployedId = intval($_GET['turbineDeployedId'] ?? 0);

// 1. Go to database and get all clients
$metrics = Metrics::fetchMetrics($turbineDeployedId);

// 2. Convert to JSON
$json = json_encode($metrics, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
