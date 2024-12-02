<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "cit236_movievoyage_finalproject";
$charset = 'utf8mb4';


$dsn = "mysql:host=$servername;dbname=$dbname;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (\PDOException $e) {
    echo 'Database connection failed: ' . $e->getMessage();
    exit();
}

try {
    $pdo->query("SELECT 1");
} catch (\PDOException $e) {
    echo 'Error testing connection: ' . $e->getMessage();
    exit();
}

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
