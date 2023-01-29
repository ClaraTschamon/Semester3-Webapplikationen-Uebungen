//Clara Tschamon
const express = require('express');
const fs = require('fs');
/*
* an express app allows us to create different urls and endpoints that a user can navigate
* to in a browser... and then we define code for the server to handle those requests.
* */
const app = express();
let theVideoPath = null;

/*
* app.get()... get data from the server... the first argument is the url that the user navigates to.
* */
app.get('/', (req, res) => {
    let fileName = "videos/" + req.query.videoName;
    console.log(fileName)

    if (fileName === "videos/undefined") {
        res.sendFile(__dirname + "/index.html");
        return;
    }
    //fileName = "videos/" + fileName;
    if (!fileName.endsWith(".mp4")) {
        fileName = fileName + ".mp4";
    }
    if (fs.existsSync(fileName)) {
        theVideoPath = fileName;
        res.sendFile(__dirname + "/videoStream.html");
    } else {
        res.sendFile(__dirname + "/error.html");
    }
})

app.get("/client.js", function (req, res) {
    res.sendFile(__dirname + "/client.js");
});

app.get('/videoplayer', (req, res) => {
    const range = req.headers.range
    //const videoPath = 'bigBuckBunny.mp4';
    const videoPath = theVideoPath;
    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers)
    const stream = fs.createReadStream(videoPath, {
        start,
        end
    })
    stream.pipe(res)
})
app.listen(8080);