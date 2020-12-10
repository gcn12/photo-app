import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import FourImageGrid from './FourImageGrid'
import {

} from './Discover.styles'
 
const Discover = () => {

    const [popularPhotos, setPopularPhotos] = useState([])

    const getMostPopular = () => {
        db.collection('preview-posts').orderBy('views', 'desc')
        .limit(8)
        .get()
        .then(data=> {
            const photoArray = []
            data.docs.forEach(item=> {
                photoArray.push(item.data())
            })
            setPopularPhotos([...photoArray])
        })
    }

    useEffect(()=> {
        getMostPopular()
    }, [])

    return(
        <div>
            <div>
                <div>Popular this week</div>
                <FourImageGrid photos={popularPhotos} />
            </div>
        </div>
    )
}

export default Discover