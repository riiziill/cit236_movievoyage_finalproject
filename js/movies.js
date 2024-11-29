const apiKey = 'f328ad33'; 

async function fetchMovieDetails(id) {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === 'True') {
            displayMovieDetails(data);
            fetchMovieReviews(id);
        } else {
            console.error('Movie not found:', data.Error);
            document.getElementById('movie-title').textContent = 'Movie not found';
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        document.getElementById('movie-title').textContent = 'Error loading movie details';
    }
}

function displayMovieDetails(movie) {
    document.getElementById('movie-title').textContent = movie.Title;
    document.getElementById('movie-navbar-title').textContent = movie.Title;
    document.getElementById('movie-poster').src = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image';
    document.getElementById('movie-director').textContent = movie.Director;
    document.getElementById('movie-released').textContent = movie.Released;
    document.getElementById('movie-genre').textContent = movie.Genre;
    document.getElementById('movie-actors').textContent = movie.Actors;
    document.getElementById('movie-review').textContent = movie.imdbRating;

    const addToWatchlistBtn = document.getElementById('addToWatchlistBtn');
    addToWatchlistBtn.addEventListener('click', () => addToWatchlist(movie));
}

function displayMovieReviews(reviews) {
    if (reviews && reviews.length > 0) {
        document.getElementById('review1').textContent = reviews[0].Content;
        if (reviews.length > 1) {
            document.getElementById('review2').textContent = reviews[1].Content;
        } else {
            document.getElementById('review2').style.display = 'none';
        }
    } else {
        document.getElementById('review1').textContent = 'No reviews available.';
        document.getElementById('review2').style.display = 'none';
    }
}

async function fetchMovieReviews(id) {
    const url = `https://api.example.com/movie-reviews?movieId=${id}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.reviews) {
            displayMovieReviews(data.reviews);
        } else {
            displayMovieReviews([]);
        }
    } catch (error) {
        displayMovieReviews([]);
    }
}

document.getElementById('returnButton').addEventListener('click', function() {
    window.history.back();
});

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

if (movieId) {
    fetchMovieDetails(movieId);
}

document.getElementById('submit-review').addEventListener('click', async function() {
    const userReview = document.getElementById('user-review').value;
    const rating = document.querySelector('.stars .star.active')?.getAttribute('data-value');
    if (userReview && rating) {
        const reviewData = {
            movieId: movieId,
            review: userReview,
            rating: rating
        };
        
        try {
            const response = await fetch('https://api.example.com/submit-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                const newReview = document.createElement('p');
                newReview.textContent = `${userReview} - Rating: ${rating} stars`;
                document.getElementById('reviews').appendChild(newReview);
                document.getElementById('user-review').value = ''; 
                alert('Thank you for rating the movie!');
            } else {
                alert('Failed to submit review');
            }
        } catch (error) {
            alert('Error submitting review');
        }
    } else {
        alert('Please write a review and select a rating before submitting.');
    }
});


document.querySelectorAll('.stars .star').forEach(star => {
    star.addEventListener('click', function() {
        document.querySelectorAll('.stars .star').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
    });
});

// add to watchlistt
function addToWatchlist(movie) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const isAlreadyInWatchlist = watchlist.some(item => item.imdbID === movie.imdbID);
    
    if (!isAlreadyInWatchlist) {
        watchlist.push({
            Title: movie.Title,
            Genre: movie.Genre,
            Released: movie.Released,
            imdbID: movie.imdbID,
            Poster: movie.Poster
        });
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert(`${movie.Title} has been added to your watchlist!`);
    } else {
        alert(`${movie.Title} is already in your watchlist.`);
    }
}
