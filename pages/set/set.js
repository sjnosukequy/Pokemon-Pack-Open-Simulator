import hoverCard from '../../component/dyanmic/hoverCard/hoverCard.js';
import funButton from '../../component/dyanmic/funButton/funButton.js';

const tcgdex = new TCGdex('en');
const HoverCard = new hoverCard();
const FunButton = new funButton();
const contentContainer = document.getElementById('content');
const loaderContiner = document.getElementById('loader-container');
const setName = document.getElementById('set-name');
const releaseDate = document.getElementById('release-date');
const cardsContainer = document.getElementById('cards-container');
const setImage = document.getElementById('set-image');
const pokeBallContainer = document.getElementById('poke-ball-container');
const pokeBallContainerPadder = document.getElementById('poke-ball-container-padder');
const featuredContainer = document.getElementById('featured-card');
const notFoundContainer = document.getElementById('not-found-container');
const pageContent = document.getElementById('inner-content');

function loaderControl(show, element) {
    // console.log(element.classList)
    if (show) {
        element.classList.toggle('hidden', true);
        loaderContiner.classList.toggle('hidden', false);
    }
    else {
        element.classList.toggle('hidden', false);
        loaderContiner.classList.toggle('hidden', true);
    }
}

function pokeBallLoaderControl(show, element) {
    // console.log(element.classList)
    if (show) {
        pokeBallContainer.classList.toggle('hidden', false);
        pokeBallContainerPadder.classList.toggle('hidden', false);
        element.classList.toggle('hidden', true);
    }
    else {
        pokeBallContainer.classList.toggle('hidden', true);
        pokeBallContainerPadder.classList.toggle('hidden', true);
        element.classList.toggle('hidden', false);
    }
}

// Get the query string from the current URL
const queryString = window.location.search;
// Create a URLSearchParams object from the query string
const urlParams = new URLSearchParams(queryString);
// Get the value of the 'id' parameter
const pokemonId = urlParams.get('id');

class FeaturedCard {
    static name = ''
    static image = ''
    static description = ''
    static rarity = ''
    static type = []
    static category = ''

    static async createFeaturedCard(id) {
        pokeBallLoaderControl(true, featuredContainer);
        const card = await tcgdex.fetchCard(id);
        console.log(card)
        this.name = card.name;
        this.image = card.image + '/high.webp';
        this.rarity = card.rarity;
        this.category = card.category;
        if (card.category == "Pokemon") {
            this.description = card.description;
            this.type = card.types || [];
        }
        else
            this.description = card.effect;
        const div = document.createElement('div');
        const cardDiv = document.createElement('div');
        const hoverCard = HoverCard.createCard(this.image);
        const featuredName = document.createElement('p');
        const featuredDescription = document.createElement('p');
        const featuredRarity = document.createElement('p');
        const featuredCategory = document.createElement('p');
        const featuredType = document.createElement('p');

        featuredName.classList.add('featured-name');
        featuredRarity.classList.add('featured-rarity');
        featuredCategory.classList.add('featured-category');
        featuredType.classList.add('featured-type');
        featuredDescription.classList.add('featured-description');
        cardDiv.classList.add('featured-card-div');

        featuredName.textContent = this.name;
        featuredRarity.textContent = 'Rarity: ' + this.rarity;
        featuredCategory.textContent = 'Category: ' + this.category;
        featuredType.textContent = 'Type: ' + this.type.join(', ');
        featuredDescription.textContent = this.description;

        cardDiv.appendChild(hoverCard);
        div.appendChild(cardDiv);
        div.appendChild(featuredName);
        div.appendChild(featuredRarity);
        div.appendChild(featuredCategory);
        div.appendChild(featuredType);
        div.appendChild(featuredDescription);
        featuredContainer.children[0].replaceWith(div);
        pokeBallLoaderControl(false, featuredContainer);
    }
}

class Card {
    constructor(id, name, image) {
        this.id = id
        this.name = name
        this.image = image
    }
    addToPage(element) {
        const packDiv = document.createElement('div');
        const packName = document.createElement('p');
        const packImage = document.createElement('img');
        packName.textContent = this.name;
        packImage.src = this.image;
        packImage.setAttribute('loading', 'lazy');
        packDiv.appendChild(packName);
        packDiv.appendChild(packImage);
        packDiv.classList.add('card');
        packName.classList.add('card-name');
        packImage.classList.add('card-image');
        packDiv.addEventListener('click', () => {
            FeaturedCard.createFeaturedCard(this.id);
        })
        element.appendChild(packDiv);
    }
}

async function fetchSet() {
    const set = await tcgdex.fetchSet(pokemonId);
    if (set.status) {
        throw new Error(set.title);
    }
    setName.textContent = set.name;
    releaseDate.textContent = 'Released: ' + set.releaseDate;
    setImage.src = set.logo + '.webp';
    setImage.setAttribute('loading', 'lazy');
    for (let card of set.cards) {
        if (!card.image) continue;
        let cardDiv = new Card(card.id, card.name, card.image + '/low.webp');
        cardDiv.addToPage(cardsContainer);
    }
    console.log(set)
}

async function main() {
    try {
        loaderControl(true, contentContainer);
        await fetchSet();
        const button = FunButton.createButton('Play Now', `/pages/game/game.html?id=${pokemonId}`);
        document.getElementById('fun-button').replaceWith(button);
        // document.getElementById('fun-button').appendChild(button);
    }
    catch (e) {
        console.log(e);
        notFoundContainer.classList.toggle('hidden', false);
        pageContent.classList.toggle('hidden', true);
    }
    finally {
        loaderControl(false, contentContainer);
    }
}

main();


// const card = HoverCard.createCard();
// document.body.appendChild(card);