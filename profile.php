<?php
session_start();

// Include the database connection with the correct path
include 'includes/db.php';  // Adjusted to reflect the folder structure

// Check if the user is logged in, otherwise redirect to login page
if (!isset($_SESSION['user_id'])) {
    header("Location: log_in.php"); // Redirect to login page if not logged in
    exit();
}

// Fetch user data from the database
$user_id = $_SESSION['user_id'];
$sql = "SELECT username, email, bio, created_at FROM users WHERE user_id = '$user_id'";
$result = $conn->query($sql);

// If the user exists, fetch their data
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
} else {
    echo "User not found!";
    exit();
}

// Handle bio update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['bio'])) {
    $new_bio = trim($_POST['bio']);
    
    // Update the bio in the database
    $update_sql = "UPDATE users SET bio = ? WHERE user_id = ?";
    $stmt = $conn->prepare($update_sql);
    $stmt->bind_param("si", $new_bio, $user_id);
    $stmt->execute();
    $stmt->close();
    
    // Reload the page to reflect the new bio
    header("Location: profile.php");
    exit();
}

// Logout functionality
if (isset($_GET['logout'])) {
    session_destroy(); // Destroy the session
    header("Location: log_in.php"); // Redirect to login page
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
    <!-- Use the Navbar -->
    <div id="navbar"></div>

    <div class="container">
        <div class="profile-header">
            <h2>Welcome, <?php echo htmlspecialchars($user['username']); ?>!</h2>
        </div>

        <!-- Bio Section with a fixed container -->
        <div class="bio-container">
            <form method="POST" action="profile.php">
                <textarea name="bio" id="bio" class="bio" placeholder="Your Bio Here..."><?php echo htmlspecialchars($user['bio']); ?></textarea>
            </form>
        </div>
        
        <button type="submit" class="save-bio-button">Save Bio</button>

        <div class="watchlist">
            <h3>Your Watchlist</h3>
            <ul>
                <li>Movie 1</li>
                <li>Movie 2</li>
                <li>Movie 3</li>
            </ul>
        </div>
        
        <!-- Logout Section -->
        <div class="actions">
            <a href="?logout=true"><button>Logout</button></a>
        </div>
    </div>
</body>
</html>

