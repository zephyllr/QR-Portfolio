class AllCards {
    constructor() {
        this.allCards = [];
    }

    filterCards(targetCards){
        this.allCards.forEach((card) => {
            if (targetCards.includes(card.cardName)){
                card.node.style.display = '';
            }else{
                card.node.style.display = 'none';
            }
        });
    }

    showAllCards(){
        this.allCards.forEach((card) => card.node.style.display = '');
    }
}

class Card {
    constructor(card) {
        this.id = card._id;
        this.cardName = card.cardName;
        this.qrCode = card.qrCode;
        this.cardContent = card.cardContent;
        this.node = null;
    }

    render() {
        const btns = [
            createElement('button', { class: 'btn btn-sm btn-outline-secondary btn-card' }, 'View'),
            createElement('button', { class: 'btn btn-sm btn-outline-secondary btn-card' }, 'Delete'),
        ];
        const btnGroup = createElement('div', { class: 'btn-group' }, null, ...btns);
        const btnDiv = createElement('div', { class: 'd-flex justify-content-between align-items-center' }, null, btnGroup);
        const name = createElement('h3', null, this.cardName);
        const cardBody = createElement('div', { class: 'card-body' }, null, name, btnDiv);
        const img = createElement('img', { src: this.qrCode, class: 'img-thumbnail' });
        const cardDiv = createElement('div', { class: 'card mb-3 shadow-sm' }, null, img, cardBody);
        const col = createElement('div', { class: 'col-md-3', id: this.id }, null, cardDiv);
        document.getElementById('cards').appendChild(col);
        this.node = col;
    }
}

function createElement(ele, attrs, txt, ...children) {
    const node = document.createElement(ele);
    for (const a in attrs) { node.setAttribute(a, attrs[a]); }
    node.textContent = txt;
    for (let i = 0; i < children.length; i++) {
        node.appendChild(children[i]);
    }
    return node;
}

function fetchData(url = ``, data = {}) {
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
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

function main() {
    getAllCards();
    document.getElementById('searchBar').addEventListener('keyup', search);
    document.getElementById('clearSearch').addEventListener('click', clearSearch);
}

const portfolio = new AllCards();
document.addEventListener("DOMContentLoaded", main);