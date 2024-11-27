const apiKey = 'f328ad33'; 

async function fetchMoviesByGenre(genre) {
    const movies = [];
    for (let page = 1; page <= 3; page++) {
        const url = `https://www.omdbapi.com/?s=${genre}&type=movie&apikey=${apiKey}&page=${page}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data); 
            if (data.Response === 'True') {
                movies.push(...data.Search);
                if (movies.length >= 25) break;
            } else {
                console.error('No movies found for this genre or invalid response:', data.Error);
                break;
            }
        } catch (error) {
            console.error('Error fetching movie data:', error);
            break;
        }
    }
    return movies.slice(0, 25);
}

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
        movieLink.href = `movies.html?id=${movie.imdbID}`; 
        movieLink.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
        `;
        
        movieDiv.appendChild(movieLink); 
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
