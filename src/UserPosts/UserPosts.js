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
 
export const DisplayPosts = (props) => {

    const selectPhoto = () => {
        props.getFeaturedPhotoInfo(props.post.url, props.post.username)
        props.history.push(`/photo-app/post/${props.post.username}/${props.post.url}`)
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
                db.collection('users').doc(props.user)
                .get()
                .then(data=> {
                    const username = data.data().username
                    db.collection('preview-posts').where('username', '==', username)
                    .orderBy('timestamp', 'desc')
                    .get()
                    .then(posts => {
                        const postsArray = []
                        posts.docs.forEach(post => {
                            postsArray.push(post.data())
                        })
                        setPosts(postsArray)
                    })
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
                            history={props.history}
                            getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                            setPhotoInformation={props.setPhotoInformation} 
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