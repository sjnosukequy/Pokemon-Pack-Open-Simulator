import spinCard from "../../component/dyanmic/spinCard/spinCard.js";

const tcgdex = new TCGdex('en');

const SpinCard = new spinCard();

const contentContainer = document.getElementById('content');
const loaderContiner = document.getElementById('loader-container');
const notFoundContainer = document.getElementById('not-found-container');
const pageContent = document.getElementById('inner-content');
const packContainer = document.getElementById('pack-container');
const cardsContainer = document.getElementById('cards-container');
const peekLeft = document.getElementById('peek-left');
const peekRight = document.getElementById('peek-right');
const packOpen = document.getElementById('pack-open');
const resetContainer = document.getElementById('reset-container');
const resetButton = document.getElementById('reset-button');
const setName = document.getElementById('set-name');
const releaseDate = document.getElementById('release-date');
const setImage = document.getElementById('set-image');

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

lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'disableScrolling': true,
    'alwaysShowNavOnTouchDevices': true,
})
// Get the query string from the current URL
const queryString = window.location.search;
// Create a URLSearchParams object from the query string
const urlParams = new URLSearchParams(queryString);
// Get the value of the 'id' parameter
const pokemonId = urlParams.get('id');
const packSize = 10
let openIdx = 0
const packCards = []
const openedCards = []

let cards = [];

async function fetchSet() {
    const set = await tcgdex.fetchSet(pokemonId);
    // const set = await fetch('./example.json').then(res => res.json());
    if (set.status) {
        throw new Error(set.title);
    }
    setName.textContent = set.name;
    releaseDate.textContent = 'Released: ' + set.releaseDate;
    setImage.src = set.logo + '.webp';
    setImage.setAttribute('loading', 'lazy');
    cards = set.cards;
    // console.log(cards)
}

function setupGame() {
    for (let index = 0; index < packSize; index++) {
        const randomTimes = Math.floor(Math.random() * 3) + 3;
        let sum = 0;

        for (let i = 0; i < randomTimes; i++) {
            sum += Math.random();
        }
        const randomIndex = Math.floor(sum / randomTimes * cards.length);
        const card = cards[randomIndex];
        packCards.push(card);
        if (index === packSize - 1) {
            var cardElement = SpinCard.createCard(card.image + '/low.webp');
        }
        else {
            var cardElement = document.createElement('img')
            cardElement.src = `${card.image}/low.webp`;
            cardElement.setAttribute('loading', 'lazy');
            cardElement.classList.add('non-spin-card');
        }
        cardElement.id = `poke-card-${index}`
        Object.assign(cardElement.style, {
            position: 'absolute',
            inset: '0',
            transform: `translateZ(${index * 6}px)`,
        });
        packContainer.appendChild(cardElement);
        // break;
    }
}

function addToCardsContainer(cardImage, cardName) {
    const cardElement = document.createElement('a')
    const cardImageEl = document.createElement('img');
    cardImageEl.src = `${cardImage}/low.webp`;
    cardElement.href = `${cardImage}/high.webp`;
    cardElement.setAttribute("data-lightbox", "card-container");
    cardElement.setAttribute("data-title", `${cardName}`);
    cardElement.classList.add('container-card');
    cardImageEl.setAttribute('loading', 'lazy');
    cardElement.appendChild(cardImageEl);
    cardsContainer.appendChild(cardElement);
}

function resetGame() {
    openIdx = 0
    packCards.length = 0
    document.querySelector('#pack-container').classList.toggle('opened-pack', false);
    setupGame();
    resetContainer.classList.toggle('hidden', true);
}

function openPack() {
    if (openIdx == 0) {
        document.querySelector(`#poke-card-${packSize - 1} .card-container`).classList.toggle('flipped-card', true);
        document.querySelector('#pack-container').classList.toggle('opened-pack', true);
    } else if (openIdx > packSize) {
        console.log('Pack is already opened');
    } else {
        const card = document.querySelector(`#poke-card-${packSize - openIdx}`);
        const currentIdx = openIdx;
        card.classList.toggle('discard-card', true);
        Object.assign(card.style, {
            top: `200px`,
            opacity: '0',
        });
        setTimeout(() => {
            card.remove();
            openedCards.push(packCards[packSize - currentIdx]);
            addToCardsContainer(packCards[packSize - currentIdx].image, packCards[packSize - currentIdx].name);
        }, 1000);
        if (openIdx === packSize) {
            resetContainer.classList.toggle('hidden', false);
        }
    }
    openIdx = Math.min(openIdx + 1, packSize + 1);
}

function setupEvents() {
    peekLeft.addEventListener('mouseover', () => {
        if (document.querySelector('.opened-pack'))
            packContainer.classList.toggle('peeked-left', true);
    })
    peekLeft.addEventListener('mouseout', () => {
        packContainer.classList.toggle('peeked-left', false);
    })
    peekRight.addEventListener('mouseover', () => {
        if (document.querySelector('.opened-pack'))
            packContainer.classList.toggle('peeked-right', true);
    })
    peekRight.addEventListener('mouseout', () => {
        packContainer.classList.toggle('peeked-right', false);
    })
    packOpen.addEventListener('click', openPack);
    resetButton.addEventListener('click', resetGame);
}

async function main() {
    try {
        loaderControl(true, contentContainer);
        await fetchSet();
        setupEvents();
        setupGame();

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