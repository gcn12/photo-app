import React from 'react'
import { homePhotoInformation, sortCriteria } from '../Redux/Actions/appActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Container, 
    Options, 
    OptionText,
    OptionIconContainer,
    Triangle,
} from '../Styles/DropdownStyles.styles'

const SubheaderCategories = (props) => {

    const getPhotos = (category) => {
        props.setShowCategories(false)
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

    let sortBy
    if(props.sortCriteria.views){
        sortBy = 'popular'
    }
    if(props.sortCriteria.rating){
        sortBy = 'rating'
    }
    if(props.sortCriteria.new){
        sortBy = 'new'
    }

    return(
        <Container fontSize='18px' translateContainer='translate(-15%, 5%)' className='categories-dropdown'>
            <Triangle shift='translate(-280%, -90%)' />
            <Options>
                <Link to={`/photo-app/posts/${sortBy}/all`} onClick={()=>getPhotos('all categories')} style={{textDecoration: 'none'}}>
                    <OptionIconContainer className='categories-dropdown'>
                        <OptionText>All categories</OptionText>
                    </OptionIconContainer>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/entertainment`} onClick={()=>getPhotos('entertainment')} style={{textDecoration: 'none'}}>
                    <OptionIconContainer className='categories-dropdown'>
                        <OptionText>Entertainment</OptionText>
                    </OptionIconContainer>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/adventure`} onClick={()=>getPhotos('adventure')} style={{textDecoration: 'none'}}>
                    <OptionIconContainer className='categories-dropdown'>
                        <OptionText>Adventure</OptionText>
                    </OptionIconContainer>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/restaurant`} onClick={()=>getPhotos('restaurant')} style={{textDecoration: 'none'}}>
                    <OptionIconContainer className='categories-dropdown'>
                        <OptionText>Restaurant</OptionText>
                    </OptionIconContainer>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/sightseeing`} onClick={()=>getPhotos('sightseeing')} style={{textDecoration: 'none'}}>
                    <OptionIconContainer className='categories-dropdown'>
                        <OptionText>Sightseeing</OptionText>
                    </OptionIconContainer>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/shopping`} onClick={()=>getPhotos('shopping')} style={{textDecoration: 'none'}}>
                    <OptionIconContainer className='categories-dropdown'>
                        <OptionText>Shopping</OptionText>
                    </OptionIconContainer>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/museum`} onClick={()=>getPhotos('museum')} style={{textDecoration: 'none'}}>
                    <OptionIconContainer className='categories-dropdown'>
                        <OptionText>Museum</OptionText>
                    </OptionIconContainer>
                </Link>
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