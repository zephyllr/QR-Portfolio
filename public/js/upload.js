function createElement(ele, attrs, txt, ...children) {
    const node = document.createElement(ele);
    for (const a in attrs) { node.setAttribute(a, attrs[a]); }
    node.textContent = txt;
    for (let i = 0; i < children.length; i++) {
        node.appendChild(children[i]);
    }
    return node;
}

function saveQR(evt){

}

function checkQRStatus(){
    const uploadFrame = document.getElementById("uploadFrame");
    const response = uploadFrame.contentDocument.getElementsByTagName("pre");
    if (response.length == 1){ 
        response = response[0];
        uploadFrame.style.visibility = 'hidden';
        console.log(response);
    }
}

function main() {
    // add event listener to iframe form
    const uploadFrame = document.getElementById("uploadFrame");
    uploadFrame.addEventListener('load', checkQRStatus);
}

document.addEventListener("DOMContentLoaded", main);