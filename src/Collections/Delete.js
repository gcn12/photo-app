import React from 'react'
import { db } from '../Firebase'
import { connect } from 'react-redux'
import {
    Container,
    Text,
    DeleteButton,
    Cancel,
} from './Delete.styles'

const Delete = (props) => {
    
    const deleteCollection = () => {
        props.setShowDelete(false)
        db.collection('users')
        .doc(props.user)
        .collection('collection-names')
        .where('collection', '==', props.collectionName)
        .get()
        .then(data=> {
            data.docs.forEach(item => {
                item.ref.delete()
            })
            console.log('collection deleted')
        })

        db.collection('users')
        .doc(props.user)
        .collection('collections')
        .where('collection', '==', props.collectionName)
        .get()
        .then(data=> {
            data.docs.forEach(item => {
                item.ref.delete()
            })
            const collectionInfo = [...props.collectionInfo]
            collectionInfo.splice(props.collectionIndex, 1)
            props.setCollectionInfo([...collectionInfo])
        })
    }

    return(
        <div className='rename-component-container'>
            <Container> 
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Text onClick={()=>props.setShowDelete(false)} style={{cursor: 'pointer'}} size='40px'>&times;</Text>
                </div>
                <div style={{margin: '0px 0 30px 0', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    <Text size='20px'>Delete collection {props.collectionName} ?</Text>
                </div>
                <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Cancel onClick={()=>props.setShowDelete(false)}>Cancel</Cancel>
                    <DeleteButton onClick={()=>deleteCollection(props.collectionName)}>Delete</DeleteButton>
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
})

export default connect(mapStateToProps)(Delete)