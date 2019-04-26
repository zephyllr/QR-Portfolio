async function scanQR() {
    const fileUrl = encodeURIComponent(document.getElementById('qrCode').value);

    const response = await fetchData('/scan', { fileUrl });
    const data = await response.json();

    if (response.status >= 200 && response.status < 400) {
        document.getElementById('scannedContent').textContent = data;
        document.getElementById('submitUpload').style.display = '';
        document.getElementById('scanUpload').style.display = 'none';
    } else {
        errMsg = `Unable to read QR Code. 
            Make sure the image address uses the right file extension and is a proper QR Code!`;
        document.getElementById('scannedContent').textContent = errMsg;
        document.getElementById('submitUpload').style.display = 'none';
    }
}

function toggleScanUpload() {
    document.getElementById('submitUpload').style.display = 'none';
    document.getElementById('scanUpload').style.display = '';
}

function mainUpload() {
    document.getElementById('qrCode').addEventListener('click', toggleScanUpload);
    document.getElementById('scanUpload').addEventListener('click', scanQR);
}
