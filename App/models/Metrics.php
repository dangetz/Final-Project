<?php

class Metrics {
  public $turbineId;
  public $capacity;
  public $rampUpTime;
  public $maintenanceInterval;
  public $totalStarts;
  public $totalFiredHours;

  public function __construct($data) {
    $this ->turbineId = $data['turbineId'];
    $this ->capacity = $data['capacity'];
    $this ->rampUpTime = $data['rampUpTime'];
    $this ->maintenanceInterval = $data['maintenanceInterval'];
    $this ->totalStarts = $data['totalStarts'];
    $this ->totalFiredHours = $data['totalFiredHours'];
  }

  public static function fetchMetrics() {
    // 1. Connect to database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM turbinesCombined';
    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute();

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theMetrics = new Metrics($row);
      array_push($arr, $theMetrics);
    }

    return $arr;
  }
}
