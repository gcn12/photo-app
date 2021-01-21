import React from 'react'
import { connect } from 'react-redux'
import { dropdownTransition, visibility } from '../Redux/Actions/headerActions'
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
        // props.setDropdownTransition('transitionEnd')
        setTimeout(()=> props.dispatch(visibility(false)), 300)
        document.body.style.overflowY = 'auto'
        document.body.style.position = 'initial'
    }

    const sortPosts = (value) => {
        props.sort(value)
        closeDropdown(false)
    }

    const { selected } = props

    return(
        <Container visibility={props.visibility ? 1 : 0} transition='transition' variants={variants} initial='initial' animate={props.dropdownTransition}>
            <CancelContainer>
                <Cancel onClick={closeDropdown}>&times;</Cancel>
            </CancelContainer>
            <CenterList>
                <UL>
                    <LI onClick={()=>sortPosts('views')} underline={selected === 'views' ? true : false}>POPULAR</LI>
                    <LI onClick={()=>sortPosts('timestamp')} underline={selected === 'timestamp' ? true : false}>NEWEST</LI>
                    <LI onClick={()=>sortPosts('ratio')} underline={selected === 'ratio' ? true : false}>HIGHEST RATED</LI>
                </UL>
            </CenterList>
        </Container>
    )
}

const mapStateToProps = state => ({
    dropdownTransition: state.header.dropdownTransition,
    visibility: state.header.visibility,    
    selected: state.header.selected
})

export default connect(mapStateToProps)(SubheaderDropdown)