<?php
session_start(); // Start the session
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Movie Details</title>
    <link rel="icon" type="image" href="assets/icon.png" />
    <link rel="stylesheet" href="movies.css" />
    <link rel="stylesheet" href="navbar.css" />
  </head>
  <body>
    <div id="navbar"></div>
    <div class="">
      <button id="returnButton" class="back-arrow"></button>
      <h1 class="navbar-title" id="movie-navbar-title">Movie Details</h1>
    </div>
    <div class="container">
      <img id="movie-poster" src="" alt="Movie Poster" class="movie-poster" />
      <div class="movie-info">
        <div class="trailer-section">
          <button id="play-trailer-btn">Play Trailer</button>
          <div id="trailer-modal" class="modal">
            <div class="modal-content">
              <span id="close-trailer" class="close-btn">&times;</span>
              <iframe id="trailer-video" width="560" height="315" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
        </div>

        <h2 id="movie-title">Loading...</h2>
        <p><strong>Director:</strong> <span id="movie-director">N/A</span></p>
        <p><strong>Released:</strong> <span id="movie-released">N/A</span></p>
        <p><strong>Genre:</strong> <span id="movie-genre">N/A</span></p>
        <p><strong>Ratings:</strong> <span id="movie-review">N/A</span>/10</p>
        <p><strong>Overview:</strong> <span id="movie-plot">N/A</span></p>

        <br />

        <!-- Add to Watchlist -->
        <?php if (isset($_SESSION['user_id'])): ?>
          <button id="addToWatchlistBtn">Add to Watchlist</button>
        <?php else: ?>
          <p id="login-prompt">You need to log in to add movies to your watchlist. <a href="log_in.php">Log in here</a>.</p>
        <?php endif; ?>

        <br /><br />

        <div class="cast-section">
          <h3>Cast</h3>
          <div id="cast-list" class="movie-list"></div>
        </div>

        <div class="recommended-movies">
          <h3>Recommended Movies</h3>
          <div id="recommended-list" class="movie-list"></div>
        </div>

        <br />
      </div>
    </div>

    <!-- Pass PHP session data to JavaScript -->
    <script>
      const userId = <?php echo isset($_SESSION['user_id']) ? json_encode($_SESSION['user_id']) : 'null'; ?>;
    </script>

    <script src="js/navbar.js"></script>
    <script type="module" src="js/movies.js"></script>
  </body>
</html>
