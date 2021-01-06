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
    TitleEllipsisContainer,
    Ellipsis,
} from './UserPosts.styles'
import PostDropdown from './UserPostsDropdown'
import { connect } from 'react-redux'
 
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
        if (!e.target.className.includes('user-post-dropdown')) {
            setShowOptions(false)
        }
    } 

    return(
        <PostContainer opacity={isVisible ? 1 : 0} shouldHover={!props.showGear}>
            {showEdit ? 
            <EditPost getPosts={props.getPosts} setShowEdit={setShowEdit} postData={postData}/>
            :
            null
            }
            {showDelete ? 
            <DeletePost setShowGear={props.setShowGear} removePostFromPosts={props.removePostFromPosts} index={props.index} title={props.post.title} image={props.post.image} username={props.post.username} url={props.post.url} setShowDelete={setShowDelete} />
            :
            null
            }
            <Photo onLoad={()=> setIsVisible(true)} onClick={selectPhoto} src={props.post.smallImage} alt='display'></Photo>
                <TitleEllipsisContainer>
                    <PostTitle onClick={selectPhoto}>{props.post.title}</PostTitle>
                    <div style={{position: 'relative'}}>
                        <Ellipsis onClick={()=> setShowOptions(!showOptions)} className={'user-post-dropdown'}>&#8942;</Ellipsis>
                        {showOptions ? 
                        <PostDropdown setShowEdit={setShowEdit} getPostData={getPostData} setShowOptions={setShowOptions} setShowGear={props.setShowGear} posts={props.post} setShowDelete={setShowDelete} />
                        :
                        null
                        }
                    </div>
                </TitleEllipsisContainer>
        </PostContainer>
    )
}

const UserPosts = (props) => {

    const [posts, setPosts] = useState([])
    const [showGear, setShowGear] = useState(false)
        const getPosts = () => {
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
        
        useEffect(()=>  {
            getPosts(props.user)
            // eslint-disable-next-line
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
                            getPosts={getPosts}
                            setShowGear={setShowGear}
                            showGear={showGear}
                            removePostFromPosts={removePostFromPosts}
                            history={props.history}
                            getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
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

const mapStateToProps = state => ({
    user: state.app.user,
})

export default connect(mapStateToProps)(UserPosts)