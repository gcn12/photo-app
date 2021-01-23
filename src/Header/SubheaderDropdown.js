import React from 'react'
import { connect } from 'react-redux'
import { dropdownTransition, visibility, selected } from '../Redux/Actions/headerActions'
import { homePhotoInformation, sortCriteria } from '../Redux/Actions/appActions'
import { Link } from 'react-router-dom'
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


const SubheaderDropdown = (props) => {

    const closeDropdown = (isCancel) => {
        props.dispatch(dropdownTransition('transitionEnd'))
        setTimeout(()=> props.dispatch(visibility(false)), 300)
        document.body.style.overflowY = 'auto'
        document.body.style.position = 'initial'
    }

    const changeSort = (sortCriteriaInput) => {
        props.dispatch(homePhotoInformation([]))
        let criteria = props.sortCriteria
        let newCriteria = {}
        if(sortCriteriaInput === 'views') {
            newCriteria['views'] = true
        }else {
            newCriteria['views'] = false
        }
        if (sortCriteriaInput === 'timestamp') {
            newCriteria['new'] = true
        }else {
            newCriteria['new'] = false
        }
        if (sortCriteriaInput === 'ratio') { 
            newCriteria['rating'] = true
        } else {
            newCriteria['rating'] = false
        }
        let finalCriteria = {...criteria, ...newCriteria}
        props.dispatch(selected(sortCriteriaInput))
        props.dispatch(sortCriteria(finalCriteria))
        props.sort(finalCriteria, true)
        closeDropdown(false)
    }

    return(
        <Container visibility={props.visibility ? 1 : 0} transition='transition' variants={variants} initial='initial' animate={props.dropdownTransition}>
            <CancelContainer>
                <Cancel onClick={closeDropdown}>&times;</Cancel>
            </CancelContainer>
            <CenterList>
                <UL>
                <Link onClick={()=>changeSort('views')} to='/photo-app/posts/popular' style={{textDecoration: 'none'}}>
                    <LI underline={props.selected === 'views' ? true : false}>POPULAR</LI>
                </Link>
                <Link to='/photo-app/posts/new' onClick={()=>changeSort('timestamp')} style={{textDecoration: 'none'}}>
                    <LI underline={props.selected === 'timestamp' ? true : false}>NEWEST</LI>
                </Link>
                <Link to='/photo-app/posts/rating' onClick={()=>changeSort('ratio')} style={{textDecoration: 'none'}}>
                    <LI underline={props.selected === 'ratio' ? true : false}>HIGHEST RATED</LI>
                </Link>
                </UL>
            </CenterList>
        </Container>
    )
}

const mapStateToProps = state => ({
    dropdownTransition: state.header.dropdownTransition,
    visibility: state.header.visibility,    
    selected: state.header.selected,
    sortCriteria: state.app.sortCriteria,
})

export default connect(mapStateToProps)(SubheaderDropdown)