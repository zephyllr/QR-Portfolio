function createElement(ele, attrs, txt, ...children) {
    const node = document.createElement(ele);
    for (const a in attrs) { node.setAttribute(a, attrs[a]); }
    node.textContent = txt;
    for (let i = 0; i < children.length; i++) {
        node.appendChild(children[i]);
    }
    return node;
}

class Card {
    constructor(card) {
        this.cardName = card.cardName;
        this.qrCode = card.qrCode;
        this.cardContent = card.cardContent;
    }

    render() {
        const btns = [
            createElement('button', { class: 'btn btn-sm btn-outline-secondary btn-card' }, 'View'),
            createElement('button', { class: 'btn btn-sm btn-outline-secondary btn-card' }, 'Rename'),
            createElement('button', { class: 'btn btn-sm btn-outline-secondary btn-card' }, 'Delete'),
        ];
        const btnGroup = createElement('div', { class: 'btn-group' }, null, ...btns);
        const btnDiv = createElement('div', { class: 'd-flex justify-content-between align-items-center' }, null, btnGroup);
        const name = createElement('h3', null, this.cardName);
        const cardBody = createElement('div', { class: 'card-body' }, null, name, btnDiv);
        const img = createElement('img', { src: this.qrCode, class: 'img-thumbnail' });
        const cardDiv = createElement('div', { class: 'card mb-3 shadow-sm' }, null, img, cardBody);
        const col = createElement('div', { class: 'col-md-3' }, null, cardDiv);
        document.getElementById('cards').appendChild(col);
    }
}

function setUserName(username){
    document.getElementById('username').textContent = username;
}

// initial load of all cards
async function getAllCards() {
    // fetch messages from backend
    const response = await fetch(`/search/`);
    const data = await response.json();

    if (response.status >= 200 && response.status < 400) {
        setUserName(data.username);

        const mainDiv = document.getElementById('cards');
        mainDiv.style.visibility = 'hidden';
        data.cards.forEach((card) => {
            const newCard = new Card(card);
            newCard.render();
        });
        mainDiv.style.visibility = ''; // show all rendered
    } else {
        console.log(data.error); // show error 
    }
}

function main() {
    getAllCards();
}

document.addEventListener("DOMContentLoaded", main);