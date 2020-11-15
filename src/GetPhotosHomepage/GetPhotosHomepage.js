import React, { useEffect } from 'react'
import { db } from '../Firebase'
import '../App.css'
import Masonry from 'masonry-layout'

const GetPhotos = () => {

    useEffect(()=>{
        loadPhotos()
    })

    const loadPhotos = () => {
        const photoRef = db.collection('posts')
        photoRef.get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                const image = document.createElement('img')
                image.src = doc.data().image
                image.className = 'grid-item'
                image.onload = grid
                document.getElementById('grid').appendChild(image)
                console.log(doc.data().image)
            })
        })
    }

    // new imagesLoaded( imagesLoaded( document.querySelector('#container'), function( instance ) {
    //     console.log('all images are loaded');
    // }), callback )

    // var statusElem = document.querySelector('.status');
    

    const grid = () => {
        var elem = document.getElementById('grid');
        new Masonry( elem, {
            itemSelector: '.grid-item',
            columnWidth: 120,
            // gutter: 20
        });
    }


    return(
        // <div>
        //     <button onClick={loadPhotos}>Load photos</button>
        // </div>
        <div>
        <button onClick={grid}>Grid</button>
            <div id="grid"></div>
        </div>
    )
}

export default GetPhotos