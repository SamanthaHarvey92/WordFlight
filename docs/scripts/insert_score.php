<?php
include 'db_connection.php';

$conn= $pdo;
$user = $_GET['u'];
$score = $_GET['s'];


$sql = "INSERT INTO leaderboard (user, score) VALUES (:user,:score)";

$stmt= $conn->prepare($sql);

$stmt->bindParam(':user', $user, PDO::PARAM_STR);
$stmt->bindParam(':score', $score, PDO::PARAM_INT);

$stmt->execute();

echo "Input Recieved";

$conn = null;
?>