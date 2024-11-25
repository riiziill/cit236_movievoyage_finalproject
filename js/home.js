const moviesContainer = document.querySelector(".movies");

fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .then((movies) => {
        movies.forEach((movie) => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            movieElement.innerHTML = `
                <img src="${movie.image.medium}" alt="${movie.name}" />
                <h3>${movie.name}</h3>
            `;
            movieElement.addEventListener("click", () => {
                localStorage.setItem("selectedMovie", JSON.stringify(movie));
                window.location.href = "movie.html";
            });
            moviesContainer.appendChild(movieElement);
        });
    })
    .catch((error) => console.error("Error fetching movies:", error));
