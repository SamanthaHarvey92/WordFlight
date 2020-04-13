<?php
// include('db_connection.php');

include("../includes/db_admin.php");

$conn = $pdo;

if ($conn) {
	// echo "<script>console.log('(" . $db_type . ")<" . $settings['database']['driver'] . "> connection to [" . $db_location . "] successful.');</script>";

	$stmt = $conn->prepare("SELECT word, sponsor_name from flywithbutchoharedb_copy.wordflightwords A JOIN flywithbutchoharedb_copy.wordflightsponsors B ON A.sponsor_id=B.sponsor_id ORDER BY RAND() LIMIT 1");
	$stmt->execute();

	$result=$stmt->fetchAll();

	echo json_encode($result);
} else {
	echo "<script>console.log('(" . $db_type . ")<" . $settings['database']['driver'] . "> connection to [" . $db_location . "] unsuccessful.');</script>";
}
	
$conn = null;

?>