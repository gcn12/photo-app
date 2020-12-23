import React, { useState, useEffect } from 'react'
import { ReactComponent as PhotoGrid } from '../Icons/PhotoGrid.svg'
import { ReactComponent as DescriptionGrid } from '../Icons/DescriptionGrid.svg'
// import SubheaderFilter from './SubheaderFilter'
// import { Link } from 'react-router-dom'
import {
    Container,
    UL,
    LI,
    ULMobile,
    CategoriesButton,
} from './SubheaderPosts.styles'
import SubheaderCategories from './SubheaderCategories'


const Subheader = (props) => {
    const [category, setCategory] = useState('all categories')
    // const [result, setResult] = useState('all results')
    const [showCategories, setShowCategories] = useState(false)
    // const [showResults, setShowResults] = useState(false)
    const openDropdown = () => {
        props.setDropdownTransition('transitionStart')
        props.setVisibility(true)
        document.body.style.overflowY = 'hidden'
        // document.body.style.position = 'fixed'
    }

    useEffect(()=> {
        if (props?.location?.pathname.includes('new')) {
            props.setSelected('timestamp')
        }else if (props?.location?.pathname.includes('rating')) {
            props.setSelected('ratio')
        }else if (props?.location?.pathname.includes('popular')) {
            props.setSelected('views')
        }else{
            props.setSelected('views')
        }
        // eslint-disable-next-line
    }, [])

    const openDropdownCategories = () => {
        props.setDropdownCategoriesTransition('transitionStart')
        props.setCategoriesVisibility(true)
        document.body.style.overflowY = 'hidden'
        // document.body.style.position = 'fixed'
    }

    window.onclick = (e) => {
        if (!e.target.matches('.categories-dropdown')) {
            setShowCategories(false)
        }
        // if (!e.target.matches('.results-dropdown')) {
            // setShowResults(false)
        // }
    }

    const changeSort = (result) => {
        // props.setHomePhotoInformation([])
        // props.setIsMainPhotosVisible(false)
        // let criteria = props.sortCriteria 
        // let newCriteria = {}
        // if(sortCriteria === 'views') {
        //     newCriteria['views'] = true
        // }else {
        //     newCriteria['views'] = false
        // }
        // if (sortCriteria === 'timestamp') {
        //     newCriteria['new'] = true
        // }else {
        //     newCriteria['new'] = false
        // }
        // if (sortCriteria === 'ratio') {
        //     newCriteria['rating'] = true
        // } else {
        //     newCriteria['rating'] = false
        // }
        // let finalCriteria = {...criteria, ...newCriteria}
        // props.setSelected(sortCriteria)
        // props.sort(finalCriteria, true)
        if(result !== props.searchQueries) {
            props.setHomePhotoInformation([])
            // props.setIsMainPhotosVisible(false)
            props.setSearchQueries(result)
            props.search(result)
        }
    }
    

    return(
        <div>
            <Container>
                <UL>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <LI onClick={()=>changeSort('all results')} underline={props.searchQueries === 'all results' ? true : false}>All results</LI>
                        <LI onClick={()=>changeSort('places')} underline={props.searchQueries === 'places' ? true : false}>Places</LI>
                        <LI onClick={()=>changeSort('posts')} underline={props.searchQueries === 'posts' ? true : false}>Posts</LI>
                        <LI onClick={()=>changeSort('people')} underline={props.searchQueries === 'people' ? true : false}>People</LI>
                    </div>
                    <div style={{display: 'flex'}} >
                        <div style={{display: 'flex'}} className='categories-dropdown'>
                            {/* <div onClick={()=>setShowResults(!showResults)}>
                                <CategoriesButton className='results-dropdown'>{props.searchQueries} &#x25BC;</CategoriesButton>
                            </div>
                            {showResults ? 
                            <div style={{position: 'relative'}}>
                                <SubheaderFilter 
                                    search={props.search}
                                    searchQueries={props.searchQueries}
                                    setSearchQueries={props.setSearchQueries}
                                    setHomePhotoInformation={props.setHomePhotoInformation}
                                    result={result}
                                    setResult={setResult}
                                    setIsMainPhotosVisible={props.setIsMainPhotosVisible} 
                                    className='categories-dropdown' 
                                    location={props.location}
                                    sort={props.sort} 
                                    sortCriteria={props.sortCriteria} 
                                    setSortCriteria={props.setSortCriteria} 
                                />
                            </div>
                            :
                            null
                            } */}
                            <div onClick={()=>setShowCategories(!showCategories)}>
                                <CategoriesButton className='categories-dropdown'>{props.sortCriteria.category} &#x25BC;</CategoriesButton>
                            </div>
                            {showCategories ? 
                            <div style={{position: 'relative'}}>
                                <SubheaderCategories 
                                    setHomePhotoInformation={props.setHomePhotoInformation}
                                    category={category}
                                    setCategory={setCategory}
                                    setIsMainPhotosVisible={props.setIsMainPhotosVisible} 
                                    getCategoryPhotos={props.getCategoryPhotos} 
                                    className='categories-dropdown' 
                                    location={props.location}
                                    sort={props.sort} 
                                    sortCriteria={props.sortCriteria} 
                                    setSortCriteria={props.setSortCriteria} 
                                />
                            </div>
                            :
                            null
                            }
                        </div>
                    </div>
                </UL>
            </Container>
            <Container>
                <ULMobile>
                    <div style={{display: 'flex'}}>
                        <LI onClick={openDropdown}>Sort &#x25BC;</LI>
                        <LI onClick={openDropdownCategories}>{props.sortCriteria.category} &#x25BC;</LI>
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