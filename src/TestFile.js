import React from 'react'
import fitty from 'fitty'
import './App.css'

const GetPhotos = () => {

    fitty('#test')

    return(
        <div>
            {/* <button onClick={()=>fitty('h1')}>aaaaaa</button> */}
            <div style={{height: 'auto', width: '40vw', backgroundColor: 'goldenrod'}}>
                <h1 id='test'>Hello</h1>
            </div>
        </div>
    )
}

export default GetPhotos