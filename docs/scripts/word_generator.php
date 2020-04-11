<?php
include 'db_connection.php';

$conn= $pdo;

$stmt = $conn->prepare("SELECT word, sponsor_name from words A JOIN sponsors B ON A.sponsor_id=B.sponsor_id ORDER BY RAND() LIMIT 1");
$stmt->execute();

$result=$stmt->fetchAll();

echo json_encode($result);

$conn = null;

?>