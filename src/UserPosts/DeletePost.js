import React from 'react'
import { db } from '../Firebase'
import {
    Container,
    Text,
    DeleteButton,
    Cancel,
} from './DeletePost.styles'

const DeletePost = (props) => {
    
    const deleteCollection = () => {
        db.collection('pending-delete-post')
        .add({
            username: props.username,
            url: props.url,
            image: props.image,
            id: props.user,
        }).then(()=> {
            props.removePostFromPosts(props.index)
        })
        props.setShowDelete(false)
        props.setShowGear(false)
    }

    const cancelDelete = () => {
        props.setShowGear(false)
        props.setShowDelete(false)
    }

    return(
        <div className='rename-component-container'>
            <Container> 
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Text onClick={cancelDelete} style={{cursor: 'pointer'}} size='40px'>&times;</Text>
                </div>
                <div style={{margin: '0px 0 30px 0', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    <Text size='20px'>Delete post {props.title} ?</Text>
                </div>
                <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Cancel onClick={cancelDelete}>Cancel</Cancel>
                    <DeleteButton onClick={()=>deleteCollection()}>Delete</DeleteButton>
                </div>
            </Container>
        </div>
    )
}

export default DeletePost