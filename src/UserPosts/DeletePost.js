import React from 'react'
import { db } from '../Firebase'
import { connect } from 'react-redux' 
import {
    Container,
    Text,
    DeleteButton,
    Cancel,
} from './DeletePost.styles'

const DeletePost = (props) => {
    
    const deleteCollection = () => {
        console.log(props)
        db.collection('preview-posts')
        .where('postID', '==', props.postID)
        .get()
        .then(item=> {
            item.docs[0].ref.delete()
        })
        db.collection('posts')
        .where('postID', '==', props.postID)
        .get()
        .then(item=> {
            item.docs[0].ref.delete()
        })
        db.collection('pending-tasks')
        .doc('delete-post')
        .collection('delete-post')
        .add({
            postID: props.postID,
            location: props.post.location,
            country: props.post.country,
            username: props.post.username,
            url: props.post.url,
            image: props.image,
            id: props.user,
        }).then(()=> {
            props.removePostFromPosts(props.index)
        })
        props.setShowDelete(false)
        props.closeDelete()
        // props.setShowGear(false)
    }

    const cancelDelete = () => {
        // props.setShowGear(false)
        props.closeDelete()
        props.setShowDelete(false)
    }

    return(
        <div className='rename-component-container'>
            <Container> 
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Text onClick={cancelDelete} style={{cursor: 'pointer'}} size='40px'>&times;</Text>
                </div>
                <div style={{margin: '0px 0 30px 0', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Text size='20px'>Delete post</Text>
                    &nbsp;
                    <Text size='20px' weight='700'>{props.title}</Text> 
                    &nbsp;
                    <Text>?</Text> 
                </div>
                <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Cancel onClick={cancelDelete}>Cancel</Cancel>
                    <DeleteButton onClick={deleteCollection}>Delete</DeleteButton>
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
})

export default connect(mapStateToProps)(DeletePost)