import React from 'react'
import './App.css'
import firebase from 'firebase'

const GetPhotos = (props) => {

    const previewFile = () => { 
        const file = document.querySelector('input[type=file]').files[0]
        const reader2 = new FileReader()
        reader2.readAsDataURL(file);
        reader2.onload = (e) => {
            const fileName = file.name
            const image = document.createElement('img')
            image.src = e.target.result;
            image.onload = function () {
                resizeFile(image, image, fileName);
                const height = this.height;
                const width = this.width;
                console.log(height, width)
            };
        }
    }

    const  resizeFile = (loadedData, preview, fileName) => { 
        const height = loadedData.height
        const width = loadedData.width
        let ratio
        let finalHeight
        let finalWidth
        if (height >= width) {
            ratio = width / height
            finalHeight = 850
            finalWidth = Math.round(ratio * 850)
        }else {
            ratio = height / width
            finalWidth = 850
            finalHeight = Math.round(ratio * 850)
        }
        console.log(ratio, finalHeight, finalWidth)
        let canvas = document.createElement('canvas'),
        ctx;
        canvas.width = finalWidth;
        canvas.height = finalHeight;
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, canvas.width, canvas.height);
        fileUpload(canvas, fileName)
    }

    const fileUpload = (imageData, fileName) => {
        var dataURL = imageData.toDataURL('image/jpeg', 1)
        firebase.storage().ref()
        .child(`${props.user}/${fileName}`)
        .putString(dataURL, 'data_url')
        .then((snapshot) => {
            console.log('Uploaded a blob or file!')
            snapshot.ref.getDownloadURL()
            .then(url=> {
                console.log(url)
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <div>
            <input type="file" onChange={previewFile} />
            <div>
                <h3>Original Image</h3>
                <img alt='' id="source_image" />
            </div>
            <div>
                <h3>Resized Image</h3>
                <div id="result_resize_image">
            </div>
            </div>

            <button onClick={fileUpload}>Upload</button>
        </div>
    )
}

export default GetPhotos