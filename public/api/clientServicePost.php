<?php
$client = new ClientService($_POST);
$clientService-> create();
echo json_encode($clientService);
