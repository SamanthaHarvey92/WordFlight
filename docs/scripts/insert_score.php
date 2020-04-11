<?php
include 'db_connection.php';

$u = intval($_GET['u'])

$conn= $pdo;

$sql = "INSERT INTO leaderboard (user, score) VALUES (:user,:score)";

$stmt= $conn->prepare($sql);

$stmt->bindParam(' :user', $_POST['user'], PD::PARAM_STR);
$stmt->bindParam(' :score', $_POST['score'], PDO::PARAM_STR)

$stmt->exectue();

$conn = null;
?>