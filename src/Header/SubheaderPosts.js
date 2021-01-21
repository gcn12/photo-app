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
    Margin, 
    ArrowIcon,
    CategorySelected,
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
                                <ArrowIcon className='categories-dropdown' alt='' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMy4yNDUgNGwtMTEuMjQ1IDE0LjM3NC0xMS4yMTktMTQuMzc0LS43ODEuNjE5IDEyIDE1LjM4MSAxMi0xNS4zOTEtLjc1NS0uNjA5eiIvPjwvc3ZnPg==" />
                                {/* <TriangleIcon className='categories-dropdown'>&#x25BC;</TriangleIcon> */}
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
                    {console.log(props.sortCriteria)}
                    <div style={{display: 'flex'}}>
                        <LI onClick={openDropdown}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                Sort by:
                                &nbsp;
                                {props.sortCriteria.new &&
                                <div>Newest</div>
                                }
                                {props.sortCriteria.views &&
                                <div>Popular</div>
                                }
                                {props.sortCriteria.rating &&
                                <div>Highest rated</div>
                                }
                                <ArrowIcon alt='' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMy4yNDUgNGwtMTEuMjQ1IDE0LjM3NC0xMS4yMTktMTQuMzc0LS43ODEuNjE5IDEyIDE1LjM4MSAxMi0xNS4zOTEtLjc1NS0uNjA5eiIvPjwvc3ZnPg==" />
                            </div>
                        </LI>
                        <div style={{marginRight: '12px'}}></div>
                        <LI onClick={openDropdownCategories}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <CategorySelected>{props.sortCriteria.category}</CategorySelected>
                                <ArrowIcon alt='' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMy4yNDUgNGwtMTEuMjQ1IDE0LjM3NC0xMS4yMTktMTQuMzc0LS43ODEuNjE5IDEyIDE1LjM4MSAxMi0xNS4zOTEtLjc1NS0uNjA5eiIvPjwvc3ZnPg==" />
                            </div>
                        </LI>
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