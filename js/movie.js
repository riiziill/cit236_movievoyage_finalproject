const movieDetailsContainer = document.querySelector(".movie-details");
const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));

if (selectedMovie) {
    movieDetailsContainer.innerHTML = `
        <img src="${selectedMovie.image.original}" alt="${selectedMovie.name}" />
        <h3>${selectedMovie.name}</h3>
        <p>${selectedMovie.summary}</p>
        <button class="watchlist-btn">Add to Watchlist</button>
    `;

    document.querySelector(".watchlist-btn").addEventListener("click", () => {
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        if (!watchlist.find((movie) => movie.id === selectedMovie.id)) {
            watchlist.push(selectedMovie);
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
            alert("Movie added to Watchlist!");
        } else {
            alert("Movie is already in the Watchlist!");
        }
    });
}
