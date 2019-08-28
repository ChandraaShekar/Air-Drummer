const modelParams = {
    flipHorizontal: true,
    imageScaleFactor: 0.7,
    maxNumBoxes: 2,
    iouThreshold: 0.5,
    scoreThreshold: 0.79,
}

navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

const video = document.querySelector("#video");
const audio = document.querySelector("#audio");

let model;

handTrack.startVideo(video).then(status => {
    if (status) {
        navigator.getUserMedia({ video: {} }, stream => {
            video.srcObject = stream;
            setInterval(runDetection, 300);
        }, err => console.log(err))
    }
})

// let h1 = document.querySelector("h1");

function runDetection() {
    model.detect(video).then(predictions => {
        if (predictions.length !== 0) {
            let hand1 = predictions[0].bbox;
            let x = hand1[0]
            let y = hand1[1]
                // h1.innerText(x)
            console.log(x, y)
            if (y > 300) {
                if (x < 200) {
                    audio.src = "audio1.mp3";
                } else if (x > 400) {
                    audio.src = "audio2.mp3";
                } else if (x > 300) {
                    audio.src = "audio3.mp3";
                } else if (x > 200) {
                    audio.src = "audio4.mp3";
                }
                // audio.src = "alarm.mp3"
            }
            audio.play();
        }
    });
}


handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
});