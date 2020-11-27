import React, { useState } from 'react'
import { 
    Framer,
} from './TestFile.styles'
// import { db } from './Firebase'

const QueryTest = (props) => {

    const [click, setClick] = useState(false)

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: .4 },
    }

    return(
        <div>
            <button onClick={()=>setClick(!click)}>click</button>
            <Framer animate={click ? 'hidden' : 'visible'} variants={variants} >
                <input></input>
            </Framer>
        </div>
    )
}

export default QueryTest