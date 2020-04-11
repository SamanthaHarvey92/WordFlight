<?php
include 'db_connection.php';

$conn = $pdo;

$stmt = $conn->prepare("SELECT user, score from Leaderboard ORDER BY score DESC LIMIT 10");
$stmt->execute();

$result = $stmt->fetchAll();

echo json_encode($result);

$conn = null;

?> 