import React, { useState } from 'react'
import VerticalScroll from '../VeritcalScroll/VerticalScroll'
import { db } from '../Firebase'
// import firebase from 'firebase'
import { 
    Container,
    Collection, 
    Warning,
    CreateNewButton,
    CreateNewInput,
    CreateNewSubmit,
    CollectionName,
    RemoveAdd,
} from './Dropdown.styles'

const DropdownItem = (props) => {

    const addToCollection = () => {
        const addRef = db.collection('users').doc(props.user).collection('collections')
        if(!props.bool) {
            addRef.where('image', '==', props.photoInformation.image)
            .where('collection', '==', props.collection)
            .get()
            .then(data=> {
                if(data.docs.length === 0) {
                    addRef.add({
                        id: props.photoInformation.id,
                        image: props.photoInformation.image,
                        smallImage: props.photoInformation.smallImage,
                        country: props.photoInformation.country,
                        city: props.photoInformation.city,
                        title: props.photoInformation.title,
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
        // const updateObject = {
            // preview: firebase.firestore.FieldValue.delete()
        // }
        // if (updateTimestampBool) {
        //     updateObject['timestamp'] = Date.now()
        // }
        const updateRef = db.collection('users').doc(props.user)
        // updateRef.collection('collection-names')
        // .doc(props.collection)
        // .update(updateObject)
        // .then(()=>{
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
        // })
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
                // updateCollectionPreview(false)
                remove()
            })
        })
    }

    const add = () => {
        // addToCollection()
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

const Dropdown = (props) => {

    const [isCreateCollection, setIsCreateCollection] = useState(false)
    const [isCollectionExists, setIsCollectionExists] = useState(false)

    const addToCollection = (name) => {
        const addRef = db.collection('users').doc(props.user).collection('collections')
        addRef.where('image', '==', props.photoInformation.image)
        .where('collection', '==', name)
        .get()
        .then(data=> {
            if(data.docs.length === 0) {
                addRef.add({
                    ...props.photoInformation,
                    collection: name,
                    timestamp: Date.now()
                })
            }
        })
    }

    const createCollection = () => {
        const collectionName = document.getElementById('collection-name').value
        if(!props.collectionsList.includes(collectionName) && collectionName.length>0){
            db.collection('users')
            .doc(props.user)
            .collection('collection-names')
            .doc(collectionName)
            .set({
                collection: collectionName,
                timestamp: Date.now(),
                preview: [props.photoInformation.image]
            },{merge: true})
            .then(()=>{
                addToCollection(collectionName)
                props.setCollectionsList([[collectionName, true], ...props.collectionsList])
                setIsCollectionExists(false)
                document.getElementById('collection-name').value=''
            })
        }else{
            setIsCollectionExists(true)
        }
    } 

    return(
        <Container className='dropdown'>
            <VerticalScroll className='dropdown' scrollHeight='120px' maxHeight='200px'>
            {props.collectionsList?.map((collection, index) => {
                return(
                    <DropdownItem 
                        setCollectionsList={props.setCollectionsList}
                        collectionsList={props.collectionsList}
                        setCollectionsBoolArray={props.setCollectionsBoolArray} 
                        collectionsBoolArray={props.collectionsBoolArray} 
                        index={index} 
                        className='dropdown' 
                        user={props.user} 
                        photoInformation={props.photoInformation} 
                        collection={collection[0]} 
                        key={index}
                        bool={collection[1]}
                    />
                )
            })}
            </VerticalScroll>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {isCreateCollection ? 
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <CreateNewInput autoComplete='off' placeholder='collection name' id='collection-name' className='dropdown'></CreateNewInput>
                    <CreateNewSubmit onClick={createCollection} className='dropdown'>Create</CreateNewSubmit>
                </div>
                :
                <CreateNewButton onClick={()=>setIsCreateCollection(true)} className='dropdown'>Create new collection</CreateNewButton>
                }
            </div>
        {isCollectionExists ? <Warning>Collection already exists</Warning> : null}
        </Container>
    )
}

export default Dropdown