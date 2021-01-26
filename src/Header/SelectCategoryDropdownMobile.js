import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { dropdownCategoriesTransition, categoriesVisibility } from '../Redux/Actions/headerActions'
import { homePhotoInformation, sortCriteria } from '../Redux/Actions/appActions'
import {
    Container,
    CenterList,
    CancelContainer,
    Cancel,
    UL,
    LI,
} from './SubheaderSortMobile.styles'

const variants = {
    initial: {
        y: -200,
        x: 0,
        opacity: 0,
    },
    transitionStart: {
        y: 0,
        opacity: .94,
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

const CategoriesDropdown = (props) => {

    const closeDropdown = () => {
        props.dispatch(dropdownCategoriesTransition('transitionEnd'))
        setTimeout(()=> props.dispatch(categoriesVisibility(false)), 300)
        document.body.style.overflowY = 'auto'
        document.body.style.position = 'initial'
    }

    const getPhotos = (category) => {
        if(props.location.pathname.includes('/photo-app/posts')){
            if(category !== props.sortCriteria.category) {
                props.dispatch(homePhotoInformation([]))
                let criteria = props.sortCriteria
                criteria['category'] = category
                props.dispatch(sortCriteria(criteria))
                props.sort(criteria, true)
            }
            closeDropdown()
        }
        if(props.location.pathname.includes('/photo-app/search')){ 
            if(category !== props.sortCriteria.category) {
                let criteria = props.sortCriteria
                criteria['category'] = category
                props.dispatch(sortCriteria(criteria))
                props.search(props.searchQueries, `category: ${category}`)
            }
            closeDropdown()
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
        <Container visibility={props.categoriesVisibility ? 1 : 0} transition='transition' variants={variants} initial='initial' animate={props.dropdownCategoriesTransition}>
            <CancelContainer>
                <Cancel onClick={closeDropdown}>&times;</Cancel>
            </CancelContainer>
            <CenterList>
                <UL>
                <Link to={`/photo-app/posts/${sortBy}/all`} onClick={()=>getPhotos('all categories')} style={{textDecoration: 'none'}}>
                    <LI underline={props.sortCriteria.category === 'all categories' ? true : false}>All categories</LI>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/entertainment`} onClick={()=>getPhotos('entertainment')} style={{textDecoration: 'none'}}>
                    <LI underline={props.sortCriteria.category === 'entertainment' ? true : false}>Entertainment</LI>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/adventure`} onClick={()=>getPhotos('adventure')} style={{textDecoration: 'none'}}>
                    <LI underline={props.sortCriteria.category === 'adventure' ? true : false}>Adventure</LI>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/restaurant`} onClick={()=>getPhotos('restaurant')} style={{textDecoration: 'none'}}>
                    <LI underline={props.sortCriteria.category === 'restaurant' ? true : false}>Restaurant</LI>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/sightseeing`} onClick={()=>getPhotos('sightseeing')} style={{textDecoration: 'none'}}>
                    <LI underline={props.sortCriteria.category === 'sightseeing' ? true : false}>Sightseeing</LI>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/shopping`} onClick={()=>getPhotos('shopping')} style={{textDecoration: 'none'}}>
                    <LI underline={props.sortCriteria.category === 'shopping' ? true : false}>Shopping</LI>
                </Link>
                <Link to={`/photo-app/posts/${sortBy}/museum`} onClick={()=>getPhotos('museum')} style={{textDecoration: 'none'}}>
                    <LI underline={props.sortCriteria.category === 'museum' ? true : false}>Museum</LI>
                </Link>
                </UL>
            </CenterList>
        </Container>
    )
}

const mapStateToProps = state => ({
    dropdownCategoriesTransition: state.header.dropdownCategoriesTransition,
    categoriesVisibility: state.header.categoriesVisibility,
    sortCriteria: state.app.sortCriteria,
})

export default connect(mapStateToProps)(CategoriesDropdown)