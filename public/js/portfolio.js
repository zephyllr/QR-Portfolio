async function deleteCard(evt) {
    evt.preventDefault();

    // delete from backend
    const response = await fetchData(`/delete/${this.id}/`);
    const data = await response.json();

    if (response.status >= 200 && response.status < 400) {
        portfolio.allCards = portfolio.allCards.filter(( card ) => card.id !== this.id);
        document.getElementById(this.id).remove();
    } else {
        console.log(data.error); // show error 
    }
}

class AllCards {
    constructor() {
        this.allCards = [];
    }

    filterCards(targetCards) {
        this.allCards.forEach((card) => {
            document.getElementById(card.id).style.display = targetCards.includes(card.cardName) ? '' : 'none';
        });
    }

    showAllCards() {
        this.allCards.forEach((card) => document.getElementById(card.id).style.display = '');
    }
}

class Card {
    constructor(card) {
        this.id = card._id;
        this.cardName = card.cardName;
        this.qrCode = card.qrCode;
        this.cardContent = card.cardContent;
    }

    viewModalImage() {
        const body = document.getElementById('modal-body');
        const img = document.getElementById(this.id).getElementsByTagName('img')[0];
        body.textContent = '';
        body.appendChild(img.cloneNode());

        const title = document.getElementById('modal-title');
        title.textContent = this.cardName;
    }

    render() {
        const viewBtn = createElement('button', { class: 'btn btn-sm btn-outline-secondary btn-card', "data-toggle": "modal", "data-target": "#qrModal" }, 'View');
        viewBtn.addEventListener('click', this.viewModalImage.bind(this));
        const deleteBtn = createElement('button', { class: 'btn btn-sm btn-outline-secondary btn-card' }, 'Delete');
        deleteBtn.addEventListener('click', deleteCard.bind(this));

        const btnGroup = createElement('div', null, null, viewBtn, deleteBtn);
        const btnDiv = createElement('div', { class: 'justify-content-between align-items-center' }, null, btnGroup);
        const name = createElement('h3', null, this.cardName);
        const cardBody = createElement('div', { class: 'card-body' }, null, name, btnDiv);
        const img = createElement('img', { src: this.qrCode, class: 'img-thumbnail' });
        const cardDiv = createElement('div', { class: 'card mb-3 shadow-sm' }, null, img, cardBody);
        const col = createElement('div', { class: 'col-md-3', id: this.id }, null, cardDiv);
        document.getElementById('cards').appendChild(col);
    }
}

async function search(evt) {
    evt.preventDefault();
    const cardName = document.getElementById('searchBar').value;
    const response = await fetchData(`/search/`, { cardName });
    const data = await response.json();

    if (response.status >= 200 && response.status < 400) {
        portfolio.filterCards(data);
    } else {
        console.log(data.error); // show error 
    }
}

function setUserName(username) {
    document.getElementById('username').textContent = username;
}

// initial load of all cards
async function getAllCards() {
    // fetch cards from backend
    const response = await fetch(`/loadPortfolio/`);
    const data = await response.json();

    if (response.status >= 200 && response.status < 400) {
        setUserName(data.username);

        const mainDiv = document.getElementById('cards');
        mainDiv.style.visibility = 'hidden';
        data.cards.forEach((card) => {
            const newCard = new Card(card);
            newCard.render();
            portfolio.allCards.push(newCard);
        });
        mainDiv.style.visibility = ''; // show all rendered
    } else {
        console.log(data.error); // show error 
    }
}

function clearSearch(evt) {
    evt.preventDefault();
    document.getElementById('searchBar').value = null;
    portfolio.showAllCards();
}

function mainPortfolio() {
    getAllCards();
    document.getElementById('searchBar').addEventListener('keyup', search);
    document.getElementById('clearSearch').addEventListener('click', clearSearch);
}

const portfolio = new AllCards();