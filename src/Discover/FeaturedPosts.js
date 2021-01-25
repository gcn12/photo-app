import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import {
    Container,
    Image,
    PostsContainer,
    PostContainer,
    TextContainer,
    Header,
} from './FeaturedPosts.styles'

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
            <Image src={props.post.smallImage} alt='' />
            <TextContainer>{props.post.location}</TextContainer>
        </PostContainer>
    )
}

export default FeaturedPosts