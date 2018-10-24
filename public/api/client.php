<?php

require '../../App/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'clientPost.php';
  exit;
}

// 1. Go to database and get all clients
$clients = Client::fetchClient();

// 2. Convert to JSON
$json = json_encode($clients, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
