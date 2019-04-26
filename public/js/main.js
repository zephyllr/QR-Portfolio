function fetchData(url = ``, data = {}) {
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
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

function main(){
    if (document.getElementById('createPage')){mainCreate();}
    if (document.getElementById('portfolioPage')){mainPortfolio();}
    if (document.getElementById('uploadPage')){mainUpload();}
}

document.addEventListener("DOMContentLoaded", main);