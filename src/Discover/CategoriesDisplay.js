import React from 'react'
import { Link } from 'react-router-dom' 
import { connect } from 'react-redux'
import { sortCriteria } from '../Redux/Actions/appActions'
import { homePhotoInformation } from '../Redux/Actions/appActions'
import {
    SmallImage,
    LargeImage,
    ImagesContainer,
    CategoryText,
    PhotoTextContainer,
    GradientDarken,
} from './CategoriesDisplay.styles'
 
const CategoriesDisplay = (props) => {

    const routeToCategoryPage = (category) => {
        props.dispatch(homePhotoInformation([]))
        const criteria = {...props.sortCriteria}
        criteria['location'] = ''
        criteria['country'] = ''
        criteria['category'] = category
        criteria['views'] = true
        criteria['new'] = false
        criteria['rating'] = false
        props.sort(criteria, true)
        props.dispatch(sortCriteria({...criteria}))
    }

    return(
        <div>
            <ImagesContainer>
                <Link to='/photo-app/posts/popular/museum' onClick={()=>routeToCategoryPage('museum')}>
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText smallImage='0'>Museums</CategoryText>
                        <GradientDarken>
                            <LargeImage src='https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/site_photos%2Fmuseum.jpg?alt=media&token=4929036e-bdd0-4e59-b3ba-3d2a08251fec' alt=''/>
                        </GradientDarken>
                    </PhotoTextContainer>
                </Link>
                <Link to='/photo-app/posts/popular/adventure' onClick={()=>routeToCategoryPage('adventure')}>
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText smallImage='1'>Adventure</CategoryText>
                        <GradientDarken>
                            <SmallImage src='https://images.unsplash.com/photo-1513517860393-d9bf0651bed8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80' alt='' />
                        </GradientDarken>
                    </PhotoTextContainer>
                </Link>
            </ImagesContainer>
            <ImagesContainer>
                <Link to='/photo-app/posts/popular/entertainment' onClick={()=>routeToCategoryPage('entertainment')}>
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText smallImage='1'>Entertainment</CategoryText>
                        <GradientDarken>
                            <SmallImage src='https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/site_photos%2Fentertainment.jpg?alt=media&token=44a1b95c-f87a-4b18-a30a-2764c930bc68' alt='' />
                        </GradientDarken>
                    </PhotoTextContainer>
                </Link>
                <Link to='/photo-app/posts/popular/shopping' onClick={()=>routeToCategoryPage('shopping')}>  
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText smallImage='0'>Shopping</CategoryText>
                        <GradientDarken>
                            <LargeImage src='https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/site_photos%2Fshopping.jpg?alt=media&token=bbf19037-67d7-4634-9b06-bd325ce10c6e' alt=''/>
                        </GradientDarken>
                    </PhotoTextContainer>
                </Link>
            </ImagesContainer>
            <ImagesContainer>
                <Link to='/photo-app/posts/popular/restaurants' onClick={()=>routeToCategoryPage('restaurant')}>
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText smallImage='0'>Restaurants</CategoryText>
                        <GradientDarken>
                            <LargeImage src='https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' alt=''/>
                        </GradientDarken>
                    </PhotoTextContainer>
                </Link>
                <Link to='/photo-app/posts/popular/sightseeing' onClick={()=>routeToCategoryPage('sightseeing')}>
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText smallImage='1'>Sightseeing</CategoryText>
                        <GradientDarken>
                            <SmallImage src='https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/site_photos%2Fsightseeing.jpg?alt=media&token=3c1acad7-9919-439a-8174-f6ae6d25c1ce' alt='' />
                        </GradientDarken>
                    </PhotoTextContainer>
                </Link>
            </ImagesContainer>
        </div>
    )
}

const mapStateToProps = state => ({
    sortCriteria: state.app.sortCriteria
})

export default connect(mapStateToProps)(CategoriesDisplay)