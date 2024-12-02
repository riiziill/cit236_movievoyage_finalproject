<?php
include 'db.php';
header('Content-Type: application/json');

$response = [
    "success" => false,
    "message" => ""
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = htmlspecialchars(trim($_POST['username']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];

    if ($password !== $confirmPassword) {
        $response["message"] = "Passwords do not match.";
        echo json_encode($response);
        exit;
    }

    $checkEmail = "SELECT * FROM users WHERE email='$email'";
    $resultEmail = $conn->query($checkEmail);

    $checkUsername = "SELECT * FROM users WHERE username='$username'";
    $resultUsername = $conn->query($checkUsername);

    if ($resultEmail->num_rows > 0) {
        $response["message"] = "Email address already exists.";
    } else if ($resultUsername->num_rows > 0) {
        $response["message"] = "Username is already taken.";
    } else {
        $stmt = $conn->prepare("INSERT INTO users (username, email, user_password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $password);

        if ($stmt->execute()) {
            $response["success"] = true;
            $response["message"] = "User registered successfully.";
        } else {
            $response["message"] = "Error: " . $conn->error;
        }

        $stmt->close();
    }
} else {
    $response["message"] = "Invalid request method.";
}

echo json_encode($response);
?>
