import { TMDB_API_KEY } from "./config.js";

const apiKey = TMDB_API_KEY;

document.addEventListener("DOMContentLoaded", () => {
  const searchResults = document.getElementById("search-results");
  const pagination = document.getElementById("pagination");

  let currentPage = 1;
  const resultsPerPage = 10;
  let allMovies = [];

  const searchForm = document.getElementById("filter-form");
  const searchInput = document.getElementById("filter-title");

  // Add event listener for form submission
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  });

  // Fetch search results based on query
  async function fetchMovies(query, page = 1) {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}&page=${page}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        allMovies = data.results;
        renderMovies();
        renderPagination();
      } else {
        searchResults.innerHTML = "<p>No results found.</p>";
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  // Render movies in the search results section
  function renderMovies() {
    searchResults.innerHTML = "";
    const start = (currentPage - 1) * resultsPerPage;
    const end = currentPage * resultsPerPage;
    const moviesToRender = allMovies.slice(start, end);

    moviesToRender.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");

      const moviePoster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/200x300?text=No+Image";

      const movieTitle = movie.title || "Unknown Title";
      const releaseYear = movie.release_date
        ? movie.release_date.split("-")[0]
        : "N/A";

      movieElement.innerHTML = `
        <a href="movies.html?id=${movie.id}">
          <img src="${moviePoster}" alt="${movieTitle}">
          <h3>${movieTitle}</h3>
          <p>Release Year: ${releaseYear}</p>
        </a>
      `;
      searchResults.appendChild(movieElement);
    });
  }

  // Render pagination buttons
  function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(allMovies.length / resultsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.className = i === currentPage ? "active" : "";
      button.addEventListener("click", () => {
        currentPage = i;
        renderMovies();
        renderPagination();
      });
      pagination.appendChild(button);
    }
  }

  // Initialize search based on URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  if (query) {
    fetchMovies(query);
  }
});
