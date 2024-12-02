<?php
session_start();
include 'db.php'; // Include your database connection here

// Get user ID and TMDB movie ID from POST request
$user_id = $_POST['user_id'];
$tmdb_id = $_POST['tmdb_id'];
$added_at = date('Y-m-d H:i:s'); // Current time

// Check if the movie is already in the watchlist
$query = "SELECT * FROM user_watchlist WHERE user_id = ? AND tmdb_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("is", $user_id, $tmdb_id);
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
$stmt->bind_param("iss", $user_id, $tmdb_id, $added_at);

if ($stmt->execute()) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'message' => 'Failed to add movie to watchlist.']);
}

$stmt->close();
$conn->close();
?>
