<?php
include 'db.php';
header('Content-Type: application/json');

$response = ["success" => false, "message" => ""];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $password = trim($_POST['password']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response["message"] = "Invalid email format.";
        echo json_encode($response);
        exit;
    }

    $checkAccount = "SELECT * FROM users WHERE email='$email' and user_password='$password'";
    $resultAccount = $conn->query($checkAccount);

    if ($resultAccount->num_rows > 0) {
        $user = $resultAccount->fetch_assoc();
        session_start();
        $_SESSION['user_id'] = $user['user_id'];
        $response["success"] = true;
        $response["message"] = "Login successful.";
    } else {
        $response["message"] = "Invalid email or password.";
    }
    
} else {
    $response["message"] = "Invalid request method.";
}

echo json_encode($response);
?>
