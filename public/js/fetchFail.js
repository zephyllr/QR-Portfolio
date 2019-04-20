function readQR() {
    // add event listener to question btn
    document.getElementById('submitImage').addEventListener('click', uploadQR);

    const qrImage = document.getElementById('qrImage');

    // fetch from api
    const upload = (file) => {
        fetch('http://api.qrserver.com/v1/read-qr-code/', { // Your POST endpoint
            method: 'POST',
            mode: 'no-cors',
            headers: {
                "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryFzcIHnzpBRCPZTuS",
            },
            body: { MAX_FILE_SIZE: 1048576, file } // This is your file object
        }).then(
            response => console.log(response) // if the response is a JSON object
        ).then(
            success => console.log(success) // Handle the success response object
        ).catch(
            error => console.log(error) // Handle the error response object
        );
    };

    // add event listener to file upload
    const onSelectFile = () => upload(qrImage.files[0]);
    qrImage.addEventListener('change', onSelectFile, false);
}


function xhr(evt) {
    evt.preventDefault();
    const data = new FormData();
    const qrImage = document.getElementById('qrImage').files[0];
    data.append("file", qrImage);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://api.qrserver.com/v1/read-qr-code/");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader('Access-Control-Allow-Origin','*');
    xhr.setRequestHeader("postman-token", "e89b6a84-89a2-2105-1658-3a8751d2f303");

    xhr.send(data);
}


function fetch() {
    const form = new FormData();
    const qrImage = document.getElementById('qrImage').files[0];
    form.append("file", qrImage);

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://api.qrserver.com/v1/read-qr-code/",
        "method": "POST",
        "headers": {
            'Access-Control-Allow-Origin': '*',
            "cache-control": "no-cache",
            "postman-token": "337e1e50-b7ff-f388-39e6-c3c6a174536e"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}


function main() {
    const uploadBtn = document.getElementById("uploadBtn");
    uploadBtn.addEventListener('click', xhr);
}

document.addEventListener("DOMContentLoaded", main);