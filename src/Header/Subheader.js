import React from 'react'
import { ReactComponent as PhotoGrid } from '../Icons/PhotoGrid.svg'
import { ReactComponent as DescriptionGrid } from '../Icons/DescriptionGrid.svg'
import {
    Container,
    UL,
    LI,
    ULMobile,
} from './Subheader.styles'


const Subheader = (props) => {

    const openDropdown = () => {
        props.setDropdownTransition('transitionStart')
        props.setVisibility(true)
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
                    {/* <input onClick={()=>props.setDisplayView(!props.displayView)} type='checkbox'></input> */}
                    <div style={{display: 'flex'}} >
                        <div style={{cursor: props.displayView ? 'pointer' : 'default'}}  onClick={()=>props.setDisplayView(false)} ><PhotoGrid style={{fill: props.displayView ? 'black' : 'gray'}}/></div>
                        <div style={{margin: '0 10px 0 15px', cursor: props.displayView ? 'default' : 'pointer' }} onClick={()=>props.setDisplayView(true)} ><DescriptionGrid style={{fill: props.displayView ? 'gray' : 'black'}} /></div>
                    </div>
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