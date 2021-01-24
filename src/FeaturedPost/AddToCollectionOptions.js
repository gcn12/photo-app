import React from 'react'
import { db } from '../Firebase'
import { connect } from 'react-redux'
import { 
    Collection, 
    CollectionName,
    RemoveAdd,
} from '../Dropdown/Dropdown.styles'

const AddToCollectionOptions = (props) => {

    const addToCollection = () => {
        const addRef = db.collection('users').doc(props.user).collection('collections')
        if(!props.bool) {
            let collectionNameUrl = props.collection.trim()
            collectionNameUrl = collectionNameUrl.split(' ')
            collectionNameUrl = collectionNameUrl.join('-')
            collectionNameUrl = collectionNameUrl.toLowerCase()
            addRef.where('image', '==', props.photoInformation.image)
            .where('collection', '==', props.collection)
            .get()
            .then(data=> {
                if(data.docs.length === 0) {
                    addRef.add({
                        postID: props.photoInformation.postID,
                        collectionUrl: collectionNameUrl,
                        id: props.photoInformation.id,
                        image: props.photoInformation.image,
                        smallImage: props.photoInformation.smallImage,
                        country: props.photoInformation.country,
                        location: props.photoInformation.location,
                        title: props.photoInformation.title,
                        username: props.photoInformation.username,
                        collection: props.collection,
                        timestamp: Date.now()
                    }).then(()=> {
                        updateCollectionPreview(true)
                    })
                }
            })
        }
    }

    const updateCollectionPreview = (updateTimestampBool) => {
        const updateRef = db.collection('users').doc(props.user)
        updateRef.collection('collections')
        .where('collection', '==', props.collection)
        .orderBy('timestamp', 'desc') 
        .limit(4)
        .get()
        .then(data=> {
            const imageArray = []
            data.docs.forEach(image=> {
                imageArray.push(image.data().smallImage)
            })
            const updateObject = {}
            if (updateTimestampBool) {
                updateObject['timestamp'] = Date.now()
            }
            updateObject['preview'] = imageArray
            updateRef.collection('collection-names')
            .doc(props.collection)
            .set(updateObject, {merge: true})
            if (updateTimestampBool) {
                add()
            }else{
                remove()
            }
        })
    }

    const removeFromCollection = () => {
        db.collection('users')
        .doc(props.user)
        .collection('collections')
        .where('image', '==', props.photoInformation.image)
        .where('collection', '==', props.collection)
        .get()
        .then(data => {
            data.docs[0].ref.delete()
            .then(()=> {
                remove()
            })
        })
    }

    const add = () => {
        const arrayCopy = props.collectionsList
        arrayCopy[props.index][1] = true
        props.setCollectionsList([...arrayCopy])

    }

    const remove = () => {
        const arrayCopy = props.collectionsList
        arrayCopy[props.index][1] = false
        props.setCollectionsList([...arrayCopy])
    }

    return(
        <Collection className='dropdown' onClick={null}>
            <CollectionName className='dropdown'>{props.collection}</CollectionName>
            {props.collectionsList.length > 0 ?
                (props.bool ?
                <RemoveAdd style={{cursor: 'pointer'}} className='dropdown' onClick={removeFromCollection}>Remove</RemoveAdd>
                :
                <RemoveAdd style={{cursor: 'pointer'}} className='dropdown' onClick={addToCollection}>Add</RemoveAdd> )
            :
            null
        }
        </Collection>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
})

export default connect(mapStateToProps)(AddToCollectionOptions)