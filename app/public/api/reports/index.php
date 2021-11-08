<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// // Step 2: Create & run the query
// //$sql = 'SELECT * FROM assigned_to';
// $vars = [];

// if (isset($_GET['ref'])) {
//   // This is an example of a parameterized query
  $sql = 'SELECT game.opposition, game.field, game.time
  FROM game, assigned_to, referee
  WHERE game.game_id = assigned_to.game_id
  AND referee.ref_id = assigned_to.ref_id AND assigned_to.ref_id = ? AND game.time BETWEEN ? and ?';

  $vars = [ $_GET['ref'],$_GET['startDate'],$_GET['endDate']];


$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format'] == 'csv' ) {
    header('Content-Type: text/csv');
    echo "Opposition,Field,Time\r\n";

    foreach($games as $g) {
        echo $g['opposition'] . "," .$g['field'].','.$g['time']
          ."\r\n";
    }

} else {
    $json = json_encode($games, JSON_PRETTY_PRINT);

    header('Content-Type: application/json');
    echo $json;
}