import React, { useState } from 'react'
import { ReactComponent as PhotoGrid } from '../Icons/PhotoGrid.svg'
import { ReactComponent as DescriptionGrid } from '../Icons/DescriptionGrid.svg'
import {
    Container,
    UL,
    LI,
    ULMobile,
    CategoriesButton,
} from './Subheader.styles'
import SubheaderCategories from './SubheaderCategories'


const Subheader = (props) => {
    const [showCategories, setShowCategories] = useState(false)
    const openDropdown = () => {
        props.setDropdownTransition('transitionStart')
        props.setVisibility(true)
    }

    const openDropdownCategories = () => {
        props.setDropdownCategoriesTransition('transitionStart')
        props.setCategoriesVisibility(true)
    }

    window.onclick = (e) => {
        if (!e.target.matches('.categories-dropdown')) {
            setShowCategories(false)
        }
    }

    return(
        <div>
            <Container>
                <UL>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <LI onClick={props.getAssortedPhotos} underline={props.selected === 'assorted' ? true : false}>Assorted</LI>
                        <LI onClick={()=>props.sort('views')} underline={props.selected === 'views' ? true : false}>Popular</LI>
                        <LI onClick={()=>props.sort('timestamp')} underline={props.selected === 'timestamp' ? true : false}>Newest</LI>
                        <LI>Highest rated</LI>
                    </div>
                    <div style={{display: 'flex'}} >
                        <div className='categories-dropdown'>
                            <CategoriesButton className='categories-dropdown' onClick={()=>setShowCategories(!showCategories)}>Categories &#x25BC;</CategoriesButton>
                            {showCategories ? 
                            <div style={{position: 'relative'}}>
                                <SubheaderCategories getCategoryPhotos={props.getCategoryPhotos} className='categories-dropdown' />
                            </div>
                            :
                            null
                            }
                        </div>
                        <div style={{cursor: props.displayView ? 'pointer' : 'default'}}  onClick={()=>props.setDisplayView(false)} ><PhotoGrid style={{fill: props.displayView ? 'black' : 'gray'}}/></div>
                        <div style={{margin: '0 10px 0 15px', cursor: props.displayView ? 'default' : 'pointer' }} onClick={()=>props.setDisplayView(true)} ><DescriptionGrid style={{fill: props.displayView ? 'gray' : 'black'}} /></div>
                    </div>
                </UL>


            </Container>
            <Container>
                <ULMobile>
                    <div style={{display: 'flex'}}>
                        <LI onClick={openDropdown}>Sort &#x25BC;</LI>
                        <LI onClick={openDropdownCategories}>Categories &#x25BC;</LI>
                    </div>
                    <div style={{display: 'flex'}} >
                        <div style={{cursor: props.displayView ? 'pointer' : 'default'}}  onClick={()=>props.setDisplayView(false)} ><PhotoGrid style={{fill: props.displayView ? 'black' : 'gray'}}/></div>
                        <div style={{margin: '0 10px 0 15px', cursor: props.displayView ? 'default' : 'pointer' }} onClick={()=>props.setDisplayView(true)} ><DescriptionGrid style={{fill: props.displayView ? 'gray' : 'black'}} /></div>
                    </div>
                </ULMobile>
            </Container>
        </div>
    )
}

export default Subheader