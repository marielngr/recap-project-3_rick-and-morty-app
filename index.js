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

const characters = await fetchCharacters(page);
console.log(characters);

characters.forEach((character) => {
  const card = CharacterCard(character);
  cardContainer.append(card);
});

//Hier Event-Listener
// - it is prevented that the page index could go higher than the max page index or below 1
// - the page index is increased / decreased
// - the `fetchCharacters` function is called
