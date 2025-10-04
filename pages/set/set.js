import hoverCard from '../../component/dyanmic/hoverCard/hoverCard.js';

const tcgdex = new TCGdex('en');
const HoverCard = new hoverCard();
const contentContainer = document.getElementById('content');
const loaderContiner = document.getElementById('loader-container');
const setName = document.getElementById('set-name');
const releaseDate = document.getElementById('release-date');
const cardsContainer = document.getElementById('cards-container');
const notFoundContainer = document.getElementById('not-found-container');

function loaderControl(show, element){
    // console.log(element.classList)
    if(show){
        element.classList.toggle('hidden', true);
        loaderContiner.classList.toggle('hidden', false);
    }
    else{
        element.classList.toggle('hidden', false);
        loaderContiner.classList.toggle('hidden', true);
    }
}

// Get the query string from the current URL
const queryString = window.location.search;
// Create a URLSearchParams object from the query string
const urlParams = new URLSearchParams(queryString);
// Get the value of the 'id' parameter
const pokemonId = urlParams.get('id');

console.log(pokemonId)

loaderControl(false, contentContainer);

async function fetchSet() {
    // const set = await tcgdex.fetchSet(pokemonId);
    // console.log(set)
}

fetchSet();

// const card = HoverCard.createCard();
// document.body.appendChild(card);