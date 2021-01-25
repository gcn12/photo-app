import React from 'react'
import { Link } from 'react-router-dom' 
import {
    SmallImage,
    LargeImage,
    ImagesContainer,
    CategoryText,
    PhotoTextContainer,
} from './CategoriesDisplay.styles'
 
const CategoriesDisplay = () => {

    return(
        <div>
            <ImagesContainer>
                <Link to='/photo-app/posts/popular'>
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText>Museums</CategoryText>
                        <LargeImage src='https://images.unsplash.com/photo-1534235826754-0a3572d1d6d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80' alt=''/>
                    </PhotoTextContainer>
                </Link>
                <Link to='/photo-app/posts/popular'>
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText>Adventure</CategoryText>
                        <SmallImage src='https://images.unsplash.com/photo-1513517860393-d9bf0651bed8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80' alt='' />
                    </PhotoTextContainer>
                </Link>
            </ImagesContainer>
            <ImagesContainer>
                <Link to='/photo-app/posts/popular'>
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText>Entertainment</CategoryText>
                        <SmallImage src='https://images.unsplash.com/photo-1582152492243-a32086530356?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8dGhlYXRlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' alt='' />
                    </PhotoTextContainer>
                </Link>
                <Link to='/photo-app/posts/popular'>  
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText>Shopping</CategoryText>
                    <   LargeImage src='https://images.unsplash.com/photo-1541786867110-d742cfa9c232?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2350&q=80' alt=''/>
                    </PhotoTextContainer>
                </Link>
            </ImagesContainer>
            <ImagesContainer>
                <Link to='/photo-app/posts/popular'>
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText>Restaurants</CategoryText>
                        <LargeImage src='https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' alt=''/>
                    </PhotoTextContainer>
                </Link>
                <Link to='/photo-app/posts/popular'>
                    <PhotoTextContainer style={{position: 'relative'}}>
                        <CategoryText>Sightseeing</CategoryText>
                        <SmallImage src='https://images.unsplash.com/photo-1556408001-287a5db9c67e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHNpZ2h0c2VlaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' alt='' />
                    </PhotoTextContainer>
                </Link>
            </ImagesContainer>
        </div>
    )
}

export default CategoriesDisplay