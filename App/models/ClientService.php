<?php
class ClientService
{
  public $commentId;
  public $client;
  public $notes;

  public function __construct($data) {
    $this->commentId = isset($data['commentId']) ? intval($data['commentId']) : null;
    $this->client = isset($data['client']) ? strval($data['client']) : null;
    $this->notes = $data['notes'];
  }

  public function create() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT INTO clientService (notes) VALUES (?)';

    $statement = $db->prepare($sql);

    $success = $statement->execute([
      $this->comment
    ]);

    $this->id = $db->lastInsertId();
  }

  public static function fetchComments() {
      // 1. Connect to the database
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);
      // 2. Prepare the query
      $sql = 'SELECT * FROM clientService';
      $statement = $db->prepare($sql);
      // 3. Run the query
      $success = $statement->execute();
      // 4. Handle the results
      $arr = [];
      while ($data = $statement->fetch(PDO::FETCH_ASSOC)) {
        $commentText =  new ClientService($data);
        array_push($arr, $commentText);
      }
      return $arr;
    }
    public function createService()
    {
      //1. Talks to DB
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);
      //2. Prepares insert query
      $sql = 'INSERT INTO clientService (commentId, clientName, notes)
        VALUES (?, ?, ?)';
        $statement = $db->prepare($sql);

      // 3. Run the query
      $success = $statement->execute([
        $this->commentId,
        $this ->clientName,
        $this ->notes
      ]);
    }
}
