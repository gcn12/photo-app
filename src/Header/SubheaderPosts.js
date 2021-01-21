import React, { useEffect } from 'react'
import { homePhotoInformation, sortCriteria } from '../Redux/Actions/appActions'
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
    Margin, 
} from './SubheaderPosts.styles'
import SubheaderCategories from './SubheaderCategories'


const Subheader = (props) => {
    // const [showCategories, setShowCategories] = useState(false)
    const openDropdown = () => {
        props.dispatch(dropdownTransition('transitionStart'))
        props.dispatch(visibility(true))
        document.body.style.overflowY = 'hidden'
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
    }

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
                        <Link onClick={()=>changeSort('views')} to='/photo-app/posts/popular' style={{textDecoration: 'none'}}>
                            <LI underline={props.sortCriteria.views===true ? true : false}>Popular</LI>
                        </Link>
                        <Margin></Margin>
                        <Link to='/photo-app/posts/new' onClick={()=>changeSort('timestamp')} style={{textDecoration: 'none'}}>
                            <LI  underline={props.sortCriteria.new  ? true : false}>Newest</LI>
                        </Link>
                        <Margin></Margin>
                        <Link to='/photo-app/posts/rating' onClick={()=>changeSort('ratio')} style={{textDecoration: 'none'}}>
                            <LI  underline={props.sortCriteria.rating ? true : false}>Highest rated</LI>
                        </Link>
                    </div>
                    <div style={{display: 'flex', marginRight: '10px'}} >
                        <div className='categories-dropdown'>
                            <div style={{display: 'flex', cursor: 'pointer'}} onClick={()=>props.setShowCategories(!props.showCategories)}>
                                <CategoriesButton className='categories-dropdown'>
                                    {props.sortCriteria.category} 
                                </CategoriesButton>
                                <TriangleIcon className='categories-dropdown'>&#x25BC;</TriangleIcon>
                            </div>
                            {props.showCategories ? 
                            <div style={{position: 'relative'}}>
                                <SubheaderCategories 
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
                    </div>
                </UL>
            </Container>
            <Container>
                <ULMobile>
                    <div style={{display: 'flex'}}>
                        <LI onClick={openDropdown}>Sort &#x25BC;</LI>
                        <LI onClick={openDropdownCategories}>{props.sortCriteria.category} &#x25BC;</LI>
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