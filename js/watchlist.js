document.addEventListener('DOMContentLoaded', () => {
    const watchlistElement = document.getElementById('watchlist');

    // Fetch watchlist from localStorage
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    watchlistElement.innerHTML = ''; // Clear the loading text

    if (watchlist.length === 0) {
        watchlistElement.innerHTML = '<li>No movies in watchlist</li>';
    } else {
        watchlist.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="movie-title">${movie.title}</span>
            `;
            watchlistElement.appendChild(listItem);
        });
    }
});
