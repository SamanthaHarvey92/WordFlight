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

    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;

?>