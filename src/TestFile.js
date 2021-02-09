import React from 'react'
import { testFunction } from './Functions'
// import { db } from './Firebase'

const GetPhotos = () => {
    
    const test = () => {
        testFunction()
        .then(data=> {
            console.log(data.docs[0].data())
        })
    }

    return(
        <div style={{marginTop: '150px'}}>
            <button onClick={test}>Add profiles</button>
        </div>
    )
}

export default GetPhotos