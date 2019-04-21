function postData(url = ``, data = {}) {
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
}

async function scanQR() {
    const fileUrl = encodeURIComponent(document.getElementById('qrCode').value);

    const response = await postData('/scan', { fileUrl });
    const data = await response.json();

    if (response.status >= 200 && response.status < 400) {
        document.getElementById('scannedContent').textContent = data;
        document.getElementById('submitUpload').style.display = '';
        document.getElementById('scanUpload').style.display = 'none';

    } else {
        errMsg = `Unable to read QR Code. 
            Make sure the image address uses the right file extension and is indeed a QR Code!`;
        document.getElementById('scannedContent').textContent = errMsg;
        document.getElementById('submitUpload').style.display = 'none';
    }
}

function toggleScanUpload(){
    document.getElementById('submitUpload').style.display = 'none';
    document.getElementById('scanUpload').style.display = '';
}

function main() {
    document.getElementById('qrCode').addEventListener('click', toggleScanUpload);
    document.getElementById('scanUpload').addEventListener('click', scanQR);
}

document.addEventListener("DOMContentLoaded", main);