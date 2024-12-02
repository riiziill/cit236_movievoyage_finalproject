fetchWatchlist();

function fetchWatchlist() {
  fetch("fetch_watchlist.php", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        displayMovies(data.movies);
      } else {
        document.getElementById("watchlist-container").innerHTML = data.message;
      }
    })
    .catch((error) => {
      console.error("Error fetching watchlist:", error);
      document.getElementById("watchlist-container").innerHTML =
        "Error loading movies.";
    });
}

function displayMovies(movies) {
  const container = document.getElementById("watchlist-container");
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    const posterUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    const releaseYear = new Date(movie.release_date).getFullYear();

    const movieLink = document.createElement("a");

    movieLink.innerHTML = `
    <a href="movies.php?id=${movie.id}">
      <img src="${posterUrl}" alt="${movie.title}">
      <div class="movie-title">${movie.title}</div>
      <div class="movie-overview">(${releaseYear})</div>
    `;

    movieDiv.appendChild(movieLink);

    container.appendChild(movieDiv);
  });
}
