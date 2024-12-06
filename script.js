// Array simples para armazenar os filmes
let filmes = [];

// Referências aos elementos do DOM
const filmForm = document.getElementById('film-form');
const filmList = document.getElementById('film-list');
const titleInput = document.getElementById('title');
const directorInput = document.getElementById('director');
const yearInput = document.getElementById('year');
const priorityInput = document.getElementById('movie-priority');
const statusSelect = document.getElementById('movie-status');
const genreSelect = document.getElementById('movie-genre');

// Função para carregar os filmes do localStorage
function loadFilmes() {
  const filmesSalvos = localStorage.getItem('filmes');
  if (filmesSalvos) {
    filmes = JSON.parse(filmesSalvos); 
  }
}

// Função para salvar os filmes no localStorage
function saveFilmes() {
  localStorage.setItem('filmes', JSON.stringify(filmes));
}

// Função para agrupar e ordenar filmes por gênero e prioridade
function listarFilmesPorGeneroEPrioridade(filmes) {
  // Agrupa os filmes por gênero em um objeto
  const filmesPorGenero = filmes.reduce((acc, filme) => {
    if (!acc[filme.genre]) {
      acc[filme.genre] = [];
    }
    acc[filme.genre].push(filme);
    return acc;
  }, {});

  // Ordena os filmes dentro de cada gênero pela prioridade
  for (const genero in filmesPorGenero) {
    filmesPorGenero[genero].sort((a, b) => b.priority - a.priority);
  }

  return filmesPorGenero;
}

// Função para renderizar a lista de filmes agrupados e ordenados
function renderFilmes() {
  filmList.innerHTML = '';  // Limpa a lista antes de renderizar

  // Obter os filmes agrupados e ordenados
  const filmesOrganizados = listarFilmesPorGeneroEPrioridade(filmes);

  // Exibir os filmes agrupados por gênero e ordenados por prioridade
  for (const genero in filmesOrganizados) {
    const generoHeader = document.createElement('h3');
    generoHeader.textContent = `Gênero: ${genero}`;
    filmList.appendChild(generoHeader);

    filmesOrganizados[genero].forEach((filme, index) => {
      const li = document.createElement('li');
      li.classList.add('movie-item');
      li.innerHTML = `
        <span><strong>${filme.title}</strong> (${filme.year}) - ${filme.director}</span>
        <p>Prioridade: ${filme.priority}</p>
        <p>Status: ${filme.status}</p>
        <p>Gênero: ${filme.genre}</p>
        <button onclick="editFilm(${index})">Editar</button>
        <button onclick="deleteFilm(${index})">Excluir</button>
        <button onclick="toggleStatus(${index})" class="status-btn ${filme.status === 'assistido' ? 'status-disabled' : ''}" ${filme.status === 'assistido' ? 'disabled' : ''}>
          ${filme.status === 'assistido' ? 'Assistido' : 'Marcar como Assistido'}
        </button>
      `;
      filmList.appendChild(li);
    });
  }
}

// Função para adicionar um novo filme
function addFilm(event) {
  event.preventDefault();

  const title = titleInput.value;
  const director = directorInput.value;
  const year = yearInput.value;
  const priority = parseInt(priorityInput.value);
  const status = statusSelect.value;
  const genre = genreSelect.value;

  const filme = {
    title,
    director,
    year,
    priority,
    status,
    genre
  };

  filmes.push(filme);

  // Salva os filmes no localStorage
  saveFilmes();

  // Limpa os campos do formulário
  titleInput.value = '';
  directorInput.value = '';
  yearInput.value = '';
  priorityInput.value = '';
  statusSelect.value = 'não-assistido';
  genreSelect.value = 'acao';

  // Re-renderiza a lista de filmes
  renderFilmes();
}

// Função para editar um filme
function editFilm(index) {
  const filme = filmes[index];
  titleInput.value = filme.title;
  directorInput.value = filme.director;
  yearInput.value = filme.year;
  priorityInput.value = filme.priority;
  statusSelect.value = filme.status;
  genreSelect.value = filme.genre;

  // Remove o filme original da lista
  filmes.splice(index, 1);

  // Salva os filmes no localStorage
  saveFilmes();

  // Re-renderiza a lista de filmes
  renderFilmes();
}

// Função para excluir um filme
function deleteFilm(index) {
  filmes.splice(index, 1);

  // Salva os filmes no localStorage
  saveFilmes();

  // Re-renderiza a lista de filmes
  renderFilmes();
}

// Função para alternar o status de assistido
function toggleStatus(index) {
  const filme = filmes[index];

  if (filme.status === 'não-assistido') {
    filme.status = 'assistido';
  }

  // Salva os filmes no localStorage
  saveFilmes();

  // Re-renderiza a lista de filmes após a mudança de status
  renderFilmes();
}

// Função para renderizar filmes após filtros
const moviesList = document.getElementById("moviesList");
const searchName = document.getElementById("searchName");
const filterGenre = document.getElementById("filterGenre");
const filterStatus = document.getElementById("filterStatus");
const filterRanking = document.getElementById("filterRanking");
const applyFilters = document.getElementById("applyFilters");

// Função para renderizar filmes
function renderMovies(filteredMovies) {
  moviesList.innerHTML = ""; // Limpa a lista antes de renderizar
  if (filteredMovies.length === 0) {
    moviesList.innerHTML = "<p>Nenhum filme encontrado.</p>";
    return;
  }
  filteredMovies.forEach(movie => {
    const movieDiv = document.createElement("div");
    movieDiv.className = "movie";
    movieDiv.innerHTML = `
      <strong>${movie.name}</strong> - ${movie.genre} - Ranking: ${movie.ranking} - ${movie.status}
    `;
    moviesList.appendChild(movieDiv);
  });
}

// Filtra os filmes com base nos critérios
function filterMovies() {
  const name = searchName.value.toLowerCase();
  const genre = filterGenre.value;
  const status = filterStatus.value;
  const ranking = filterRanking.value;

  const filteredMovies = filmes.filter(movie => {
    const matchesName = movie.title.toLowerCase().includes(name);
    const matchesGenre = genre === "" || movie.genre === genre;
    const matchesStatus = status === "" || movie.status === status;
    const matchesRanking = ranking === "" || movie.priority === parseInt(ranking);
    return matchesName && matchesGenre && matchesStatus && matchesRanking;
  });

  renderMovies(filteredMovies);
}

// Associando o evento de submit ao formulário
filmForm.addEventListener('submit', addFilm);
applyFilters.addEventListener("click", filterMovies);
searchName.addEventListener("input", filterMovies);

// Carregar filmes ao iniciar a página
loadFilmes();
renderFilmes();
