import React, { useState } from 'react'
import { 
    Container,
    Collection, 
    Warning,
} from './Dropdown.styles'
import { db } from '../Firebase'

const DropdownItem = (props) => {

    const [isAdded, setIsAdded] = useState(props.collectionsBoolArray[props.index])

    const addToCollection = () => {
        const addRef = db.collection('users').doc(props.user).collection('collections')
        if(!isAdded) {
            addRef.where('image', '==', props.photoInformation.image)
            .where('collection', '==', props.collection)
            .get()
            .then(data=> {
                if(data.docs.length === 0) {
                    addRef.add({
                        ...props.photoInformation,
                        collection: props.collection,
                        timestamp: Date.now()
                    }).then(console.log('added to collection'))
                }
            })

        }
    }

    const removeFromCollection = () => {
        db.collection('users')
        .doc(props.user)
        .collection('collections')
        .where('image', '==', props.photoInformation.image)
        .where('collection', '==', props.collection)
        .get()
        .then(data => {
            data.docs.forEach(item => {
                item.ref.delete()
            })
        })
    }

    const add = () => {
        const arrayCopy = props.collectionsBoolArray
        const reverseBool = !isAdded
        arrayCopy[props.index] = reverseBool
        props.setCollectionsBoolArray(arrayCopy)
        setIsAdded(reverseBool)
    }

    const remove = () => {
        const arrayCopy = props.collectionsBoolArray
        const reverseBool = !isAdded
        arrayCopy[props.index] = reverseBool
        props.setCollectionsBoolArray(arrayCopy)
        setIsAdded(reverseBool)
        removeFromCollection()
    }

    return(
        <Collection className='dropdown' onClick={addToCollection}>
            <div className='dropdown'>{props.collection}</div>
            {props.collectionsBoolArray.length > 0 ?
                (isAdded ?
                <div className='dropdown' onClick={remove}>Remove</div>
                :
                <div className='dropdown' onClick={add}>Add</div> )
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
                }).then(console.log('added to collection:', props.collection))
            }
        })
    }

    const createCollection = () => {
        const collectionName = document.getElementById('collection-name').value
        if(!props.collectionsList.includes(collectionName)){
            db.collection('users')
            .doc(props.user)
            .collection('collection-names')
            .add({
                name: collectionName,
                timestamp: Date.now()
            }).then(addToCollection(collectionName))
    
            props.setCollectionsBoolArray([...props.collectionsBoolArray, true])
            props.setCollectionsList([...props.collectionsList, collectionName])
            setIsCollectionExists(false)
        }else{
            setIsCollectionExists(true)
        }
    }

    return(
        <Container>
            {props.collectionsList?.map((collection, index) => {
                return(
                    <DropdownItem 
                        setCollectionsBoolArray={props.setCollectionsBoolArray} 
                        collectionsBoolArray={props.collectionsBoolArray} 
                        index={index} 
                        className='dropdown' 
                        user={props.user} 
                        photoInformation={props.photoInformation} 
                        collection={collection} 
                        key={index}
                    />
                )
            })}
            {isCreateCollection ? 
            <div>
                <input placeholder='collection name' id='collection-name' className='dropdown'></input>
                <button onClick={createCollection} className='dropdown'>Enter</button>
            </div>
            :
            <button onClick={()=>setIsCreateCollection(true)} className='dropdown'>Add to new collection</button>
        }
        {isCollectionExists ? <Warning>Collection already exists</Warning> : null}
        </Container>
    )
}

export default Dropdown

// const addToCollection = () => {
//     db.collection('users')
//     .doc(props.user)
//     .collection('collections')
//     .doc(props.collection)
//     .collection(props.collection)
//     .doc(props.photoInformation.id)
//     .set({
//         ...props.photoInformation,
//     }).then(null)
// }