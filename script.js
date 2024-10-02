document.addEventListener('DOMContentLoaded', function() {
fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies')
.then(response => {
    if (!response.ok) {
        // If the response status is not OK, throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(movies => {
    const moviesContainer = document.getElementById('movies-container');
    movies.forEach(movie => {
        // Create a movie card
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // missing poster
        const poster = movie.Poster ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster+Available';


        // Add movie details to the card
        movieCard.innerHTML = `
             <img src="${poster}" class="movie-poster">
            <div class="movie-title">${movie.Title}</div>
            <div class="movie-year">Year: ${movie.Year}</div>
        `;

        // Append the movie card to the container
        moviesContainer.appendChild(movieCard);
    });
})
.catch(error => {
    // Display error message in the UI
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Failed to load movies: ${error.message}`;
    console.error('Error fetching movies:', error);
});

})
    