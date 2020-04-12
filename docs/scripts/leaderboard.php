<?php
include 'db_connection.php';

$conn = $pdo;

$stmt = $conn->prepare("SELECT user, score from Leaderboard ORDER BY score DESC LIMIT 7");
$stmt->execute();

$result = $stmt->fetchAll();

echo json_encode($result);


?> 