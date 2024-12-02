<?php
session_start();

include 'db.php';

$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;

if ($user_id === 0) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit();
}

$query = "SELECT tmdb_id FROM user_watchlist WHERE user_id = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$user_id]);
$watchlist = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (empty($watchlist)) {
    echo json_encode(['success' => false, 'message' => 'No movies found in the watchlist.']);
    exit();
}

$tmdb_ids = array_column($watchlist, 'tmdb_id');

$movies = fetchMoviesDetails($tmdb_ids);

if (empty($movies)) {
    echo json_encode(['success' => false, 'message' => 'No movie details found.']);
    exit();
}

echo json_encode(['success' => true, 'movies' => $movies]);

function fetchMoviesDetails($tmdb_ids) {
    $apiKey = '1853494f7de15c5a8162926c2f958c9b';
    $movies = [];

    foreach ($tmdb_ids as $tmdb_id) {
        $url = "https://api.themoviedb.org/3/movie/$tmdb_id?api_key=$apiKey";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);
        
        if (curl_errno($ch)) {
            echo json_encode(['success' => false, 'message' => 'Error fetching movie details from TMDB API.']);
            exit();
        }

        curl_close($ch);

        $movie = json_decode($response, true);
        if (isset($movie['id'])) {
            $movies[] = [
                'id' => $movie['id'],
                'title' => $movie['title'],
                'overview' => $movie['overview'],
                'poster_path' => $movie['poster_path'],
                'release_date' => $movie['release_date'],
                'vote_average' => $movie['vote_average']
            ];
        }
    }

    return $movies;
}
?>
