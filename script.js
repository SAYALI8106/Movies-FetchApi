document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button'); // Get the search button
    let moviesData = []; // Store fetched movies

    // Fetch movie data from the API
    fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(movies => {
        moviesData = movies; // Save movies data for search
        displayMovies(moviesData); // Initially display all movies
    })
    .catch(error => {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = `Failed to load movies: ${error.message}`;
        console.error('Error fetching movies:', error);
    });

    // Event listener for the search button
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase(); // Get input value and convert to lowercase
        const filteredMovies = moviesData.filter(movie => 
            movie.Title.toLowerCase().includes(searchTerm) // Filter movies by title
        );
        displayMovies(filteredMovies); // Re-render the filtered movie list
    });

    // Optional: Also add 'Enter' key search functionality
    searchInput.addEventListener('keydown', function(event) {
        console.log(event);
        if (event.key === 'Enter') {
            searchButton.click(); // Trigger button click on Enter key press
        }
    });

    // Function to display movies
    function displayMovies(movies) {
        const moviesContainer = document.getElementById('movies-container');
        moviesContainer.innerHTML = ''; // Clear previous results

        if (movies.length === 0) {
            moviesContainer.innerHTML = '<p>No movies found.</p>';
            return;
        }

        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');

            const poster = movie.Poster ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster+Available';

            movieCard.innerHTML = `
                <img src="${poster}" class="movie-poster">
                <div class="movie-title">${movie.Title}</div>
                <div class="movie-year">Year: ${movie.Year}</div>
            `;

    
            moviesContainer.appendChild(movieCard);
        });
    }
});
