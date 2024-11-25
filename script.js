const apiKey = 'f328ad33'; 

async function fetchMoviesByGenre(genre) {
    const url = `https://www.omdbapi.com/?s=${genre}&type=movie&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data); 

        if (data.Response === 'True') {
            return data.Search.slice(0, 10); 
        } else {
            console.error('No movies found for this genre or invalid response:', data.Error);
            return [];
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return [];
    }
}

function displayMovies(genre, movies) {
    const movieSection = document.getElementById(`${genre}-movies`);
    movieSection.innerHTML = ''; // Clear any existing content

    if (movies.length === 0) {
        movieSection.innerHTML = '<p>No movies found for this genre.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        movieSection.appendChild(movieDiv);
    });
}

async function loadMovies() {
    const horrorMovies = await fetchMoviesByGenre('horror');
    displayMovies('horror', horrorMovies);

    const comedyMovies = await fetchMoviesByGenre('comedy');
    displayMovies('comedy', comedyMovies);

    const actionMovies = await fetchMoviesByGenre('action');
    displayMovies('action', actionMovies);

    const romanceMovies = await fetchMoviesByGenre('romance');
    displayMovies('romance', romanceMovies);
}

loadMovies();

function displayMovies(genre, movies) {
    const movieSection = document.getElementById(`${genre}-movies`);
    movieSection.innerHTML = '';

    if (movies.length === 0) {
        movieSection.innerHTML = '<p>No movies found for this genre.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const movieLink = document.createElement('a');
        movieLink.href = `https://www.imdb.com/title/${movie.imdbID}`;  
        movieLink.target = '_blank';

        movieLink.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        
        movieDiv.appendChild(movieLink); 
        movieSection.appendChild(movieDiv);
    });
}


// profile page
const profileIcon = document.getElementById('profile-icon');
const profilePage = document.getElementById('profile-page');
const backToHomeButton = document.getElementById('back-to-home');

// show profile page
profileIcon.addEventListener('click', () => {
    profilePage.classList.remove('hidden');
});

// return to the main page
backToHomeButton.addEventListener('click', () => {
    profilePage.classList.add('hidden');
});


// function for watchlist
function addToWatchlist(movieTitle) {
    if (!watchlist.includes(movieTitle)) {
        watchlist.push(movieTitle);
        const watchlistElement = document.getElementById('watchlist');
        const listItem = document.createElement('li');
        listItem.textContent = movieTitle;
        watchlistElement.appendChild(listItem);
    }
}

// nav for movie page
const movieDetails = document.getElementById('movie-details');
const backToMoviesButton = document.getElementById('back-to-movies');
const addWatchlistButton = document.getElementById('add-watchlist');
const watchlist = [];

// movie click
document.body.addEventListener('click', (event) => {
    const movieElement = event.target.closest('.movie');
    if (movieElement) {
        const movieTitle = movieElement.querySelector('h3').textContent;
        const movieYear = movieElement.querySelector('p').textContent;
        const moviePoster = movieElement.querySelector('img').src;

        // Show movie details page
        movieDetails.classList.remove('hidden');
        document.getElementById('movie-poster').src = moviePoster;
        document.getElementById('movie-title').textContent = movieTitle;
        document.getElementById('movie-year').textContent = `Year: ${movieYear}`;
    }
});

// return to main page
backToMoviesButton.addEventListener('click', () => {
    movieDetails.classList.add('hidden');
});

// add movie to watchlist
addWatchlistButton.addEventListener('click', () => {
    const movieTitle = document.getElementById('movie-title').textContent;

    if (!watchlist.includes(movieTitle)) {
        watchlist.push(movieTitle);
        const watchlistElement = document.getElementById('watchlist');
        const listItem = document.createElement('li');
        listItem.textContent = movieTitle;
        watchlistElement.appendChild(listItem);
    }
});

