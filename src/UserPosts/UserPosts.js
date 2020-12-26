import React, {
    useEffect,
    useState,
} from 'react'
import { db } from '../Firebase'
import DeletePost from './DeletePost'
import EditPost from './EditPost'
import {
    Photo,
    PostsContainer,
    PostContainer, 
    PostTitle,
    GearIcon,
} from './UserPosts.styles'
import PostDropdown from './UserPostsDropdown'
 
export const DisplayPosts = (props) => {

    const [showOptions, setShowOptions] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [postData, setPostData] = useState([])
    const [isVisible, setIsVisible] = useState(false)

    const selectPhoto = () => {
        props.getFeaturedPhotoInfo(props.post.url, props.post.username)
        props.history.push(`/photo-app/post/${props.post.username}/${props.post.url}`)
    }

    const getPostData = () => {
        db.collection('posts')
        .where('username', '==', props.post.username)
        .where('url', '==', props.post.url)
        .get()
        .then(data=> {
            const dataArray = []
            data.forEach(item=> {
                dataArray.push(item.data())
            })
            setPostData(dataArray)
        })
    }

    window.onclick = (e) => {
        if (!e.target.matches('.user-post-dropdown')) {
            setShowOptions(false)
        }
    } 

    return(
        <PostContainer opacity={isVisible ? 1 : 0} shouldHover={!props.showGear}>
            {showEdit ? 
            <EditPost user={props.user} setShowEdit={setShowEdit} postData={postData}/>
            :
            null
            }
            {showDelete ? 
            <DeletePost user={props.user} setShowGear={props.setShowGear} removePostFromPosts={props.removePostFromPosts} index={props.index} title={props.post.title} image={props.post.image} username={props.post.username} url={props.post.url} setShowDelete={setShowDelete} />
            :
            null
            }
            <div style={{padding: '0px', position: 'relative'}}>
                <GearIcon display={showOptions ? 'initial' : 'none'} opacity={showOptions ? '1' : '0'} visibility={showOptions ? 'visible' : 'hidden'} onClick={()=>setShowOptions(!showOptions)} alt='settings' className='user-post-dropdown' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTMuNjE2di0zLjIzMmMtMS42NTEtLjU4Ny0yLjY5NC0uNzUyLTMuMjE5LTIuMDE5di0uMDAxYy0uNTI3LTEuMjcxLjEtMi4xMzQuODQ3LTMuNzA3bC0yLjI4NS0yLjI4NWMtMS41NjEuNzQyLTIuNDMzIDEuMzc1LTMuNzA3Ljg0N2gtLjAwMWMtMS4yNjktLjUyNi0xLjQzNS0xLjU3Ni0yLjAxOS0zLjIxOWgtMy4yMzJjLS41ODIgMS42MzUtLjc0OSAyLjY5Mi0yLjAxOSAzLjIxOWgtLjAwMWMtMS4yNzEuNTI4LTIuMTMyLS4wOTgtMy43MDctLjg0N2wtMi4yODUgMi4yODVjLjc0NSAxLjU2OCAxLjM3NSAyLjQzNC44NDcgMy43MDctLjUyNyAxLjI3MS0xLjU4NCAxLjQzOC0zLjIxOSAyLjAydjMuMjMyYzEuNjMyLjU4IDIuNjkyLjc0OSAzLjIxOSAyLjAxOS41MyAxLjI4Mi0uMTE0IDIuMTY2LS44NDcgMy43MDdsMi4yODUgMi4yODZjMS41NjItLjc0MyAyLjQzNC0xLjM3NSAzLjcwNy0uODQ3aC4wMDFjMS4yNy41MjYgMS40MzYgMS41NzkgMi4wMTkgMy4yMTloMy4yMzJjLjU4Mi0xLjYzNi43NS0yLjY5IDIuMDI3LTMuMjIyaC4wMDFjMS4yNjItLjUyNCAyLjEyLjEwMSAzLjY5OC44NTFsMi4yODUtMi4yODZjLS43NDQtMS41NjMtMS4zNzUtMi40MzMtLjg0OC0zLjcwNi41MjctMS4yNzEgMS41ODgtMS40NCAzLjIyMS0yLjAyMXptLTEyIDIuMzg0Yy0yLjIwOSAwLTQtMS43OTEtNC00czEuNzkxLTQgNC00IDQgMS43OTEgNCA0LTEuNzkxIDQtNCA0eiIvPjwvc3ZnPg==" />
                {showOptions ? 
                <PostDropdown setShowEdit={setShowEdit} getPostData={getPostData} setShowOptions={setShowOptions} setShowGear={props.setShowGear} posts={props.post} setShowDelete={setShowDelete} />
                :
                null
                }
            </div>
            <Photo onLoad={()=> setIsVisible(true)} onClick={selectPhoto} src={props.post.smallImage} alt='display'></Photo>
            <PostTitle onClick={selectPhoto}>{props.post.title}</PostTitle>
        </PostContainer>
    )
}

const UserPosts = (props) => {

    const [posts, setPosts] = useState([])
    const [showGear, setShowGear] = useState(false)
    
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

    const removePostFromPosts = (postIndex) => {
        const postsCopy = posts
        postsCopy.splice(postIndex, 1)
        setPosts([...postsCopy])
    }

    return(
        <div>
            <div>
            <PostsContainer>
                {posts?.map((post, index)=> {
                    return(
                        <DisplayPosts 
                            user={props.user}
                            setShowGear={setShowGear}
                            showGear={showGear}
                            removePostFromPosts={removePostFromPosts}
                            history={props.history}
                            getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                            setPhotoInformation={props.setPhotoInformation} 
                            key={index} 
                            post={post}
                            index={index}
                        />
                        )
                    })}
            </PostsContainer>
            </div>
        </div>
    )
}

export default UserPosts