<?php

require '../../App/common.php';

if ($SERVER['REQUEST_METHOD'] == 'POST') {
  require 'clientServicePost.php';
  exit;
}

// 1. Go to database and get all clients
$clientService = ClientService::fetchComments();

// 2. Convert to JSON
$json = json_encode($clientService, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
