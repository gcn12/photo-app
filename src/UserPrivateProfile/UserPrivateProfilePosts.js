import React, { useState } from 'react'
import PostDropdown from '../UserPosts/UserPostsDropdown'
import DeletePost from '../UserPosts/DeletePost'
import EditPost from '../UserPosts/EditPost'
import { userPosts } from '../Redux/Actions/appActions'
import { connect } from 'react-redux'
import { db } from '../Firebase'
import {
    Container,
    Image,
    Title,
    Location,
    TitleGearContainer,
} from '../PublicProfile/PublicProfilesPosts.styles'

const UserPrivateProfilesPosts = (props) => {

    const [isVisible, setIsVisible] = useState(false)
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
        props.getFeaturedPhotoInfo(props.post.url, props.post.username)
        props.history.push(`/photo-app/post/${props.post.postID}`)
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

    return(
        <Container visibility={isVisible ? 1 : 0} >
            {showEdit ? 
            <EditPost getPosts={props.getUserProfile} setShowEdit={setShowEdit} postData={postData} />
            :
            null
            }
            {showDelete ? 
            <DeletePost removePostFromPosts={removePostFromPosts} setShowGear={props.setShowGear} index={props.index} title={props.post.title} image={props.post.image} username={props.post.username} url={props.post.url} setShowDelete={setShowDelete} />
            :
            null
            }
            <Image onClick={selectPhoto} onLoad={()=> setIsVisible(true)} src={props.post.smallImage} alt=''></Image>
            <TitleGearContainer>
                <Title onClick={selectPhoto}>{props.post.title}</Title>
                <div>
                    <img alt='' className='user-post-dropdown' onClick={()=> setShowOptions(!showOptions)} style={{transform: 'scale(.95)', position: 'relative', top: 7}} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTMuNjE2di0zLjIzMmMtMS42NTEtLjU4Ny0yLjY5NC0uNzUyLTMuMjE5LTIuMDE5di0uMDAxYy0uNTI3LTEuMjcxLjEtMi4xMzQuODQ3LTMuNzA3bC0yLjI4NS0yLjI4NWMtMS41NjEuNzQyLTIuNDMzIDEuMzc1LTMuNzA3Ljg0N2gtLjAwMWMtMS4yNjktLjUyNi0xLjQzNS0xLjU3Ni0yLjAxOS0zLjIxOWgtMy4yMzJjLS41ODIgMS42MzUtLjc0OSAyLjY5Mi0yLjAxOSAzLjIxOWgtLjAwMWMtMS4yNzEuNTI4LTIuMTMyLS4wOTgtMy43MDctLjg0N2wtMi4yODUgMi4yODVjLjc0NSAxLjU2OCAxLjM3NSAyLjQzNC44NDcgMy43MDctLjUyNyAxLjI3MS0xLjU4NCAxLjQzOC0zLjIxOSAyLjAydjMuMjMyYzEuNjMyLjU4IDIuNjkyLjc0OSAzLjIxOSAyLjAxOS41MyAxLjI4Mi0uMTE0IDIuMTY2LS44NDcgMy43MDdsMi4yODUgMi4yODZjMS41NjItLjc0MyAyLjQzNC0xLjM3NSAzLjcwNy0uODQ3aC4wMDFjMS4yNy41MjYgMS40MzYgMS41NzkgMi4wMTkgMy4yMTloMy4yMzJjLjU4Mi0xLjYzNi43NS0yLjY5IDIuMDI3LTMuMjIyaC4wMDFjMS4yNjItLjUyNCAyLjEyLjEwMSAzLjY5OC44NTFsMi4yODUtMi4yODZjLS43NDQtMS41NjMtMS4zNzUtMi40MzMtLjg0OC0zLjcwNi41MjctMS4yNzEgMS41ODgtMS40NCAzLjIyMS0yLjAyMXptLTEyIDIuMzg0Yy0yLjIwOSAwLTQtMS43OTEtNC00czEuNzkxLTQgNC00IDQgMS43OTEgNCA0LTEuNzkxIDQtNCA0eiIvPjwvc3ZnPg==" />
                    {showOptions ? 
                    // translate(165%, 55%)
                    <PostDropdown translateContainer='translate(-73%, 20%)'  setShowEdit={setShowEdit} getPostData={getPostData} setShowOptions={setShowOptions} setShowGear={props.setShowGear} posts={props.post} setShowDelete={setShowDelete} />
                    :
                    null
                    }
                </div>
            </TitleGearContainer>
            <Location>{`${props.post.city}, ${props.post.country}`}</Location>
            {/* <Title>{props.post.previewDescription}</Title> */}
        </Container>
    )
}

const mapStateToProps = state => ({
    userPosts: state.app.userPosts,
})

export default connect(mapStateToProps)(UserPrivateProfilesPosts)