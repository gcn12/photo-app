import React from 'react'
import './TakePhoto.css'

const constraints = {
    video: {
    //   width: {
    //     // min: 1280,
    //     ideal: 1920,
    //     max: 2560,
    //   },
    //   height: {
    //     // min: 720,
    //     ideal: 1080,
    //     max: 1440,
    //   },
      facingMode: 'environment',
    },
};


const check = () => {
    var video = document.getElementById('video');
    // if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });
    }else{
        alert("Could not access camera")
    }
}

let useFrontCamera = true;
const video = document.querySelector("#video");

async function initializeCamera() {
    // stopVideoStream();
    constraints.video.facingMode = useFrontCamera ? "user" : "environment";

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){

        video.srcObject = stream;
    })
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

const changeCamera = () => {
    useFrontCamera = !useFrontCamera
    initializeCamera()
}

const TakePhoto = () => {
    return(
        <div>
            <input type="file" accept="image/*" capture="camera"></input>
        {/* <button onClick={check}>Start Stream</button> */}
        <button onClick={initializeCamera}>Start Stream</button>
        <button onClick={photo} id="snap">Take photo</button>
        <button onClick={changeCamera}>Change Camera</button>
        <video id="video" autoPlay></video>
        <canvas id="canvas" width="640" height="480"></canvas>
        </div>
    )
}

export default TakePhoto