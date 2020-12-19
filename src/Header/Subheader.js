import React, { useState, useEffect } from 'react'
import { ReactComponent as PhotoGrid } from '../Icons/PhotoGrid.svg'
import { ReactComponent as DescriptionGrid } from '../Icons/DescriptionGrid.svg'
import { Link } from 'react-router-dom'
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
        document.body.style.overflowY = 'hidden'
        document.body.style.position = 'fixed'
    }

    useEffect(()=> {
        if (props?.location?.pathname.includes('new')) {
            props.setSelected('timestamp')
        }
        if (props?.location?.pathname.includes('rating')) {
            props.setSelected('ratio')
        }
        if (props?.location?.pathname.includes('popular')) {
            props.setSelected('views')
        }
    }, [])

    const openDropdownCategories = () => {
        props.setDropdownCategoriesTransition('transitionStart')
        props.setCategoriesVisibility(true)
        document.body.style.overflowY = 'hidden'
        document.body.style.position = 'fixed'
    }

    window.onclick = (e) => {
        if (!e.target.matches('.categories-dropdown')) {
            setShowCategories(false)
        }
    }

    const changeSort = (sortCriteria) => {
        // props.setHomePhotoInformation([])
        let criteria = props.sortCriteria 
        let newCriteria = {}
        if(sortCriteria === 'views') {
            newCriteria['views'] = true
        }else {
            newCriteria['views'] = false
        }
        if (sortCriteria === 'timestamp') {
            newCriteria['new'] = true
        }else {
            newCriteria['new'] = false
        }
        if (sortCriteria === 'ratio') {
            newCriteria['rating'] = true
        } else {
            newCriteria['rating'] = false
        }
        let finalCriteria = {...criteria, ...newCriteria}
        console.log(finalCriteria)
        props.setSelected(sortCriteria)
        props.sort(finalCriteria, true)
        props.setIsMainPhotosVisible(false)
    }

    // const getAssorted = () => {
    //     props.getAssortedPhotos()
    //     props.setIsMainPhotosVisible(false)
    // }
    

    return(
        <div>
            <Container>
                <UL>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {/* <LI onClick={getAssorted} underline={props.selected === 'assorted' ? true : false}>Assorted</LI> */}
                        <Link to='/photo-app/posts/popular' style={{textDecoration: 'none'}}>
                            <LI onClick={()=>changeSort('views')} underline={props.selected === 'views' ? true : false}>Popular</LI>
                        </Link>
                        <Link to='/photo-app/posts/new' style={{textDecoration: 'none'}}>
                            <LI onClick={()=>changeSort('timestamp')} underline={props.selected === 'timestamp' ? true : false}>Newest</LI>
                        </Link>
                        <Link to='/photo-app/posts/rating' style={{textDecoration: 'none'}}>
                            <LI onClick={()=>changeSort('ratio')} underline={props.selected === 'ratio' ? true : false}>Highest rated</LI>
                        </Link>
                    </div>
                    <div style={{display: 'flex'}} >
                        <div className='categories-dropdown'>
                            <CategoriesButton className='categories-dropdown' onClick={()=>setShowCategories(!showCategories)}>Categories &#x25BC;</CategoriesButton>
                            {showCategories ? 
                            <div style={{position: 'relative'}}>
                                <SubheaderCategories setIsMainPhotosVisible={props.setIsMainPhotosVisible} getCategoryPhotos={props.getCategoryPhotos} className='categories-dropdown' />
                            </div>
                            :
                            null
                            }
                        </div>
                        <div style={{cursor: props.displayView ? 'default' : 'pointer' }} onClick={()=>props.setDisplayView(true)} ><DescriptionGrid style={{fill: props.displayView ? 'gray' : 'black'}} /></div>
                        <div style={{margin: '0 10px 0 15px', cursor: props.displayView ? 'pointer' : 'default'}}  onClick={()=>props.setDisplayView(false)} ><PhotoGrid style={{fill: props.displayView ? 'black' : 'gray'}}/></div>
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
                        <div style={{cursor: props.displayView ? 'default' : 'pointer' }} onClick={()=>props.setDisplayView(true)} ><DescriptionGrid style={{fill: props.displayView ? 'gray' : 'black'}} /></div>
                        <div style={{margin: '0 10px 0 15px', cursor: props.displayView ? 'pointer' : 'default'}}  onClick={()=>props.setDisplayView(false)} ><PhotoGrid style={{fill: props.displayView ? 'black' : 'gray'}}/></div>
                    </div>
                </ULMobile>
            </Container>
        </div>
    )
}

export default Subheader