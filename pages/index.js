// Instantiate the SDK
const tcgdex = new TCGdex('en');
const packsContainer = document.getElementById('packs');
const loader = document.getElementById('loader');

class packs {
    constructor(name, image, id, cardCount) {
        this.name = name;
        this.image = image;
        this.id = id;
        this.cardCount = cardCount;
    }
    addToPage(element) {
        const packDiv = document.createElement('a');
        const packName = document.createElement('p');
        const packImage = document.createElement('img');
        const container = document.createElement('div');
        const cardCount = document.createElement('p');
        packName.textContent = this.name;
        packImage.src = this.image;
        cardCount.textContent = 'total cards: \n'+this.cardCount;
        packDiv.href = `set/set.html?id=${this.id}`;
        packImage.setAttribute('loading', 'lazy');
        container.appendChild(packImage);
        packDiv.appendChild(packName);
        packDiv.appendChild(container);
        packDiv.appendChild(cardCount);
        packDiv.classList.add('pack');
        packName.classList.add('pack-name');
        container.classList.add('pack-container');
        cardCount.classList.add('pack-card-count');
        element.appendChild(packDiv);
    }
}

function loaderControl(show, element){
    // console.log(element.classList)
    if(show){
        element.classList.toggle('hidden', true);
        loader.classList.toggle('hidden', false);
    }
    else{
        element.classList.toggle('hidden', false);
        loader.classList.toggle('hidden', true);
    }
}

async function getPokemonData(pokemonName) {
    loaderControl(true, packsContainer);
    console.log(tcgdex)
    const sets = await tcgdex.fetchSets();
    loaderControl(false, packsContainer);
    for (let set of sets) {
        if(!set.logo) continue;
        let div = new packs(set.name, set.logo + '.webp', set.id, set.cardCount.official);
        div.addToPage(packsContainer);
    }
}

getPokemonData('Pikachu');