import React from 'react'
import {
    Container,
    LI,
    UL,
} from './SubheaderCategories.styles'

const SubheaderCategories = (props) => {

    const getPhotos = (category) => {
        props.setIsMainPhotosVisible(false)
        props.getCategoryPhotos(category)
    }

    return(
        <Container className='categories-dropdown'>
            <UL className='categories-dropdown'>
                <LI onClick={()=>getPhotos('entertainment')}>Entertainment</LI>
                <LI onClick={()=>getPhotos('adventure')}>Adventure</LI>
                <LI onClick={()=>getPhotos('restaurant')}>Restaurant</LI>
                <LI onClick={()=>getPhotos('sightseeing')}>Sightseeing</LI>
                <LI onClick={()=>getPhotos('shopping')}>Shopping</LI>
                <LI onClick={()=>getPhotos('museum')}>Museum</LI>
            </UL>
        </Container>
    )
}

export default SubheaderCategories