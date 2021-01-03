import React, { useState, useEffect } from 'react'
import { ReactComponent as PhotoGrid } from '../Icons/PhotoGrid.svg'
import { ReactComponent as DescriptionGrid } from '../Icons/DescriptionGrid.svg'
import { connect } from 'react-redux'
import { homePhotoInformation, displayView, searchQueries } from '../Redux/Actions/appActions'
import { dropdownTransition, visibility, dropdownCategoriesTransition, categoriesVisibility, selected } from '../Redux/Actions/headerActions'
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
    // const [showCategories, setShowCategories] = useState(false)
    // const [showResults, setShowResults] = useState(false)
    const openDropdown = () => {
        props.dispatch(dropdownTransition('transitionStart'))
        props.dispactch(visibility(true))
        document.body.style.overflowY = 'hidden'
        // document.body.style.position = 'fixed'
    }

    useEffect(()=> {
        if (props?.location?.pathname.includes('new')) {
            props.dispatch(selected('timestamp'))
        }else if (props?.location?.pathname.includes('rating')) {
            props.dispatch(selected('ratio'))
        }else if (props?.location?.pathname.includes('popular')) {
            props.dispatch(selected('views'))
        }else{
            props.dispatch(selected('views'))
        }
        // eslint-disable-next-line
    }, [])

    const openDropdownCategories = () => {
        props.dispatch(dropdownCategoriesTransition('transitionStart'))
        props.dispatch(categoriesVisibility(true))
        document.body.style.overflowY = 'hidden'
        // document.body.style.position = 'fixed'
    }

    // window.onclick = (e) => {
    //     if (!e.target.matches('.categories-dropdown')) {
    //         props.setShowCategories(false)
    //     }
    // }

    const changeSort = (result) => {
        if(result !== props.searchQueries) {
            props.dispatch(homePhotoInformation([]))
            props.dispatch(searchQueries(result))
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
                            {props.searchQueries === 'posts' ? 
                            <div>
                                <div onClick={()=>props.setShowCategories(!props.showCategories)}>
                                    <CategoriesButton className='categories-dropdown'>{props.sortCriteria.category} &#x25BC;</CategoriesButton>
                                </div>
                                {props.showCategories ? 
                                <div style={{position: 'relative'}}>
                                    <SubheaderCategories 
                                        search={props.search}
                                        category={category}
                                        setCategory={setCategory}
                                        setIsMainPhotosVisible={props.setIsMainPhotosVisible} 
                                        getCategoryPhotos={props.getCategoryPhotos} 
                                        className='categories-dropdown' 
                                        location={props.location}
                                        sort={props.sort} 
                                    />
                                </div>
                                :
                                null
                                }
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
                        <div style={{cursor: props.displayView ? 'default' : 'pointer' }} onClick={()=>props.dispatch(displayView(true))} ><DescriptionGrid style={{fill: props.displayView ? 'gray' : 'black'}} /></div>
                        <div style={{margin: '0 10px 0 15px', cursor: props.displayView ? 'pointer' : 'default'}}  onClick={()=>props.dispatch(displayView(false))} ><PhotoGrid style={{fill: props.displayView ? 'black' : 'gray'}}/></div>
                    </div>
                </ULMobile>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    homePhotoInformation: state.app.homePhotoInformation,
    displayView: state.app.displayView,
    searchQueries: state.app.searchQueries,
    sortCriteria: state.app.sortCriteria
})

export default connect(mapStateToProps)(Subheader)