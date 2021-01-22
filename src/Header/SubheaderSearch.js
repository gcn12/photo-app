import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { 
    homePhotoInformation, 
    searchQueries,
} from '../Redux/Actions/appActions'
import { 
    // dropdownTransition, 
    // visibility, 
    // dropdownCategoriesTransition, 
    // categoriesVisibility, 
    selected } from '../Redux/Actions/headerActions'
import {
    Container,
    LI,
    Margin,
    ULSearch,
} from './SubheaderPosts.styles'
// import SubheaderCategories from './SubheaderCategories'


const Subheader = (props) => {
    // const [category, setCategory] = useState('all categories')
    // const [result, setResult] = useState('all results')
    // const [showCategories, setShowCategories] = useState(false)
    // const [showResults, setShowResults] = useState(false)
    // const openDropdown = () => {
    //     props.dispatch(dropdownTransition('transitionStart'))
    //     props.dispactch(visibility(true))
    //     document.body.style.overflowY = 'hidden'
    //     // document.body.style.position = 'fixed'
    // }

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

    // const openDropdownCategories = () => {
    //     props.dispatch(dropdownCategoriesTransition('transitionStart'))
    //     props.dispatch(categoriesVisibility(true))
    //     document.body.style.overflowY = 'hidden'
    //     // document.body.style.position = 'fixed'
    // }

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
                <ULSearch>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <LI onClick={()=>changeSort('all results')} underline={props.searchQueries === 'all results' ? true : false}>All results</LI>
                        <Margin></Margin>
                        <LI onClick={()=>changeSort('places')} underline={props.searchQueries === 'places' ? true : false}>Places</LI>
                        <Margin></Margin>
                        <LI onClick={()=>changeSort('posts')} underline={props.searchQueries === 'posts' ? true : false}>Posts</LI>
                        <Margin></Margin>
                        <LI onClick={()=>changeSort('people')} underline={props.searchQueries === 'people' ? true : false}>People</LI>
                    </div>
                    <div style={{display: 'flex'}} >
                        <div style={{display: 'flex'}} className='categories-dropdown'>
                            {/* {props.searchQueries === 'posts' ? 
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
                            } */}
                        </div>
                    </div>
                </ULSearch>
            </Container>
            {/* <Container>
                <ULMobile>
                    <div style={{display: 'flex'}}>
                        <LI onClick={openDropdown}>Sort &#x25BC;</LI>
                        <LI onClick={openDropdownCategories}>{props.sortCriteria.category} &#x25BC;</LI>
                    </div>
                </ULMobile>
            </Container> */}
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