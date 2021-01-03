import React from 'react'
import { homePhotoInformation, sortCriteria } from '../Redux/Actions/appActions'
import { connect } from 'react-redux'
import {
    Container,
    LI,
    UL,
} from './SubheaderCategories.styles'

const SubheaderCategories = (props) => {

    const getPhotos = (category) => {
        if(props.location.pathname.includes('/photo-app/posts')){
            if(category !== props.sortCriteria.category) {
                props.dispatch(homePhotoInformation([]))
                // props.setIsMainPhotosVisible(false)
                let criteria = props.sortCriteria
                criteria['category'] = category
                props.dispatch(sortCriteria(criteria))
                props.sort(criteria, true)
            }
        }
        if(props.location.pathname.includes('/photo-app/search')){ 
            if(category !== props.sortCriteria.category) {
                let criteria = props.sortCriteria
                criteria['category'] = category
                props.dispatch(sortCriteria(criteria))
                props.search(props.searchQueries, `category: ${category}`)
            }
        }
    }

    return(
        <Container className='categories-dropdown'>
            <UL className='categories-dropdown'>
                <LI onClick={()=>getPhotos('all categories')}>All categories</LI>
                <LI onClick={()=>getPhotos('entertainment')}>Entertainment</LI>
                <LI onClick={()=>getPhotos('adventure')}>Adventure</LI>
                <LI onClick={()=>getPhotos('restaurant')}>Restaurant</LI>
                <LI onClick={()=>getPhotos('sightseeing')}>Sightseeing</LI>
                <LI onClick={()=>getPhotos('shopping')}>Shopping</LI>
                <LI onClick={()=>getPhotos('museum')}>Museum</LI>
            </UL>
        </Container>
    )
}

const mapStateToProps = state => ({
    homePhotoInformation: state.app.homePhotoInformation,
    searchQueries: state.app.searchQueries,
    sortCriteria: state.app.sortCriteria,
})

export default connect(mapStateToProps)(SubheaderCategories)


// import React from 'react'
// import {
//     Container,
//     LI,
//     UL,
// } from './SubheaderCategories.styles'

// const SubheaderCategories = (props) => {

//     const changeCategory = (category) => {
//         if(category !== props.sortCriteria.category) {
//             props.search(props.searchQueries, `category: ${category}`)
//         }
//     }

//     return(
//         <Container className='categories-dropdown'>
//             <UL className='categories-dropdown'>
//                 <LI onClick={()=>changeCategory('all categories')}>All categories</LI>
//                 <LI onClick={()=>changeCategory('entertainment')}>Entertainment</LI>
//                 <LI onClick={()=>changeCategory('adventure')}>Adventure</LI>
//                 <LI onClick={()=>changeCategory('restaurant')}>Restaurant</LI>
//                 <LI onClick={()=>changeCategory('sightseeing')}>Sightseeing</LI>
//                 <LI onClick={()=>changeCategory('shopping')}>Shopping</LI>
//                 <LI onClick={()=>changeCategory('museum')}>Museum</LI>
//             </UL>
//         </Container>
//     )
// }

// export default SubheaderCategories