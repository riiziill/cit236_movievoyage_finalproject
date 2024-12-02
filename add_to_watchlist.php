<?php
session_start();
include 'db.php'; 

$user_id = isset($_POST['user_id']) ? (int)$_POST['user_id'] : 0; 
$tmdb_id = isset($_POST['tmdb_id']) ? trim($_POST['tmdb_id']) : ''; 
$added_at = date('Y-m-d H:i:s'); 

echo "rarrar";
echo $user_id;
echo $tmdb_id;


if (empty($user_id) || empty($tmdb_id)) {
    echo json_encode(['success' => false, 'message' => 'Invalid input data.']);
    exit();
}


$_SESSION['user_id'] = $user_id;

$query = "SELECT * FROM user_watchlist WHERE user_id = ? AND tmdb_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("is", $user_id, $tmdb_id); 
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Movie already in watchlist.']);
    exit();
}

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
