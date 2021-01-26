import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import { ReactComponent as ArrowIcon } from '../Icons/Arrow.svg'
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

const FeaturedPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(()=> {
        db.collection('preview-posts')
        .orderBy('ratio', 'desc')
        .limit(4)
        .get()
        .then(posts=> {
            let postsArray = []
            posts.forEach(post=> {
                postsArray.push(post.data())
            })
            setPosts(postsArray)
        })
    },[])

    return(
        <Container>
            <Header>Popular Destinations</Header>
            <PostsContainer>
                {posts.map((post, index)=> {
                    return(
                        <PostDisplay post={post} key={index} />
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
                <ImageArrowContainer>
                    <Image src={props.post.smallImage} alt='' />
                    <Arrow>
                        <ArrowIcon />
                    </Arrow>
                </ImageArrowContainer>
                {props.post.location}
            </TextContainer>
        </PostContainer>
    )
}

export default FeaturedPosts