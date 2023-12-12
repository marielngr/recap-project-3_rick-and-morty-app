import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

//info: 42 Seiten

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    if (response.status === 404) {
      alert("Kein Suchergebnis gefunden.");
      return;
    }
    const data = await response.json();
    console.log(data);
    maxPage = data.info.pages;
    return data.results;
  } catch (error) {
    alert("Fehler beim Abrufen der Daten");
    return null;
  }
}

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
  }
  pagination.textContent = page + "/" + maxPage;
  getCharacters();
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page = page + 1;
  }
  pagination.textContent = page + "/" + maxPage;
  getCharacters();
});

async function getCharacters() {
  const characters = await fetchCharacters();
  console.log(characters);

  cardContainer.innerHTML = ``;

  characters.forEach((character) => {
    const card = CharacterCard(character);
    cardContainer.append(card);
  });
}

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  console.log(data);

  searchQuery = data.query;
  getCharacters();
});

getCharacters();
