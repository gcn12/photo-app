import React, { useState } from 'react'
import PostDropdown from '../UserPosts/UserPostsDropdown'
import DeletePost from '../UserPosts/DeletePost'
import EditPost from '../UserPosts/EditPost'
import { userPosts } from '../Redux/Actions/appActions'
import { isVisible, isPostVisible } from '../Redux/Actions/featuredPostActions'
import { connect } from 'react-redux'
import { db } from '../Firebase'
import { PopupDarken } from '../Styles/PopupStyles.styles'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { Link } from 'react-router-dom'
import {
    Container,
    Image,
    Title,
    TitleGearContainer,
} from '../PublicProfile/PublicProfilesPosts.styles'
import { Text } from '../Styles/GlobalStyles.styles'

const UserPrivateProfilesPosts = (props) => {

    const [isPrivatePostVisible, setIsPrivatePostVisible] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [postData, setPostData] = useState({})


    const getPostData = () => {
        db.collection('posts')
        .doc(props.post.id)
        .get()
        .then(post=> {
            setPostData({...post.data()})
        })
    }

    const selectPhoto = () => {
        props.dispatch(isVisible(false))
        props.dispatch(isPostVisible(false))
    }

    const removePostFromPostsOnDelete = (postIndex) => {
        const postsCopy = [...props.userPosts]
        postsCopy.splice(postIndex, 1)
        props.dispatch(userPosts([...postsCopy]))
    }

    window.onclick = (e) => {
        if (!e.target.matches('.user-post-dropdown')) {
            setShowOptions(false)
        }
    } 

    const openDelete = () => {
        setShowDelete(true)
        disableBodyScroll(document.body)
    }

    const closeDelete = () => {
        setShowDelete(false)
        enableBodyScroll(document.body)
    }

    const openEdit = () => {
        setShowEdit(true)
    }

    const closeEdit = () => {
        setShowEdit(false)
        const toNotLock = document.getElementById('edit-post-scroll')
        enableBodyScroll(toNotLock)
    }

    return(
        <Container marginTop='30px' visibility={isPrivatePostVisible ? 1 : 0} >
            <Link to={`/photo-app/post/${props.post.postID}`} onClick={selectPhoto}>
                <Image minWidth='200px' onLoad={()=> setIsPrivatePostVisible(true)} src={props.post.smallImage} alt='' />
            </Link>
            <TitleGearContainer>
                <Link to={`/photo-app/post/${props.post.postID}`} onClick={selectPhoto} style={{textDecoration: 'none'}}>
                    <Title>{props.post.title}</Title>
                </Link>
                    {/* <button onClick={()=> setShowOptions(!showOptions)} className='user-post-dropdown' style={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'relative'}}> */}
                        <div style={{position: 'relative'}}>
                            <img alt='' onClick={()=> setShowOptions(!showOptions)} className='user-post-dropdown' style={{transform: 'scale(.95)', position: 'relative', top: 7}} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTMuNjE2di0zLjIzMmMtMS42NTEtLjU4Ny0yLjY5NC0uNzUyLTMuMjE5LTIuMDE5di0uMDAxYy0uNTI3LTEuMjcxLjEtMi4xMzQuODQ3LTMuNzA3bC0yLjI4NS0yLjI4NWMtMS41NjEuNzQyLTIuNDMzIDEuMzc1LTMuNzA3Ljg0N2gtLjAwMWMtMS4yNjktLjUyNi0xLjQzNS0xLjU3Ni0yLjAxOS0zLjIxOWgtMy4yMzJjLS41ODIgMS42MzUtLjc0OSAyLjY5Mi0yLjAxOSAzLjIxOWgtLjAwMWMtMS4yNzEuNTI4LTIuMTMyLS4wOTgtMy43MDctLjg0N2wtMi4yODUgMi4yODVjLjc0NSAxLjU2OCAxLjM3NSAyLjQzNC44NDcgMy43MDctLjUyNyAxLjI3MS0xLjU4NCAxLjQzOC0zLjIxOSAyLjAydjMuMjMyYzEuNjMyLjU4IDIuNjkyLjc0OSAzLjIxOSAyLjAxOS41MyAxLjI4Mi0uMTE0IDIuMTY2LS44NDcgMy43MDdsMi4yODUgMi4yODZjMS41NjItLjc0MyAyLjQzNC0xLjM3NSAzLjcwNy0uODQ3aC4wMDFjMS4yNy41MjYgMS40MzYgMS41NzkgMi4wMTkgMy4yMTloMy4yMzJjLjU4Mi0xLjYzNi43NS0yLjY5IDIuMDI3LTMuMjIyaC4wMDFjMS4yNjItLjUyNCAyLjEyLjEwMSAzLjY5OC44NTFsMi4yODUtMi4yODZjLS43NDQtMS41NjMtMS4zNzUtMi40MzMtLjg0OC0zLjcwNi41MjctMS4yNzEgMS41ODgtMS40NCAzLjIyMS0yLjAyMXptLTEyIDIuMzg0Yy0yLjIwOSAwLTQtMS43OTEtNC00czEuNzkxLTQgNC00IDQgMS43OTEgNCA0LTEuNzkxIDQtNCA0eiIvPjwvc3ZnPg==" />
                            {showOptions && 
                            <PostDropdown openEdit={openEdit} openDelete={openDelete} translateContainer='translate(-70%, 22%)'  setShowEdit={setShowEdit} getPostData={getPostData} setShowOptions={setShowOptions} setShowGear={props.setShowGear} posts={props.post} setShowDelete={setShowDelete} />
                            }
                        </div>
                    {/* </button> */}
            </TitleGearContainer>
            {showDelete && 
            <div>
                <PopupDarken onClick={closeDelete} />
                <DeletePost post={props.post} closeDelete={closeDelete} removePostFromPostsOnDelete={removePostFromPostsOnDelete} index={props.index} setShowDelete={setShowDelete} />
            </div>}
            {showEdit && 
            <div>
                <PopupDarken />
                <EditPost setPostData={setPostData} closeEdit={closeEdit} getPosts={props.getUserProfile} postData={postData} />
            </div>}
            <Text size='16px'>{props.post.location}</Text>
        </Container>
    )
}

const mapStateToProps = state => ({
    userPosts: state.app.userPosts,
})

export default connect(mapStateToProps)(UserPrivateProfilesPosts)