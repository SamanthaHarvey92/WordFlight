<?php
// Link to the database connection string
include( "../includes/db_admin.php" );

// Pull the connection from the database connection string
$conn = $pdo;

if ( $conn ) {
    // Select a random word and its sponsor
    // Prepare the SQL query statement
    $stmt = $conn->prepare( "SELECT TOP (1) [word], [sponsor_name] FROM [FlyWithButchOhareDB_Copy].[dbo].[wordflightwords] A JOIN [FlyWithButchOhareDB_Copy].[dbo].[wordflightsponsors] B ON A.[sponsor_id]=B.[sponsor_id] ORDER BY NEWID();" );

    // Perform the SQL query
    $stmt->execute();

    // Save the query results
    $result = $stmt->fetchAll();

    // Pack the result with JSON and return to AJAX
    echo json_encode( $result );
} else {
    // Notify the console of any errors
    echo "<script>console.log('(" . $db_type . ")<" . $settings[ 'database' ][ 'driver' ] . "> connection to [" . $db_location . "] unsuccessful.');</script>";
}

// Clear and close the connection
$conn = null;
?>