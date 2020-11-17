import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import '../App.css'
import Masonry from 'masonry-layout'
import { Image } from './GetPhotosHomepage.styles'
// import Spinner from '../Spinner/Spinner'

const DisplayPhoto = (props) => {
    useEffect(()=> { 
        props.grid()
    })
    return(
        <div>
            <a href={props.url}><Image onClick={()=>props.setPhotoInformation(props.photoInfo)} className='grid-item' alt='' src={props.photoInfo.image}></Image></a>
        </div>
    )
}

const GetPhotos = (props) => {

    useEffect(()=>{
        loadPhotos()
    }, [])

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
        // props.setIsLoading(false)
    }
    

    const grid = () => {
        var elem = document.getElementById('grid');
        new Masonry( elem, {
            itemSelector: '.grid-item',
            columnWidth: 120,
        });
    }
    return(
        <div>
            <div id="grid">
                {photos ? photos.map((photo, index)=> {
                    return(
                        <DisplayPhoto setPhotoInformation={props.setPhotoInformation} key={index} grid={grid} photoInfo={photo} />
                    )
                })
                :
                null}
            </div>
        </div>
    )
}

// const GetPhotosSpinner = Spinner(GetPhotos)


// const GetPhotosContainer = () => {

//     const [isLoading, setIsLoading] = useState(false)

//     return(
//         <GetPhotosSpinner setIsLoading={setIsLoading} isLoading={isLoading}/>
//     )
// }

export default GetPhotos