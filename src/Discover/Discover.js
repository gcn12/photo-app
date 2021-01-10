import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import FourImageGrid from './FourImageGrid'
import LocationCards from './LocationCards'
import {

} from './Discover.styles'
 
const Discover = () => {

    const [popularPhotos, setPopularPhotos] = useState([])
    const [placesPhotos, setPlacesPhotos] = useState([])

    const getMostPopular = () => {
        db.collection('preview-posts').orderBy('views', 'desc')
        .limit(4)
        .get()
        .then(data=> {
            const photoArray = []
            data.docs.forEach(item=> {
                photoArray.push(item.data())
            })
            setPopularPhotos([...photoArray])
        })
    }

    const getPlaces = () => {
        db.collection('preview-posts').orderBy('views', 'asc')
        .limit(8)
        .get()
        .then(data=> {
            const photoArray = []
            data.docs.forEach(item=> {
                photoArray.push(item.data())
            })
            setPlacesPhotos([...photoArray])
        })
    }

    useEffect(()=> {
        getMostPopular()
        getPlaces()
    }, [])

    return(
        <div>
            <div>
                <div>Popular this week</div>
                <FourImageGrid photos={popularPhotos} />
            </div>
            <LocationCards photos={placesPhotos} />
        </div>
    )
}

export default Discover