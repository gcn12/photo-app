import React from 'react'
import { db } from '../Firebase'
import {
    Container
} from './DropdownDelete.styles'

const DropdownDelete = (props) => {

    const deleteCollection = () => {
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
        })
        const collectionInfo = props.collectionInfo
        collectionInfo.splice(props.index, 1)
        props.setCollectionInfo([...collectionInfo])
    }

    return(
        <Container onClick={deleteCollection}>
            Delete
        </Container>
    )
}

export default DropdownDelete