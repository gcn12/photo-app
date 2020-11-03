import React from 'react'
import './TakePhoto.css'

const check = () => {
    var video = document.getElementById('video');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });
    }
}

const photo = () => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function() {
        context.drawImage(video, 0, 0, 640, 480);
    });
}

const TakePhoto = () => {
    return(
        <div>
        <button onClick={check}>Start Stream</button>
        <button onClick={photo} id="snap">Take photo</button>
        <video id="video" width="640" height="480" autoPlay></video>
        <canvas id="canvas" width="640" height="480"></canvas>
        </div>
    )
}

export default TakePhoto