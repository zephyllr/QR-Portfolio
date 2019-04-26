function renderQR() {
    const cardContent = document.getElementById('cardContent').value;
    const size = 225;
    let api = `http://api.qrserver.com/v1/create-qr-code/?data=${cardContent}&size=${size}x${size}`;
    if (!cardContent) {
        api = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmmUAO9kR7dbcHmMUXqDSk7Bzo0VDIG223CiYWsWcPj4akKzoGqA`;
    }
    document.getElementById('qrImage').setAttribute('src', api);
    document.getElementById('submitCreate').style.display = '';
    document.getElementById('previewCreate').style.display = 'none';
}

function togglePreviewCreate() {
    document.getElementById('submitCreate').style.display = 'none';
    document.getElementById('previewCreate').style.display = '';
}

function main() {
    document.getElementById('cardContent').addEventListener('click', togglePreviewCreate);
    document.getElementById('previewCreate').addEventListener('click', renderQR);
}

document.addEventListener("DOMContentLoaded", main);