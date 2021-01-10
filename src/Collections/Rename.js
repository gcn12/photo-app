import React from 'react'
import { db } from '../Firebase'
import { connect } from 'react-redux'
import {
    Container,
    CollectionName,
    Text,
    RenameButton,
    Cancel,
} from './Rename.styles'

const Rename = (props) => {
    const submitRename = (collectionName) => {
        const collectionRename = document.getElementById('new-collection-name').value
        if(collectionRename.length > 0) {
            let collectionNameUrl = collectionRename.trim()
            collectionNameUrl = collectionNameUrl.split(' ')
            collectionNameUrl = collectionNameUrl.join('-')
            collectionNameUrl = collectionNameUrl.toLowerCase()
            const collectionRef = db.collection('users').doc(props.user)
            collectionRef.collection('collections').where('collection', '==', collectionName)
            .get()
            .then(data=> {
                data.forEach(item=> {
                    collectionRef.collection('collections').doc(item.id).update({collection: collectionRename})
                })
                collectionRef.collection('collection-names').doc(collectionName)
                .get()
                .then(data=> {
                    collectionRef.collection('collection-names').doc(collectionName).delete()
                    const oldCollectionData = data.data()
                    oldCollectionData['collection'] = collectionRename
                    oldCollectionData['collectionUrl'] = collectionNameUrl
                    collectionRef.collection('collection-names').doc(collectionRename)
                    .set(oldCollectionData)
                    .then(()=>{
                        console.log('Collection name updated')
                        props.setShowRename(false)
                        props.getCollections(props.user)
                    })
                })
            })
        }
    }

    return(
        <div className='rename-component-container'>
            <Container> 
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Text size='20px'>Rename collection</Text>
                        &nbsp;
                        <Text size='20px' weight='700'>{props.collectionName}</Text> 
                        &nbsp;
                        <Text>?</Text> 
                    </div>
                    <Text onClick={props.closeRename} style={{cursor: 'pointer'}} size='40px'>&times;</Text>
                </div>
                <CollectionName autoComplete='off' id='new-collection-name'></CollectionName>
                <div style={{display:'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Cancel onClick={props.closeRename}>Cancel</Cancel>
                    <RenameButton onClick={()=>submitRename(props.collectionName)}>Rename</RenameButton>
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
})

export default connect(mapStateToProps)(Rename)