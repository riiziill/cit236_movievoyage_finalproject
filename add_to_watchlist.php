<?php
session_start();
include 'db.php'; // Include your database connection here

// Get and sanitize user inputs
$user_id = isset($_POST['user_id']) ? (int)$_POST['user_id'] : 0; // Cast to integer
$tmdb_id = isset($_POST['tmdb_id']) ? trim($_POST['tmdb_id']) : ''; // Ensure it's a string
$added_at = date('Y-m-d H:i:s'); // Current time

echo "rarrar";
echo $user_id;
echo $tmdb_id;

// Validate input data
if (empty($user_id) || empty($tmdb_id)) {
    echo json_encode(['success' => false, 'message' => 'Invalid input data.']);
    exit();
}

// Store the user ID in session for later use
$_SESSION['user_id'] = $user_id;

// Check if the movie is already in the watchlist
$query = "SELECT * FROM user_watchlist WHERE user_id = ? AND tmdb_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("is", $user_id, $tmdb_id); // Use 's' for string tmdb_id
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Movie is already in the watchlist
    echo json_encode(['success' => false, 'message' => 'Movie already in watchlist.']);
    exit();
}

// Insert the movie into the watchlist
$query = "INSERT INTO user_watchlist (user_id, tmdb_id, added_at) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("iss", $user_id, $tmdb_id, $added_at); // Use 's' for string tmdb_id

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to add movie to watchlist.']);
}

// Clean up
$stmt->close();
$conn->close();
?>
