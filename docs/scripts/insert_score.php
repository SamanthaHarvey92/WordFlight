<?php
include 'db_connection.php';

$conn= $pdo;

$sql = "INSERT INTO leaderboard (user, score) VALUES (:user,:score)";

$stmt= $conn->prepare($sql);

$stmt->bindParam(' :user', $_GET['u'], PD::PARAM_STR);
$stmt->bindParam(' :score', $_GET['s'], PDO::PARAM_STR)

$stmt->exectue();

$conn = null;
?>