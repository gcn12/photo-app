import React, { useEffect } from 'react'
import { ReactComponent as PhotoGrid } from '../Icons/PhotoGrid.svg'
import { ReactComponent as DescriptionGrid } from '../Icons/DescriptionGrid.svg'
import { homePhotoInformation, displayView, sortCriteria } from '../Redux/Actions/appActions'
import { dropdownTransition, visibility, dropdownCategoriesTransition, categoriesVisibility, selected } from '../Redux/Actions/headerActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Container,
    UL,
    LI,
    ULMobile,
    CategoriesButton,
    TriangleIcon,
} from './SubheaderPosts.styles'
import SubheaderCategories from './SubheaderCategories'


const Subheader = (props) => {
    // const [showCategories, setShowCategories] = useState(false)
    const openDropdown = () => {
        props.dispatch(dropdownTransition('transitionStart'))
        props.dispatch(visibility(true))
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
    //         setShowCategories(false)
    //     }
    // }

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
    }
    

    return(
        <div>
            <Container>
                <UL>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Link to='/photo-app/posts/popular' style={{textDecoration: 'none'}}>
                            {/* <LI onClick={()=>changeSort('views')} underline={props.selected === 'views' ? true : false}>Popular</LI> */}
                            <LI onClick={()=>changeSort('views')} underline={props.sortCriteria.views===true ? true : false}>Popular</LI>
                        </Link>
                        <Link to='/photo-app/posts/new' style={{textDecoration: 'none'}}>
                            <LI onClick={()=>changeSort('timestamp')} underline={props.sortCriteria.new  ? true : false}>Newest</LI>
                        </Link>
                        <Link to='/photo-app/posts/rating' style={{textDecoration: 'none'}}>
                            <LI onClick={()=>changeSort('ratio')} underline={props.sortCriteria.rating ? true : false}>Highest rated</LI>
                        </Link>
                    </div>
                    <div style={{display: 'flex', marginRight: '10px'}} >
                        <div className='categories-dropdown'>
                            <div style={{display: 'flex'}} onClick={()=>props.setShowCategories(!props.showCategories)}>
                                <CategoriesButton className='categories-dropdown'>
                                    {props.sortCriteria.category} 
                                </CategoriesButton>
                                <TriangleIcon>&#x25BC;</TriangleIcon>
                            </div>
                            {props.showCategories ? 
                            <div style={{position: 'relative'}}>
                                <SubheaderCategories 
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
                        {/* <div style={{cursor: props.displayView ? 'default' : 'pointer' }} onClick={()=>props.setDisplayView(true)} ><DescriptionGrid style={{fill: props.displayView ? 'gray' : 'black'}} /></div> */}
                        {/* <div style={{margin: '0 10px 0 15px', cursor: props.displayView ? 'pointer' : 'default'}}  onClick={()=>props.setDisplayView(false)} ><PhotoGrid style={{fill: props.displayView ? 'black' : 'gray'}}/></div> */}
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
    sortCriteria: state.app.sortCriteria,
})

export default connect(mapStateToProps)(Subheader)