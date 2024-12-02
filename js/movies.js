import { TMDB_API_KEY } from "./config.js";

const apiKey = TMDB_API_KEY;

// Fetch movie details from TMDb
async function fetchMovieDetails(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      displayMovieDetails(data);
      fetchTrailer(id);
      fetchRecommendedMovies(id);
      fetchCast(id); // Fetch cast data
      fetchDirector(id); // Fetch director data
    } else {
      console.error("Movie not found:", data.status_message);
      document.getElementById("movie-title").textContent = "Movie not found";
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    document.getElementById("movie-title").textContent =
      "Error loading movie details";
  }
}

// Display movie details on the page
function displayMovieDetails(movie) {
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-poster").src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";
  document.getElementById("movie-director").textContent =
    "Director information not available";
  document.getElementById("movie-released").textContent =
    movie.release_date || "N/A";
  document.getElementById("movie-genre").textContent =
    movie.genres.map((g) => g.name).join(", ") || "N/A";
  document.getElementById("movie-review").textContent =
    movie.vote_average || "N/A";
  document.getElementById("movie-plot").textContent = movie.overview || "N/A";

  const addToWatchlistBtn = document.getElementById("addToWatchlistBtn");
  if (addToWatchlistBtn) {
    addToWatchlistBtn.addEventListener("click", () => addToWatchlist(movie));
  }
}

// Fetch trailer for the movie
async function fetchTrailer(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const trailerButton = document.getElementById("play-trailer-btn");

    if (response.ok && data.results.length > 0) {
      const trailerKey = data.results[0].key;

      // Show the play trailer button if a trailer is available
      trailerButton.style.display = "inline-block";

      // Attach event listener to the trailer button
      trailerButton.addEventListener("click", () => {
        const modal = document.getElementById("trailer-modal");
        const iframe = document.getElementById("trailer-video");
        iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
        modal.style.display = "flex"; // Show the modal
      });

      // Close the modal when clicking the close button
      document.getElementById("close-trailer").addEventListener("click", () => {
        const iframe = document.getElementById("trailer-video");
        iframe.src = ""; // Stop the video
        document.getElementById("trailer-modal").style.display = "none"; // Hide modal
      });
    } else {
      // Hide the play trailer button if no trailer is available
      trailerButton.style.display = "none";
      console.log("No trailer available");
    }
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}

// Fetch recommended movies
// Fetch recommended movies
async function fetchRecommendedMovies(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const recommendedSection = document.getElementById("recommended-section"); // The Recommended section wrapper

    if (response.ok && data.results.length > 0) {
      displayRecommendedMovies(data.results);
      recommendedSection.style.display = "block"; // Show the Recommended section
    } else {
      recommendedSection.style.display = "none"; // Hide the Recommended section if no data
      console.log("No recommendations available");
    }
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    document.getElementById("recommended-section").style.display = "none"; // Hide if there was an error
  }
}

// Display recommended movies
function displayRecommendedMovies(movies) {
  const recommendedList = document.getElementById("recommended-list");
  recommendedList.innerHTML = ""; // Clear the previous list

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.className = "movie-item";
    movieItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;

    // Add click event listener to each movie to redirect to its movie page
    movieItem.addEventListener("click", () => {
      window.location.href = `movies.php?id=${movie.id}`; // Redirect to the movie details page
    });

    recommendedList.appendChild(movieItem);
  });
}

// Fetch cast details
async function fetchCast(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const castSection = document.getElementById("cast-section"); // The Cast section wrapper

    if (response.ok && data.cast.length > 0) {
      displayCast(data.cast);
      castSection.style.display = "block"; // Show the Cast section
    } else {
      castSection.style.display = "none"; // Hide the Cast section if no data
      console.log("No cast information available");
    }
  } catch (error) {
    console.error("Error fetching cast:", error);
    document.getElementById("cast-section").style.display = "none"; // Hide if there was an error
  }
}

// Display cast in the Cast section
function displayCast(cast) {
  const castList = document.getElementById("cast-list");
  castList.innerHTML = ""; // Clear previous list

  cast.slice(0, 10).forEach((actor) => {
    const castItem = document.createElement("div");
    castItem.className = "cast-item";

    // Check if the actor has a profile image
    const profileImage = actor.profile_path
      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

    castItem.innerHTML = `
      <div class="profile-image-container">
        <img src="${profileImage}" alt="${actor.name}">
      </div>
      <h3>${actor.name}</h3>
    `;

    castList.appendChild(castItem);
  });
}

// Fetch director details from TMDb
async function fetchDirector(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const director = data.crew.find((member) => member.job === "Director");

    if (director) {
      document.getElementById("movie-director").textContent = director.name;
    } else {
      document.getElementById("movie-director").textContent =
        "Director information not available";
    }
  } catch (error) {
    console.error("Error fetching director:", error);
    document.getElementById("movie-director").textContent =
      "Error loading director information";
  }
}

// Add to Watchlist
async function addToWatchlist(movie) {
  if (userId === null) {
    alert("You need to log in to add movies to your watchlist.");
    return;
  }

  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("tmdb_id", movie.id);

  try {
    const response = await fetch("add_to_watchlist.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      alert("Movie added to watchlist!");
    } else {
      alert("Failed to add movie to watchlist.");
    }
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    alert("Error adding to watchlist.");
  }
}

// Get the movie ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

if (movieId) {
  fetchMovieDetails(movieId);
}

// Handle return button click
document.getElementById("returnButton").addEventListener("click", function () {
  window.history.back();
});
