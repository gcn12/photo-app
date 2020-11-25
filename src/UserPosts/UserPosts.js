import React, {
    useEffect,
    useState,
} from 'react'
import { db } from '../Firebase'
import {
    Photo,
    PostsContainer,
    PostContainer,
    PostTitle,
} from './UserPosts.styles'

const DisplayPosts = (props) => {

    const selectPhoto = () => {
        props.getFeaturedPhotoInfo(props.post.id)
    }

    return(
        <PostContainer onClick={selectPhoto}>
            <Photo src={props.post.image} alt='display'></Photo>
            <PostTitle>{props.post.title}</PostTitle>
        </PostContainer>
    )
}

const UserPosts = (props) => {

    const [posts, setPosts] = useState([])
    
    useEffect(()=>  {
        const getPosts = (user) => {
            if (props.user) {
                db.collection('users').doc(user)
                .collection('posts')
                .get()
                .then(posts => {
                    const postsArray = []
                    posts.docs.forEach(post => {
                        postsArray.push(post.data())
                    })
                    setPosts(postsArray)
                })
            }
            console.log('running')
        }
        getPosts(props.user)
    }, [props.user])

    return(
        <div>
            <div>
            <PostsContainer>
                {posts?.map((post, index)=> {
                    return(
                        <DisplayPosts 
                            getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                            setPhotoInformation={props.setPhotoInformation} 
                            setPageRoute={props.setPageRoute} 
                            key={index} 
                            post={post}
                        />
                        )
                    })}
            </PostsContainer>
            </div>
        </div>
    )
}

export default UserPosts