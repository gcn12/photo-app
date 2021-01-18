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
    Location,
    TitleGearContainer,
} from '../PublicProfile/PublicProfilesPosts.styles'

const UserPrivateProfilesPosts = (props) => {

    const [isPrivatePostVisible, setIsPrivatePostVisible] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [postData, setPostData] = useState([])


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

    const selectPhoto = () => {
        props.dispatch(isVisible(false))
        props.dispatch(isPostVisible(false))
        // props.getFeaturedPhotoInfo(props.post.postID)
    }

    const removePostFromPosts = (postIndex) => {
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
        const toNotLock = document.getElementById('edit-post-scroll-container')
        enableBodyScroll(toNotLock)
    }

    const openEdit = () => {
        setShowEdit(true)
        // const toNotLock = document.getElementById('edit-post-scroll-container')
        // disableBodyScroll(toNotLock)
    }

    const closeEdit = () => {
        setShowEdit(false)
        const toNotLock = document.getElementById('edit-post-scroll-container')
        enableBodyScroll(toNotLock)
    }

    return(
        <Container marginTop='30px' visibility={isPrivatePostVisible ? 1 : 0} >
            {showEdit ? 
            <div>
                <PopupDarken onClick={closeEdit} />
                <EditPost closeEdit={closeEdit} getPosts={props.getUserProfile} setShowEdit={setShowEdit} postData={postData} />
            </div>
            :
            null
            }
            {showDelete ? 
            <div>
                <PopupDarken onClick={closeDelete} />
                <DeletePost post={props.post} location={props.post.location} country={props.post.country} closeDelete={closeDelete} removePostFromPosts={removePostFromPosts} setShowGear={props.setShowGear} postID={props.post.postID} index={props.index} title={props.post.title} image={props.post.image} username={props.post.username} url={props.post.url} setShowDelete={setShowDelete} />
            </div>
            :
            null
            }
            <Link to={`/photo-app/post/${props.post.postID}`} onClick={selectPhoto}>
                <Image minWidth='200px' height='220px' onLoad={()=> setIsPrivatePostVisible(true)} src={props.post.smallImage} alt=''></Image>
            </Link>
            <TitleGearContainer>
                <Link to={`/photo-app/post/${props.post.postID}`} onClick={selectPhoto} style={{textDecoration: 'none'}}>
                    <Title>{props.post.title}</Title>
                </Link>
                <div>
                    <img alt='' className='user-post-dropdown' onClick={()=> setShowOptions(!showOptions)} style={{transform: 'scale(.95)', position: 'relative', top: 7}} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTMuNjE2di0zLjIzMmMtMS42NTEtLjU4Ny0yLjY5NC0uNzUyLTMuMjE5LTIuMDE5di0uMDAxYy0uNTI3LTEuMjcxLjEtMi4xMzQuODQ3LTMuNzA3bC0yLjI4NS0yLjI4NWMtMS41NjEuNzQyLTIuNDMzIDEuMzc1LTMuNzA3Ljg0N2gtLjAwMWMtMS4yNjktLjUyNi0xLjQzNS0xLjU3Ni0yLjAxOS0zLjIxOWgtMy4yMzJjLS41ODIgMS42MzUtLjc0OSAyLjY5Mi0yLjAxOSAzLjIxOWgtLjAwMWMtMS4yNzEuNTI4LTIuMTMyLS4wOTgtMy43MDctLjg0N2wtMi4yODUgMi4yODVjLjc0NSAxLjU2OCAxLjM3NSAyLjQzNC44NDcgMy43MDctLjUyNyAxLjI3MS0xLjU4NCAxLjQzOC0zLjIxOSAyLjAydjMuMjMyYzEuNjMyLjU4IDIuNjkyLjc0OSAzLjIxOSAyLjAxOS41MyAxLjI4Mi0uMTE0IDIuMTY2LS44NDcgMy43MDdsMi4yODUgMi4yODZjMS41NjItLjc0MyAyLjQzNC0xLjM3NSAzLjcwNy0uODQ3aC4wMDFjMS4yNy41MjYgMS40MzYgMS41NzkgMi4wMTkgMy4yMTloMy4yMzJjLjU4Mi0xLjYzNi43NS0yLjY5IDIuMDI3LTMuMjIyaC4wMDFjMS4yNjItLjUyNCAyLjEyLjEwMSAzLjY5OC44NTFsMi4yODUtMi4yODZjLS43NDQtMS41NjMtMS4zNzUtMi40MzMtLjg0OC0zLjcwNi41MjctMS4yNzEgMS41ODgtMS40NCAzLjIyMS0yLjAyMXptLTEyIDIuMzg0Yy0yLjIwOSAwLTQtMS43OTEtNC00czEuNzkxLTQgNC00IDQgMS43OTEgNCA0LTEuNzkxIDQtNCA0eiIvPjwvc3ZnPg==" />
                    {showOptions ? 
                    // translate(165%, 55%)
                    <PostDropdown openEdit={openEdit} openDelete={openDelete} translateContainer='translate(-73%, 20%)'  setShowEdit={setShowEdit} getPostData={getPostData} setShowOptions={setShowOptions} setShowGear={props.setShowGear} posts={props.post} setShowDelete={setShowDelete} />
                    :
                    null
                    }
                </div>
            </TitleGearContainer>
            <Location>{props.post.location}</Location>
            {/* <Title>{props.post.previewDescription}</Title> */}
        </Container>
    )
}

const mapStateToProps = state => ({
    userPosts: state.app.userPosts,
})

export default connect(mapStateToProps)(UserPrivateProfilesPosts)