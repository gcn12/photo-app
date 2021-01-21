import React from 'react'
import { homePhotoInformation, sortCriteria } from '../Redux/Actions/appActions'
import { connect } from 'react-redux'
// import {
//     Container,
//     LI,
//     UL,
// } from './SubheaderCategories.styles'
import {
    Container, 
    Options, 
    OptionText,
    OptionIconContainer,
    Triangle,
} from '../Styles/DropdownStyles.styles'

const SubheaderCategories = (props) => {

    const getPhotos = (category) => {
        if(props.location.pathname.includes('/photo-app/posts')){
            if(category !== props.sortCriteria.category) {
                props.dispatch(homePhotoInformation([]))
                let criteria = props.sortCriteria
                criteria['category'] = category
                props.dispatch(sortCriteria(criteria))
                props.sort(criteria, true)
            }
        }
        if(props.location.pathname.includes('/photo-app/search')){ 
            if(category !== props.sortCriteria.category) {
                let criteria = props.sortCriteria
                criteria['category'] = category
                props.dispatch(sortCriteria(criteria))
                props.search(props.searchQueries, `category: ${category}`)
            }
        }
    }

    return(
        <Container fontSize='18px' translateContainer='translate(-15%, 5%)' className='categories-dropdown'>
            <Triangle shift='translate(-280%, -90%)' />
            <Options>
                <OptionIconContainer className='categories-dropdown'>
                    <OptionText onClick={()=>getPhotos('all categories')}>All categories</OptionText>
                </OptionIconContainer>
                <OptionIconContainer className='categories-dropdown'>
                    <OptionText onClick={()=>getPhotos('entertainment')}>Entertainment</OptionText>
                </OptionIconContainer>
                <OptionIconContainer className='categories-dropdown'>
                    <OptionText onClick={()=>getPhotos('adventure')}>Adventure</OptionText>
                </OptionIconContainer>
                <OptionIconContainer className='categories-dropdown'>
                    <OptionText onClick={()=>getPhotos('restaurant')}>Restaurant</OptionText>
                </OptionIconContainer>
                <OptionIconContainer className='categories-dropdown'>
                    <OptionText onClick={()=>getPhotos('sightseeing')}>Sightseeing</OptionText>
                </OptionIconContainer>
                <OptionIconContainer className='categories-dropdown'>
                    <OptionText onClick={()=>getPhotos('shopping')}>Shopping</OptionText>
                </OptionIconContainer>
                <OptionIconContainer className='categories-dropdown'>
                    <OptionText onClick={()=>getPhotos('museum')}>Museum</OptionText>
                </OptionIconContainer>
            </Options>
        </Container>
    )
}

const mapStateToProps = state => ({
    homePhotoInformation: state.app.homePhotoInformation,
    searchQueries: state.app.searchQueries,
    sortCriteria: state.app.sortCriteria,
})

export default connect(mapStateToProps)(SubheaderCategories)