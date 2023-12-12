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

//jetzt Event-Listener mit if else, wenn werte <0 oder >42 wieder auf 1 bzw 42 setzen
// nicht vergessen Inhalt leeren mit innerHTML und leerem string, vor Aufruf von getCharacters, sonst pappt alles untereinander
// - it is prevented that the page index could go higher than the max page index or below 1
// - the page index is increased / decreased

// nextButton.addEventListener("click", getCharacters(page), console.log("hello"));

nextButton.addEventListener("click", () => {
  getCharacters(page);
  page = page + 1;
  pagination.textContent = page + "/" + maxPage;
  console.log("hello");
});

async function getCharacters(page) {
  const characters = await fetchCharacters(page);
  console.log(characters);

  characters.forEach((character) => {
    const card = CharacterCard(character);
    cardContainer.append(card);
  });
}

getCharacters(page);

//später muss pagecounter aktuelle page und maxpage anzeigen
