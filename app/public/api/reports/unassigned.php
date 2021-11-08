<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT opposition, field, time
FROM game
WHERE game_id NOT IN (SELECT game_id FROM assigned_to)';
$vars = [];


$stmt = $db->prepare($sql);
$stmt->execute($vars);

$game = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format'] == 'csv' ) {
    header('Content-Type: text/csv');
    echo "Opposition,Field,Time\r\n";

    foreach($game as $g) {
        echo $g['opposition'] . "," .$g['field'].','.$g['time']
          ."\r\n";
    }

} else {
    $json = json_encode($game, JSON_PRETTY_PRINT);

    header('Content-Type: application/json');
    echo $json;
}