function filterMovies() {
    const titleFilter = document.getElementById('filter-title').value.toLowerCase();
    const genreFilter = document.getElementById('filter-genre').value;
    const yearFilter = document.getElementById('filter-year').value;

    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        section.style.display = 'none';
    });

    document.querySelectorAll('.section').forEach(section => {
        const genre = section.id.split('-')[0]; // Extract genre from section id, e.g., 'horror', 'comedy'
        const movieSection = section.querySelector('.movies');

        let genreMatches = (genreFilter === '' || genre === genreFilter);
        
        let movieMatches = false;
        section.querySelectorAll('.movie').forEach(movie => {
            const title = movie.getAttribute('data-title');
            const year = movie.getAttribute('data-year');
            
            const matchesTitle = !titleFilter || title.includes(titleFilter);
            const matchesGenre = !genreFilter || genre === genreFilter;
            const matchesYear = !yearFilter || year === yearFilter;

            if (matchesTitle && matchesGenre && matchesYear) {
                movie.style.display = 'block'; // Show the movie if it matches the filter
                movieMatches = true; // At least one movie in this section matched the filter
            } else {
                movie.style.display = 'none'; // Hide the movie if it doesn't match
            }
        });

        // Only display the section if there is a genre match and at least one movie matches
        if (genreMatches && movieMatches) {
            section.style.display = 'block'; // Show the genre section
        } else {
            section.style.display = 'none'; // Hide the genre section if no movie matches
        }
    });

    // Check if any movie is visible
    const visibleMovies = document.querySelectorAll('.movie[style="display: block;"]');
    if (visibleMovies.length === 0) {
        document.getElementById('no-results').style.display = 'block';
    } else {
        document.getElementById('no-results').style.display = 'none';
    }
}

async function fetchMovies(genre, page = 1) {
    const apiKey = 'f328ad33'; 
    const url = `https://www.omdbapi.com/?s=${genre}&type=movie&apikey=${apiKey}&page=${page}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === "True") {
            displayMovies(genre, data.Search);
        } else {
            console.error("Error fetching data:", data.Error);
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function displayMovies(genre, movies) {
    const movieSection = document.getElementById(`${genre}-movies`);
    movieSection.innerHTML = ''; // Clear existing movies

    if (movies.length === 0) {
        movieSection.innerHTML = '<p>No movies found for this genre.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.setAttribute('data-title', movie.Title.toLowerCase());
        movieDiv.setAttribute('data-year', movie.Year);
        movieDiv.setAttribute('data-genre', genre);
        
        // Check if movie title or poster is missing
        const movieTitle = movie.Title || 'Unknown Title';
        const moviePoster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image';

        movieDiv.innerHTML = `
            <a href="movies.html?id=${movie.imdbID}">
                <img src="${moviePoster}" alt="${movieTitle}">
                <h3>${movieTitle} (${movie.Year})</h3>
            </a>
        `;
        
        movieSection.appendChild(movieDiv);
    });
}

function loadInitialMovies() {
    fetchMovies("horror");
    fetchMovies("comedy");
    fetchMovies("action");
    fetchMovies("romance");
}

document.getElementById('filter-form').addEventListener('input', function() {
    filterMovies();
});

document.addEventListener('DOMContentLoaded', loadInitialMovies);
