<?php

class SiteSpecific {
  public $siteId;
  public $clientId;
  public $siteName;
  public $siteDescription;
  public $primaryContact;
  public $capacity;
  public $commercialDate;
  public $addrLine1;
  public $addrLine2;
  public $addrCity;
  public $addrState;
  public $addrZip;
  public $addrCountry;

  public function __construct($data) {
    $this ->siteId = $data['siteId'];
    $this ->clientId = $data['clientId'];
    $this ->siteName = $data['siteName'];
    $this ->siteDescription = $data['siteDescription'];
    $this ->primaryContact = $data['primaryContact'];
    $this ->capacity = $data['capacity'];
    $this ->commercialDate = $data['commercialDate'];
    $this ->addrLine1 = $data['addrLine1'];
    $this ->addrLine2 = $data['addrLine2'];
    $this ->addrCity = $data['addrCity'];
    $this ->addrState = $data['addrState'];
    $this ->addrZip = $data['addrZip'];
    $this ->addrCountry = $data['addrCounty'];
  }

  public static function fetchSite(int $siteId) {
    // 1. Connect to database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM site WHERE siteId=?';
    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute(
        [$siteId]
    );

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSite = new SiteSpecific($row);
      array_push($arr, $theSite);
    }

    return $arr;
  }
}
