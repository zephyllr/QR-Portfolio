function renderQR(){
    const cardContent = document.getElementById('cardContent').value;
    const size = 225;
    let api = `http://api.qrserver.com/v1/create-qr-code/?data=${cardContent}&size=${size}x${size}`;
    if (!cardContent){
        api = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmmUAO9kR7dbcHmMUXqDSk7Bzo0VDIG223CiYWsWcPj4akKzoGqA`;
    }
    document.getElementById('qrImage').setAttribute('src', api);
}

function main() {
    document.getElementById('cardContent').addEventListener('keyup', renderQR);
}

document.addEventListener("DOMContentLoaded", main);