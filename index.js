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
const searchQuery = "";

//info: 42 Seiten

async function fetchCharacters(page) {
  cardContainer.innerHTML = ``;
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
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
  getCharacters(page);

  if (page > 1) {
    page = page - 1;
  } else {
    page == 1;
  }
  pagination.textContent = page + "/" + maxPage;
});

nextButton.addEventListener("click", () => {
  getCharacters(page);

  if (page < maxPage) {
    page = page + 1;
  } else {
    page >= maxPage;
  }
  pagination.textContent = page + "/" + maxPage;
});

async function getCharacters(page) {
  const characters = await fetchCharacters(page);
  console.log(characters);

  characters.forEach((character) => {
    const card = CharacterCard(character);
    cardContainer.append(card);
  });
}

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const elements = event.target.elements;
  console.log(event.target);
});
