const user = JSON.parse(localStorage.getItem("user"));
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
const profileContainer = document.querySelector(".profile-info");
const watchlistContainer = document.querySelector(".watchlist");

if (user) {
    profileContainer.innerHTML = `
        <h2>${user.firstName} ${user.lastName}</h2>
        <p>Email: ${user.email}</p>
    `;
}

if (watchlist.length > 0) {
    watchlist.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${movie.image.medium}" alt="${movie.name}" />
            <h3>${movie.name}</h3>
        `;
        watchlistContainer.appendChild(movieElement);
    });
} else {
    watchlistContainer.innerHTML = "<p>Your watchlist is empty!</p>";
}
