<?php
session_start();

include 'includes/db.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: log_in.php");
    exit();
}

$user_id = $_SESSION['user_id'];
$sql = "SELECT username, email, bio, created_at FROM users WHERE user_id = '$user_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
} else {
    echo "User not found!";
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['bio'])) {
    $new_bio = trim($_POST['bio']);

    $update_sql = "UPDATE users SET bio = ? WHERE user_id = ?";
    $stmt = $conn->prepare($update_sql);
    $stmt->bind_param("si", $new_bio, $user_id);
    $stmt->execute();
    $stmt->close();

    header("Location: profile.php");
    exit();
}

if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: log_in.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="profile.css">
    <link rel="stylesheet" href="navbar.css">
    <script src="js/navbar.js" defer></script>
</head>
<body>

    <div id="navbar"></div>

    <div class="container">
        <div class="profile-header">
            <h2>Welcome, <?php echo htmlspecialchars($user['username']); ?>!</h2>
        </div>
        
        <form method="POST" action="profile.php">
                <textarea name="bio" id="bio" class="bio" placeholder="Your Bio Here..."><?php echo htmlspecialchars($user['bio']); ?></textarea>
                <button type="submit" class="save-bio-button">Save Bio</button>
        </form>

        <div class="actions">
            <a href="?logout=true"><button>Logout</button></a>
        </div>
    </div>
</body>
</html>

