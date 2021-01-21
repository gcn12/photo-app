import React from 'react'
import {
    Container,
    LI,
    UL,
} from './SubheaderCategories.styles'

const SubheaderFilter = (props) => {

    const getPhotos = (result) => {
        if(result !== props.category) {
            props.setHomePhotoInformation([])
            props.setSearchQueries(result)
            props.search(result)
        }
    }

    return(
        <Container className='categories-dropdown'>
            <UL className='categories-dropdown'>
                <LI onClick={()=>getPhotos('all results')}>All results</LI>
                <LI onClick={()=>getPhotos('posts')}>Posts</LI>
                <LI onClick={()=>getPhotos('people')}>People</LI>
                <LI onClick={()=>getPhotos('places')}>Places</LI>
            </UL>
        </Container>
    )
}

export default SubheaderFilter