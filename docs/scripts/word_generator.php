<?php
include 'db_connection.php';

$conn=pdo;

$stmt = $conn->prepare("SELECT word FROM WordBank ORDER BY RAND() LIMIT 1");
$stmt->execute();

$word->word=$stmt2->setFetchMode(PDO::FETCH_ASSOC);

$stmt2 = $conn->prepare("SELECT 'sponsor_name' FROM 'sponsors' join 'words' on 'sponsors.sponsor_id = words.sponsor_id' WHERE 'sponsors.sponsor_id = (SELECT words.sponsor_id WHERE word = $result1)';");
$stmt2->execute();

$word->sponsor=$stmt->setFetchMode(PDO::FETCH_ASSOC);

echo json_encode($word);
}

?>