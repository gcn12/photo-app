import React from 'react'
import {
    Container,
    LI,
    UL,
} from './SubheaderCategories.styles'

const SubheaderCategories = (props) => {
    return(
        <Container className='categories-dropdown'>
            <UL className='categories-dropdown'>
                <LI onClick={()=>props.getCategoryPhotos('entertainment')}>Entertainment</LI>
                <LI onClick={()=>props.getCategoryPhotos('adventure')}>Adventure</LI>
                <LI onClick={()=>props.getCategoryPhotos('restaurant')}>Restaurant</LI>
                <LI onClick={()=>props.getCategoryPhotos('sightseeing')}>Sightseeing</LI>
                <LI onClick={()=>props.getCategoryPhotos('shopping')}>Shopping</LI>
                <LI onClick={()=>props.getCategoryPhotos('museum')}>Museum</LI>
            </UL>
        </Container>
    )
}

export default SubheaderCategories