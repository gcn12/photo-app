import React from 'react'
import { ReactComponent as ArrowIcon } from '../Icons/Arrow.svg'
import { Link } from 'react-router-dom'
import { Text } from '../Styles/GlobalStyles.styles'
import {
    Container,
    Image,
    PostsContainer,
    PostContainer,
    TextContainer,
    Header,
    Arrow,
    ImageArrowContainer,
} from './FeaturedPlaces.styles'

const FeaturedPlaces = (props) => {

    return(
        <Container>
            <Header>{props.title}</Header>
            <PostsContainer>
                {props.posts.map((post, index)=> {
                    return(
                        <PostDisplay goToPlacesPage={props.goToPlacesPage} post={post} key={index} />
                    )
                })}
            </PostsContainer>
        </Container>
    )
}

const PostDisplay = (props) => {
    return(
        <PostContainer>
            <TextContainer>
                <Link to='/photo-app/posts/popular'onClick={()=>props.goToPlacesPage(props.post.location)} style={{textDecoration: 'none'}}>
                    <ImageArrowContainer>
                        <Image src={props.post.smallImage} alt='' />
                        <Arrow>
                            <ArrowIcon />
                        </Arrow>
                    </ImageArrowContainer>
                    <Text>{props.post.location}</Text>
                </Link>
            </TextContainer>
        </PostContainer>
    )
}

export default FeaturedPlaces