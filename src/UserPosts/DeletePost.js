import React from 'react'
import { db } from '../Firebase'
import { connect } from 'react-redux' 
import {
    Container,
    DeleteButton,
    Cancel,
    TextSpan,
    TextContainer,
    Message,
} from './DeletePost.styles'
import { Text } from '../Styles/GlobalStyles.styles'

const DeletePost = (props) => {
    
    const deletePost = () => {
        db.collection('preview-posts')
        .where('postID', '==', props.post.postID)
        .get()
        .then(item=> {
            item.docs[0].ref.delete()
        })
        db.collection('posts')
        .where('postID', '==', props.post.postID)
        .get()
        .then(item=> {
            item.docs[0].ref.delete()
        })
        db.collection('pending-tasks')
        .doc('delete-post')
        .collection('delete-post')
        .add({
            smallImage: props.post.smallImage,
            userID: props.userInformation.id,
            postID: props.post.postID,
            location: props.post.location,
            country: props.post.country,
            username: props.post.username,
            image: props.post.image,
            id: props.post.id
        }).then(()=> {
            props.removePostFromPostsOnDelete(props.index)
        })
        props.setShowDelete(false)
        props.closeDelete()
    }

    const cancelDelete = () => {
        props.closeDelete()
        props.setShowDelete(false)
    }

    return(
        <div className='rename-component-container'>
            <Container> 
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Text onClick={cancelDelete} style={{cursor: 'pointer'}} size='36px'>&times;</Text>
                </div>
                <TextContainer>
                    <Message>Delete post <TextSpan>{props.post.title}</TextSpan> ?</Message>
                </TextContainer>
                <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Cancel onClick={cancelDelete}>Cancel</Cancel>
                    <DeleteButton onClick={deletePost}>Delete</DeleteButton>
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    userInformation: state.app.userInformation
})

export default connect(mapStateToProps)(DeletePost)