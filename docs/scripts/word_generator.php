<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "WordFlight";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT word FROM WordBank ORDER BY RAND() LIMIT 1");
    $stmt->execute();

    $result1 = $stmt->setFetchMode(PDO::FETCH_ASSOC);

    $stmt2 = $conn->prepare("SELECT 'sponsor_name' FROM 'sponsors' join 'words' on 'sponsors.sponsor_id = words.sponsor_id' WHERE 'sponsors.sponsor_id = (SELECT words.sponsor_id WHERE word = $result1)';");
    $stmt2->execute();

    $result2 = $stmt2->setFetchMode(PDO::FETCH_ASSOC);

    echo $result1;
    echo $result2;
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;

?>