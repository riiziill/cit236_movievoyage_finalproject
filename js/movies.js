const apiKey = 'f328ad33'; 

async function fetchMovieDetails(id) {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); 
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

    // Add to Watchlist button
    const addToWatchlistBtn = document.createElement('button');
    addToWatchlistBtn.textContent = 'Add to Watchlist';
    addToWatchlistBtn.addEventListener('click', () => addToWatchlist(movie.Title));
    document.getElementById('movie-details').appendChild(addToWatchlistBtn);
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
        console.log(data);
        if (data && data.reviews) {
            displayMovieReviews(data.reviews);
        } else {
            console.error('Reviews not found:', data.Error);
            displayMovieReviews([]);
        }
    } catch (error) {
        console.error('Error fetching movie reviews:', error);
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
} else {
    document.getElementById('movie-title').textContent = 'No movie ID provided';
}

// Handle review submission
document.getElementById('submit-review').addEventListener('click', async function() {
    const userReview = document.getElementById('user-review').value;
    const rating = document.querySelector('.stars .star.active')?.getAttribute('data-value');
    if (userReview && rating) {
        const reviewData = {
            movieId: movieId,
            review: userReview,
            rating: rating
        };
        
        console.log('Submitting review data:', reviewData); // Add logging for debugging
        
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
                document.getElementById('user-review').value = ''; // Clear the textarea
                document.querySelector('.stars .star.active')?.classList.remove('active');
                // Display pop-up message
                alert('Thank you for rating the movie!');
            } else {
                console.error('Failed to submit review:', response.statusText); // Add logging for debugging
                alert('Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error); // Add logging for debugging
            alert('Error submitting review');
        }
    } else {
        alert('Please write a review and select a rating before submitting.');
    }
});

// Handle star rating selection
document.querySelectorAll('.stars .star').forEach(star => {
    star.addEventListener('click', function() {
        document.querySelectorAll('.stars .star').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
    });
});

// Function to add a movie to the watchlist
function addToWatchlist(movieTitle) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.push({ title: movieTitle });
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    alert(`${movieTitle} has been added to your watchlist!`);
}
