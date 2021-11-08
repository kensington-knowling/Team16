<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT game.game_id, game.opposition, game.field, game.time, assigned_to.ref_id, assigned_to.status
        FROM game INNER JOIN assigned_to
        ON game.game_id=assigned_to.game_id';
$vars = [];


$stmt = $db->prepare($sql);
$stmt->execute($vars);

$assigned = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($assigned, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;