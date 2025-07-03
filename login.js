//Configuración para consumo de API
const baseURL = "https://api.themoviedb.org/3";
const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2QwOGI4ZDU2MTZjMGE2YWFjMTQ3MzlmYzBhMTNkMCIsIm5iZiI6MTc0OTc0MTA1Ny45MSwic3ViIjoiNjg0YWVlMDEyOTNlOTQ2Nzk0OWY1ZjUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.7-iCoUCPXGVZbJxpNIklcX2kKHaLCoLpfWsyk47opsQ";
const opcion = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiToken}`
  }
};

let requestToken = "";

// Obtener el token al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  requestLoginToken();
});

function requestLoginToken() {
  fetch(`${baseURL}/authentication/token/new`, opcion)
    .then(response => response.json())
    .then(data => {
      requestToken = data.request_token;
    })
    .catch(error => console.log(error.message));
}

// Función principal de login actualizada
function login(event) {
  event.preventDefault(); // Evita que se recargue la página

  const inputEmail = document.getElementById("inputEmail").value;
  const inputPassword = document.getElementById("inputPassword").value;

  if (!inputEmail || !inputPassword) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const opcionsLogin = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`
    },
    body: JSON.stringify({
      username: inputEmail,
      password: inputPassword,
      request_token: requestToken
    })
  };

  fetch(`${baseURL}/authentication/token/validate_with_login`, opcionsLogin)
    .then(response => response.json())
    .then(data => {
      if (data.success === true) {
        navigateToIndex();
      } else {
        alert(data.status_message);
      }
    })
    .catch(error => console.log(error.message));
}

// Redireccionar a IndexP.html si login es exitoso
function navigateToIndex() {
  window.location.href = `index.html`;
}


