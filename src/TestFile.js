import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import './App.css'

const GetPhotos = (props) => {

    const [showDiv, setShowDiv] = useState(false)

    return(
        <div>
            <div style={{marginTop: '105px', position: 'relative'}}></div>
            <button onClick={()=> setShowDiv(!showDiv)}>press</button>
        <div style={{marginTop: '105px', position: 'relative'}}>
            <CSSTransition
            in={showDiv}
            timeout={300}
            classNames="alert"
            unmountOnExit
            >
            <div className='test-container'>text</div>
            </CSSTransition>
            <div style={{marginTop: '200px'}}></div>
        </div>

        </div>
    )
}

export default GetPhotos