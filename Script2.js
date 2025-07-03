const baseURL = 'https://api.themoviedb.org/3'

const ImageUrl = "https://image.tmdb.org/t/p/w500"
const API_KEY = '67d08b8d5616c0a6aac14739fc0a13d0'

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams (window.location.search)
    const movieId = params.get ('id')

    if ( !movieId ) {
        document.getElementById('descripcion').innerHTML = "<h2>No se encontro informacion</h2>"
        return
    } 
    fetch (`${baseURL}/movie/${movieId}?api_key=${API_KEY}&language=en-EN`)
    .then (res => res.json())
    .then (data =>{
        document.getElementById ('imagen').src=`${ImageUrl}${data.backdrop_path}`
        document.getElementById ('titulo').textContent= data.title
        document.getElementById ('fecha').textContent=data.release_date
        document.getElementById ('duracion').textContent=data.runtime
        document.getElementById ('generos').textContent=`${data.genres.map(g => g.name).join(", ")}`
    })
})
