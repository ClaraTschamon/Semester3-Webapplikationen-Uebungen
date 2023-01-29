//Clara Tschamon
const params = new URLSearchParams(window.location.search);
let videoName = params.get("videoName");

let videoStream = document.getElementById('videoStream');

videoStream.setAttribute("src", videoName);
videoStream.load();
videoStream.play();