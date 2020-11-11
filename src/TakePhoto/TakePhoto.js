import React from 'react'
import './TakePhoto.css'


// const button = document.getElementById('button');

// button.addEventListener('click', event => {
//     const constraints = {
//       video: true,
//       audio: false
//     };
//     navigator.mediaDevices
//       .getUserMedia(constraints)
//       .then(stream => {
//         video.srcObject = stream;
//       })
//       .catch(error => {
//         console.error(error);
//       });
// });

const photo = () => {
    const video = document.getElementById('video');
    const constraints = {
      video: true,
      audio: false
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(error => {
        console.error(error);
      });
};

const TakePhoto = () => {
    return(
        <div>
            <button id="button" onClick={photo}>Get camera</button>
            <video id="video" autoplay playsinline></video>
        {/* <input type="file" accept="image/*" capture="camera"></input> */}
        </div>
    )
}

export default TakePhoto