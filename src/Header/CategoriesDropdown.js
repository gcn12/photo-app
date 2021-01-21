import React from 'react'
import { connect } from 'react-redux'
import { dropdownCategoriesTransition, categoriesVisibility } from '../Redux/Actions/headerActions'
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

    const sortPosts = (value) => {
        props.getCategoryPhotos(value)
        closeDropdown()
    }

    const { selectedCategory } = props

    return(
        <Container visibility={props.categoriesVisibility ? 1 : 0} transition='transition' variants={variants} initial='initial' animate={props.dropdownCategoriesTransition}>
            <CancelContainer>
                <Cancel onClick={closeDropdown}>&times;</Cancel>
            </CancelContainer>
            <CenterList>
                <UL>
                    <LI onClick={()=>sortPosts('all categories')} underline={selectedCategory === 'all categories' ? true : false}>All categories</LI>
                    <LI onClick={()=>sortPosts('entertainment')} underline={selectedCategory === 'entertainment' ? true : false}>Entertainment</LI>
                    <LI onClick={()=>sortPosts('adventure')} underline={selectedCategory === 'adventure' ? true : false}>Adventure</LI>
                    <LI onClick={()=>sortPosts('restaurant')} underline={selectedCategory === 'restaurant' ? true : false}>Restaurant</LI>
                    <LI onClick={()=>sortPosts('sightseeing')} underline={selectedCategory === 'sightseeing' ? true : false}>Sightseeing</LI>
                    <LI onClick={()=>sortPosts('shopping')} underline={selectedCategory === 'shopping' ? true : false}>Shopping</LI>
                    <LI onClick={()=>sortPosts('museum')} underline={selectedCategory === 'museum' ? true : false}>Museum</LI>
                </UL>
            </CenterList>
        </Container>
    )
}

const mapStateToProps = state => ({
    dropdownCategoriesTransition: state.header.dropdownCategoriesTransition,
    categoriesVisibility: state.header.categoriesVisibility,
    selectedCategory: state.header.selectedCategory,
})

export default connect(mapStateToProps)(CategoriesDropdown)