<?php
$db_type = "mysqli";

switch($db_type) {
	case "mysqli":
		$host = 'localhost';
		$db   = 'flywithbutchoharedb_copy';
		$user = 'DevTeam@flywithbutchohareserver';
		$pass = 'Developers#60666';
		$charset = 'utf8mb4';

		$options = [
			\PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
			\PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
			\PDO::ATTR_EMULATE_PREPARES   => false,
		];
		$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
		try {
			 $pdo = new \PDO($dsn, $user, $pass, $options);
		} catch (\PDOException $e) {
			 throw new \PDOException($e->getMessage(), (int)$e->getCode());
		}
		break;
	case "sqlsrv":
		$connectionInfo = array(//"UID"=>"DevTeam@flywithbutchohareserver",
								//"pwd"=>"Developers#60666",
								"LoginTimeout"=>30,
								"Encrypt"=>False,
								"TrustServerCertificate"=>False,
								"ApplicationIntent"=>"ReadWrite",
								"MultiSubnetFailover"=>False);
		$serverName = "TWISTEDARROW\SQLEXPRESS";
		$conn = sqlsrv_connect($serverName, $connectionInfo);
		if ($conn) {
			echo "<script>console.log('SQLSRV Connection successful.');</script>";
			sqlsrv_close($conn);
		} else {
			die("<script>console.log('" . print_r( sqlsrv_errors(), true) . "');</script>");
		}
		break;
	default:
		break;
}

?>