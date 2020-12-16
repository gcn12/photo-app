import React from 'react'
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

    const closeDropdown = () => {
        props.setIsMainPhotosVisible(false)
        props.setDropdownTransition('transitionEnd')
        setTimeout(()=> props.setVisibility(false), 300)
    }

    const sortPosts = (value) => {
        props.sort(value)
        closeDropdown()
    }

    const getAssortedPhotosAndClose = () => {
        props.setIsMainPhotosVisible(false)
        closeDropdown()
        props.getAssortedPhotos()
    }

    const { selected } = props

    return(
        <Container visibility={props.visibility ? 1 : 0} transition='transition' variants={variants} initial='initial' animate={props.dropdownTransition}>
            <CancelContainer>
                <Cancel onClick={closeDropdown}>&times;</Cancel>
            </CancelContainer>
            <CenterList>
                <UL>
                    <LI onClick={getAssortedPhotosAndClose} underline={selected === 'assorted' ? true : false}>ASSORTED</LI>
                    <LI onClick={()=>sortPosts('views')} underline={selected === 'views' ? true : false}>POPULAR</LI>
                    <LI onClick={()=>sortPosts('timestamp')} underline={selected === 'timestamp' ? true : false}>NEWEST</LI>
                    <LI onClick={()=>sortPosts('ratio')} underline={selected === 'ratio' ? true : false}>HIGHEST RATED</LI>
                </UL>
            </CenterList>
        </Container>
    )
}

export default SubheaderDropdown