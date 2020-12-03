import React from 'react'
import {
    Container,
    CenterList,
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
        opacity: 1,
    },
    transitionEnd: {
        y: 100,
        opacity: 0,
    },
    transition: {
        y: {
            type: 'spring',
            stiffness: 20,
        }
    }
}

const SubheaderDropdown = (props) => {

    

    return(
        <Container visibility={variants[props.dropdownTransition].opacity} transition='transition' variants={variants} initial='initial' animate={props.dropdownTransition}>
            <div>
                <Cancel onClick={()=>props.setDropdownTransition('initial')}>&times;</Cancel>
            </div>
            <CenterList>
                <UL>
                    <LI>ASSORTED</LI>
                    <LI>POPULAR</LI>
                    <LI>NEWEST</LI>
                    <LI>HIGHEST RATED</LI>
                </UL>
            </CenterList>
        </Container>
    )
}

export default SubheaderDropdown