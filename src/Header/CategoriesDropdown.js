import React from 'react'
import { connect } from 'react-redux'
import { dropdownCategoriesTransition, categoriesVisibility } from '../Redux/Actions/headerActions'
import { homePhotoInformation, sortCriteria } from '../Redux/Actions/appActions'
import {
    Container,
    CenterList,
    CancelContainer,
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

    const { selectedCategory } = props

    return(
        <Container visibility={props.categoriesVisibility ? 1 : 0} transition='transition' variants={variants} initial='initial' animate={props.dropdownCategoriesTransition}>
            <CancelContainer>
                <Cancel onClick={closeDropdown}>&times;</Cancel>
            </CancelContainer>
            <CenterList>
                <UL>
                    <LI onClick={()=>getPhotos('all categories')} underline={selectedCategory === 'all categories' ? true : false}>All categories</LI>
                    <LI onClick={()=>getPhotos('entertainment')} underline={selectedCategory === 'entertainment' ? true : false}>Entertainment</LI>
                    <LI onClick={()=>getPhotos('adventure')} underline={selectedCategory === 'adventure' ? true : false}>Adventure</LI>
                    <LI onClick={()=>getPhotos('restaurant')} underline={selectedCategory === 'restaurant' ? true : false}>Restaurant</LI>
                    <LI onClick={()=>getPhotos('sightseeing')} underline={selectedCategory === 'sightseeing' ? true : false}>Sightseeing</LI>
                    <LI onClick={()=>getPhotos('shopping')} underline={selectedCategory === 'shopping' ? true : false}>Shopping</LI>
                    <LI onClick={()=>getPhotos('museum')} underline={selectedCategory === 'museum' ? true : false}>Museum</LI>
                </UL>
            </CenterList>
        </Container>
    )
}

const mapStateToProps = state => ({
    dropdownCategoriesTransition: state.header.dropdownCategoriesTransition,
    categoriesVisibility: state.header.categoriesVisibility,
    selectedCategory: state.header.selectedCategory,
    sortCriteria: state.app.sortCriteria,
})

export default connect(mapStateToProps)(CategoriesDropdown)