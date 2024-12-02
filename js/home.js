import { TMDB_API_KEY } from "./config.js";

const apiKey = TMDB_API_KEY;

async function filterMovies() {
  const titleFilter = document
    .getElementById("filter-title")
    .value.toLowerCase();
  const apiKey = TMDB_API_KEY;
  const noResults = document.getElementById("no-results");
  const movieContainer = document.getElementById("filtered-movies");

  movieContainer.innerHTML = ""; // Clear previous results
  noResults.style.display = "none"; // Hide no results initially

  if (!titleFilter) {
    noResults.textContent = "Please enter a title to search.";
    noResults.style.display = "block";
    return;
  }

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    titleFilter
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      data.results.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        const movieTitle = movie.title || "Unknown Title";
        const moviePoster = movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : "https://via.placeholder.com/200x300?text=No+Image";

        movieDiv.innerHTML = `
                    <a href="search.html?query=${encodeURIComponent(
                      movie.title
                    )}">
                        <img src="${moviePoster}" alt="${movieTitle}">
                        <h3>${movieTitle} (${
          movie.release_date ? movie.release_date.split("-")[0] : "N/A"
        })</h3>
                    </a>
                `;

        movieContainer.appendChild(movieDiv);
      });
    } else {
      noResults.textContent = "No movies found.";
      noResults.style.display = "block";
    }
  } catch (error) {
    console.error("Error searching movies:", error.message);
    noResults.textContent = "An error occurred while searching for movies.";
    noResults.style.display = "block";
  }
}

async function fetchMovies(genreId, genreName, page = 1) {
  const apiKey = "1853494f7de15c5a8162926c2f958c9b";
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}&language=en-US&sort_by=popularity.desc`;

  displayLoading(genreName);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.results) {
      displayMovies(genreName, data.results);
    } else {
      console.error("Error fetching data:", data.status_message);
    }
  } catch (error) {
    console.error(`Error fetching movies for ${genreName}:`, error.message);
    displayError(genreName); // Show error message if fetching fails
  }
}

function displayMovies(genre, movies) {
  const movieSection = document.getElementById(`${genre}-movies`);
  movieSection.innerHTML = ""; // Clear existing movies

  if (movies.length === 0) {
    movieSection.innerHTML = "<p>No movies found for this genre.</p>";
    return;
  }

  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.setAttribute("data-title", (movie.title || "").toLowerCase());
    movieDiv.setAttribute(
      "data-year",
      movie.release_date ? movie.release_date.split("-")[0] : ""
    );
    movieDiv.setAttribute("data-genre", genre);

    // Check if movie title or poster is missing
    const movieTitle = movie.title || "Unknown Title";
    const moviePoster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : "https://via.placeholder.com/200x300?text=No+Image";

    movieDiv.innerHTML = `
            <a href="movies.html?id=${movie.id}">
                <img src="${moviePoster}" alt="${movieTitle}">
                <h3>${movieTitle} (${
      movie.release_date ? movie.release_date.split("-")[0] : "N/A"
    })</h3>
            </a>
        `;

    movieSection.appendChild(movieDiv);
  });
}

async function loadInitialMovies() {
  const genres = [
    { id: 28, name: "action" },
    { id: 35, name: "comedy" },
    { id: 27, name: "horror" },
    { id: 10749, name: "romance" },
  ];

  const fetchPromises = genres.map((genre) =>
    fetchMovies(genre.id, genre.name)
  );
  await Promise.all(fetchPromises);
}

function displayLoading(genre) {
  const section = document.getElementById(`${genre}-movies`);
  section.innerHTML = '<p class="loading">Loading movies...</p>';
}

function displayError(genre) {
  const section = document.getElementById(`${genre}-movies`);
  section.innerHTML =
    '<p class="error">Failed to load movies. Please try again later.</p>';
}

document.getElementById("filter-form").addEventListener("input", function () {
  filterMovies();
});

// Redirect to search page with query when search input is entered
document
  .getElementById("filter-title")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchQuery = document.getElementById("filter-title").value;
      window.location.href = `search.html?query=${encodeURIComponent(
        searchQuery
      )}`;
    }
  });

document
  .getElementById("filter-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchQuery = document.getElementById("filter-title").value;
    window.location.href = `search.html?query=${encodeURIComponent(
      searchQuery
    )}`;
  });

document.addEventListener("DOMContentLoaded", () => {
  const filterForm = document.getElementById("filter-form");
  if (filterForm) {
    filterForm.addEventListener("input", filterMovies);
  } else {
    console.error("Filter form element not found in the DOM.");
  }

  loadInitialMovies();
});
