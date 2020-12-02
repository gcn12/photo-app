import React, { useState } from 'react'
import { db } from '../Firebase'
import {
    Container,
    UL,
    LI,
} from './Subheader.styles'


const Subheader = (props) => {

    const [selected, setSelected] = useState('assorted')

    const sort = (value) => {
        setSelected(value)
        db.collection('preview-posts').orderBy(value, 'desc')
        .limit(10)
        .get()
        .then(data=> {
            const photoArray = []
            data.docs.forEach(item=> {
                photoArray.push(item.data())
            })
            props.setHomePhotoInformation([...photoArray])
        })
    }

    return(
        <Container>
            <UL>
                <LI underline={selected === 'assorted' ? true : false}>Assorted</LI>
                <LI onClick={()=>sort('views')} underline={selected === 'views' ? true : false}>Popular</LI>
                <LI onClick={()=>sort('timestamp')} underline={selected === 'timestamp' ? true : false}>Newest</LI>
                <LI>Highest rated</LI>
            </UL>
        </Container>
    )
}

export default Subheader