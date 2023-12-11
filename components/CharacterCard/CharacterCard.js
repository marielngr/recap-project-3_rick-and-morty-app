export function CharacterCard(props) {
  const card = document.createElement("li");
  const cardContainer = document.querySelector(`[data-js="card-container"]`);
  card.classList.add("card");
  card.innerHTML = `
  <div class="card__image-container">
  <img class="card-image"
    src= ${props.image}
    alt = ${props.name} />
  <div class="card__image-gradient"></div>
  </div>
  <div class="card__content">
     <h2 class="card__title">${props.name}</h2>
  <dl class="card__info">
    <dt class="card__info-title">Status</dt>
    <dd class="card__info-description">${props.status}</dd>
    <dt class="card__info-title">Type</dt>
    <dd class="card__info-description">${props.type}</dd>
    <dt class="card__info-title">Occurrences</dt>
    <dd class="card__info-description">${props.episode}</dd>
  </dl>
</div>
  `;

  return card;
}
