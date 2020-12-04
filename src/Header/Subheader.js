import React from 'react'
import {
    Container,
    UL,
    LI,
    ULMobile,
} from './Subheader.styles'


const Subheader = (props) => {

    const openDropdown = () => {
        props.setDropdownTransition('transitionStart')
        props.setVisibility('show')
    }

    return(
        <div>
            <Container>
                <UL>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <LI underline={props.selected === 'assorted' ? true : false}>Assorted</LI>
                        <LI onClick={()=>props.sort('views')} underline={props.selected === 'views' ? true : false}>Popular</LI>
                        <LI onClick={()=>props.sort('timestamp')} underline={props.selected === 'timestamp' ? true : false}>Newest</LI>
                        <LI>Highest rated</LI>
                    </div>
                    <input onClick={()=>props.setDisplayView(!props.displayView)} type='checkbox'></input>
                </UL>


            </Container>
            <Container>
                <ULMobile>
                    <LI onClick={openDropdown}>Sort &#x25BC;</LI>
                </ULMobile>
            </Container>
        </div>
    )
}

export default Subheader