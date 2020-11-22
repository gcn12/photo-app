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
        .where('name', '==', props.collectionName)
        .get()
        .then(data=> {
            data.docs.forEach(item => {
                item.ref.delete()
            })
            console.log('collection deleted')
        })
    }

    return(
        <Container onClick={deleteCollection}>
            Delete
        </Container>
    )
}

export default DropdownDelete