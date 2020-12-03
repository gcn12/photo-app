import React, { useState } from 'react'
import { db } from '../Firebase'
import {
    Container,
    CenterList,
    Cancel,
    UL,
    LI,
} from './SubheaderDropdown.styles'

const variants = {
    initial: {
        y: -200,
        x: 0,
        opacity: 0,
    },
    transitionStart: {
        y: 0,
        opacity: 1,
    },
    transitionEnd: {
        y: -200,
        opacity: 0,
    },
    transition: {
        y: {
            type: 'spring',
            stiffness: 20,
        },
    }
}


const SubheaderDropdown = (props) => {

    const closeDropdown = () => {
        props.setDropdownTransition('transitionEnd')
        setTimeout(()=> props.setVisibility(false), 300)
        
    }

    const [selected, setSelected] = useState('assorted')

    const sort = (value) => {
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
        closeDropdown()
        setSelected(value)
    }

    return(
        <Container visibility={props.visibility} transition='transition' variants={variants} initial='initial' animate={props.dropdownTransition}>
            <div>
                <Cancel onClick={closeDropdown}>&times;</Cancel>
            </div>
            <CenterList>
                <UL>
                    <LI underline={selected === 'assorted' ? true : false}>ASSORTED</LI>
                    <LI onClick={()=>sort('views')} underline={selected === 'views' ? true : false}>POPULAR</LI>
                    <LI onClick={()=>sort('timestamp')} underline={selected === 'timestamp' ? true : false}>NEWEST</LI>
                    <LI underline={selected === '' ? true : false}>HIGHEST RATED</LI>
                </UL>
            </CenterList>
        </Container>
    )
}

export default SubheaderDropdown