<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Movie Voyage</title>
    <link rel="icon" type="image" href="assets/icon.png" />
    <link rel="stylesheet" href="home.css" />
    <link rel="stylesheet" href="navbar.css" />
    <?php ?>
  </head>
  <body>
    <?php session_start() ?>
    <div id="navbar"></div>

    <div class="section" id="horror-section">
      <h2>Horror</h2>
      <div class="movie-container">
        <div class="movies" id="horror-movies"></div>
      </div>
    </div>
    <div class="section" id="comedy-section">
      <h2>Comedy</h2>
      <div class="movie-container">
        <div class="movies" id="comedy-movies"></div>
      </div>
    </div>
    <div class="section" id="action-section">
      <h2>Action</h2>
      <div class="movie-container">
        <div class="movies" id="action-movies"></div>
      </div>
    </div>
    <div class="section" id="romance-section">
      <h2>Romance</h2>
      <div class="movie-container">
        <div class="movies" id="romance-movies"></div>
      </div>
    </div>
    <script src="js/navbar.js"></script>
    <script type="module" src="js/home.js"></script>
  </body>
</html>