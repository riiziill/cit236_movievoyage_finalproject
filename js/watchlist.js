function loadWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const watchlistContainer = document.getElementById('watchlist');
    watchlistContainer.innerHTML = '';

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '<li>Your watchlist is empty.</li>';
    } else {
        watchlist.forEach(movie => {
            const movieItem = document.createElement('li');
            movieItem.classList.add('movie-item');
            const movieTitle = document.createElement('span');
            movieTitle.textContent = movie.Title;
            movieItem.appendChild(movieTitle);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove from Watchlist';
            removeButton.addEventListener('click', () => removeFromWatchlist(movie.imdbID));
            movieItem.appendChild(removeButton);
            watchlistContainer.appendChild(movieItem);
        });
    }
}

// remove wathclist
function removeFromWatchlist(imdbID) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(movie => movie.imdbID !== imdbID);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    loadWatchlist();
}

document.addEventListener('DOMContentLoaded', function() {
    loadWatchlist();
});
