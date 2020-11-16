import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import '../App.css'
import Masonry from 'masonry-layout'
import Spinner from '../Spinner/Spinner'

const DisplayPhoto = (props) => {
    useEffect(()=> {
        props.grid()
    })
    return(
        <div>
            <a href={props.url}><img className='grid-item' alt='' src={props.image}></img></a>
        </div>
    )
}

const GetPhotos = (props) => {

    useEffect(()=>{
        loadPhotos()
    })

    const [photos, setPhotos] = useState(null)

    const loadPhotos = () => {
        const photoRef = db.collection('posts')
        photoRef.get()
        .then(snapshot => {
            const photosArray = []
            snapshot.docs.forEach(doc => {
                // const image = document.createElement('img')
                // image.src = doc.data().image
                // image.className = 'grid-item'
                // image.onload = grid
                // document.getElementById('grid').appendChild(image)
                photosArray.push(doc.data())
            })
            setPhotos(photosArray)
        })
        props.setIsLoading(false)
    }
    

    const grid = () => {
        var elem = document.getElementById('grid');
        new Masonry( elem, {
            itemSelector: '.grid-item',
            columnWidth: 120,
            // gutter: 20
        });
    }
    return(
        <div>
            <div id="grid">
                {photos ? photos.map(photo=> {
                    return(
                        <DisplayPhoto grid={grid} url={photo.image} image={photo.image}/>
                    )
                })
                :
                null}
            </div>
        </div>
    )
}

const GetPhotosSpinner = Spinner(GetPhotos)


const GetPhotosContainer = () => {

    const [isLoading, setIsLoading] = useState(false)

    return(
        <GetPhotosSpinner setIsLoading={setIsLoading} isLoading={isLoading}/>
    )
}

export default GetPhotosContainer