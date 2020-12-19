import React from 'react'
import {
    Container,
    LI,
    UL,
} from './SubheaderCategories.styles'

const SubheaderCategories = (props) => {

    const getPhotos = (category) => {
        if(category !== props.category) {
            props.setHomePhotoInformation([])
            props.setCategory(category)
            props.setIsMainPhotosVisible(false)
            let criteria = props.sortCriteria
            if(category === 'all categories') {
                criteria['category'] = ''
            }else{
                criteria['category'] = category
            }
            console.log('category', criteria)
            props.sort(criteria, true)
        }
    }

    return(
        <Container className='categories-dropdown'>
            <UL className='categories-dropdown'>
                <LI onClick={()=>getPhotos('all categories')}>All categories</LI>
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