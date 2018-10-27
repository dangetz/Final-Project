<?php

require '../../App/common.php';

$siteId = intval($_GET['siteId']?? 0);

// 1. Go to database and get all clients
$sites = Site::fetchSite();

// 2. Convert to JSON
$json = json_encode($sites, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
