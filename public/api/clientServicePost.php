<?php
$clientService = new ClientService($_POST);
$clientService-> createService();

echo json_encode($clientService);
