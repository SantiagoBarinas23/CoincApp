const baseURL = "https://api.themoviedb.org/3";
const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2QwOGI4ZDU2MTZjMGE2YWFjMTQ3MzlmYzBhMTNkMCIsIm5iZiI6MTc0OTc0MTA1Ny45MSwic3ViIjoiNjg0YWVlMDEyOTNlOTQ2Nzk0OWY1ZjUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.7-iCoUCPXGVZbJxpNIklcX2kKHaLCoLpfWsyk47opsQ";
const opcion = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiToken}`
  }
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const poster_path = "poster_path";

function renderMovies(movieList, containerSelector) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = '';

  movieList.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const img = document.createElement('img');
    img.classList.add('movie-img');
    img.src = IMAGE_BASE_URL + movie.poster_path;
    img.alt = movie.title;
    img.onclick = () => {
      window.open ( `Detalles.html?id=${movie.id}`)
    }

    card.appendChild(img);
    container.appendChild(card);
  });
}

function fetchMovies() {
  fetch(`${baseURL}/discover/movie`, opcion)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;

      const firstTen = movies.slice(0, 10);
      const secondTen = movies.slice(10, 20);

      renderMovies(firstTen, '#scrolling-wrapper-1');
      renderMovies(secondTen, '#scrolling-wrapper-2');
    })
    .catch(error => {
      console.error('Error al cargar películas:', error);
    });
}

function login (event) {

  event.preventDefault();
}


window.addEventListener('DOMContentLoaded', fetchMovies);

