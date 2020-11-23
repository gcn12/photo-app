import React, { useState } from 'react'
import VerticalScroll from '../VeritcalScroll/VerticalScroll'
import { db } from '../Firebase'
import firebase from 'firebase'
import { 
    Container,
    Collection, 
    Warning,
    CreateNewButton,
    CreateNewInput,
    CreateNewSubmit,
} from './Dropdown.styles'

const DropdownItem = (props) => {

    const addToCollection = () => {
        const addRef = db.collection('users').doc(props.user).collection('collections')
        if(!props.bool) {
            addRef.where('image', '==', props.photoInformation.image)
            .where('collection', '==', props.collection)
            .get()
            .then(data=> {
                add()
                if(data.docs.length === 0) {
                    addRef.add({
                        ...props.photoInformation,
                        collection: props.collection,
                        timestamp: Date.now()
                    }).then(console.log('added to collection'))
                    updateCollectionPreview(true)
                }
            })
        }
    }

    const updateCollectionPreview = (updateTimestampBool) => {
        const updateObject = {
            preview: firebase.firestore.FieldValue.delete()
        }
        if (updateTimestampBool) {
            updateObject['timestamp'] = Date.now()
        }
        const updateRef = db.collection('users').doc(props.user)
        updateRef.collection('collection-names')
        .doc(props.collection)
        .update(updateObject)
        .then(
            updateRef.collection('collections')
            .where('collection', '==', props.collection)
            .orderBy('timestamp', 'desc') 
            .limit(4)
            .get()
            .then(data=> {
                const imageArray = []
                data.docs.forEach(image=> {
                    imageArray.push(image.data().image)
                })
                updateRef.collection('collection-names')
                .doc(props.collection)
                .set({
                    preview: imageArray
                }, {merge: true})
            })
        )

    }

    const removeFromCollection = () => {
        db.collection('users')
        .doc(props.user)
        .collection('collections')
        .where('image', '==', props.photoInformation.image)
        .where('collection', '==', props.collection)
        .get()
        .then(data => {
            remove()
            data.docs.forEach(item => {
                item.ref.delete()
            })
            updateCollectionPreview(false)
        })
    }

    const add = () => {
        addToCollection()
        const arrayCopy = props.collectionsList
        arrayCopy[props.index][1] = true
        props.setCollectionsList([...arrayCopy])

    }

    const remove = () => {
        const arrayCopy = props.collectionsList
        arrayCopy[props.index][1] = false
        props.setCollectionsList([...arrayCopy])
        removeFromCollection()
    }

    return(
        <Collection className='dropdown' onClick={null}>
            <div className='dropdown'>{props.collection}</div>
            {props.collectionsList.length > 0 ?
                (props.bool ?
                <div style={{cursor: 'pointer'}} className='dropdown' onClick={removeFromCollection}>Remove</div>
                :
                <div style={{cursor: 'pointer'}} className='dropdown' onClick={addToCollection}>Add</div> )
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
                }).then(console.log('added to collection'))
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
                name: collectionName,
                timestamp: Date.now(),
                preview: [props.photoInformation.image]
            },{merge: true})
            .then(addToCollection(collectionName))
            props.setCollectionsList([[collectionName, true], ...props.collectionsList])
            setIsCollectionExists(false)
            document.getElementById('collection-name').value=''
        }else{
            setIsCollectionExists(true)
        }
    }

    return(
        <Container>
            <VerticalScroll scrollHeight='120px' maxHeight='200px'>
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
                        collection2={collection}
                        key={index}
                        bool={collection[1]}
                    />
                )
            })}
            </VerticalScroll>
            {isCreateCollection ? 
            <div>
                <CreateNewInput autoComplete='off' placeholder='collection name' id='collection-name' className='dropdown'></CreateNewInput>
                <CreateNewSubmit onClick={createCollection} className='dropdown'>Enter</CreateNewSubmit>
            </div>
            :
            <CreateNewButton onClick={()=>setIsCreateCollection(true)} className='dropdown'>Create new collection</CreateNewButton>
        }
        {isCollectionExists ? <Warning>Collection already exists</Warning> : null}
        </Container>
    )
}

export default Dropdown







// import React, { useState } from 'react'
// import VerticalScroll from '../VeritcalScroll/VerticalScroll'
// import { db } from '../Firebase'
// import firebase from 'firebase'
// import { 
//     Container,
//     Collection, 
//     Warning,
// } from './Dropdown.styles'

// const DropdownItem = (props) => {

//     // const [isAdded, setIsAdded] = useState(props.collectionsBoolArray[props.index])
//     const [isAdded, setIsAdded] = useState(props.bool)

//     const addToCollection = () => {
//         const addRef = db.collection('users').doc(props.user).collection('collections')
//         if(!isAdded) {
//             addRef.where('image', '==', props.photoInformation.image)
//             .where('collection', '==', props.collection)
//             .get()
//             .then(data=> {
//                 if(data.docs.length === 0) {
//                     addRef.add({
//                         ...props.photoInformation,
//                         collection: props.collection,
//                         timestamp: Date.now()
//                     }).then(console.log('added to collection'))
//                     updateCollectionPreview(true)
//                 }
//             })

//         }
//     }

//     const updateCollectionPreview = (updateTimestampBool) => {
//         const updateObject = {
//             preview: firebase.firestore.FieldValue.delete()
//         }
//         if (updateTimestampBool) {
//             updateObject['timestamp'] = Date.now()
//         }
//         const updateRef = db.collection('users').doc(props.user)
//         updateRef.collection('collection-names')
//         .doc(props.collection)
//         .update(updateObject)
//         .then(
//             updateRef.collection('collections')
//             .where('collection', '==', props.collection)
//             .orderBy('timestamp', 'desc') 
//             .limit(4)
//             .get()
//             .then(data=> {
//                 const imageArray = []
//                 data.docs.forEach(image=> {
//                     imageArray.push(image.data().image)
//                 })
//                 updateRef.collection('collection-names')
//                 .doc(props.collection)
//                 .set({
//                     preview: imageArray
//                 }, {merge: true})
//             })
//         )

//     }

//     const removeFromCollection = () => {
//         db.collection('users')
//         .doc(props.user)
//         .collection('collections')
//         .where('image', '==', props.photoInformation.image)
//         .where('collection', '==', props.collection)
//         .get()
//         .then(data => {
//             data.docs.forEach(item => {
//                 item.ref.delete()
//             })
//             updateCollectionPreview(false)
//         })
//     }

//     const add = () => {
//         const arrayCopy = props.collectionsBoolArray
//         const reverseBool = !isAdded
//         arrayCopy[props.index] = reverseBool
//         props.setCollectionsBoolArray(arrayCopy)
//         setIsAdded(reverseBool)
//     }

//     const remove = () => {
//         const arrayCopy = props.collectionsBoolArray
//         const reverseBool = !isAdded
//         arrayCopy[props.index] = reverseBool
//         props.setCollectionsBoolArray(arrayCopy)
//         setIsAdded(reverseBool)
//         removeFromCollection()
//     }

//     return(
//         <Collection className='dropdown' onClick={addToCollection}>
//             <div className='dropdown'>{props.collection}</div>
//             {props.collectionsBoolArray.length > 0 ?
//                 (isAdded ?
//                 <div className='dropdown' onClick={remove}>Remove</div>
//                 :
//                 <div className='dropdown' onClick={add}>Add</div> )
//             :
//             null
//         }
//         </Collection>
//     )
// }

// const Dropdown = (props) => {

//     const [isCreateCollection, setIsCreateCollection] = useState(false)
//     const [isCollectionExists, setIsCollectionExists] = useState(false)

//     const addToCollection = (name) => {
//         const addRef = db.collection('users').doc(props.user).collection('collections')
//         addRef.where('image', '==', props.photoInformation.image)
//         .where('collection', '==', name)
//         .get()
//         .then(data=> {
//             if(data.docs.length === 0) {
//                 addRef.add({
//                     ...props.photoInformation,
//                     collection: name,
//                     timestamp: Date.now()
//                 }).then(console.log('added to collection:', props.collection))
//             }
//         })
//     }

//     const createCollection = () => {
//         const collectionName = document.getElementById('collection-name').value
//         if(!props.collectionsList.includes(collectionName)){
//             db.collection('users')
//             .doc(props.user)
//             .collection('collection-names')
//             .doc(collectionName)
//             .set({
//                 name: collectionName,
//                 timestamp: Date.now(),
//                 preview: [props.photoInformation.image]
//             },{merge: true})
//             .then(addToCollection(collectionName))
    
//             // props.setCollectionsBoolArray([ ...props.collectionsBoolArray, true])
//             props.setCollectionsBoolArray([true, ...props.collectionsBoolArray])
//             props.setCollectionsList([collectionName, ...props.collectionsList])
//             setIsCollectionExists(false)
//         }else{
//             setIsCollectionExists(true)
//         }
//     }

//     return(
//         <Container>
//             <VerticalScroll scrollHeight='120px' maxHeight='200px'>
//             {console.log(props?.collectionsBoolArray)}
//             {props.collectionsList?.map((collection, index) => {
//                 return(
//                     <DropdownItem 
//                         setCollectionsBoolArray={props.setCollectionsBoolArray} 
//                         collectionsBoolArray={props.collectionsBoolArray} 
//                         index={index} 
//                         className='dropdown' 
//                         user={props.user} 
//                         photoInformation={props.photoInformation} 
//                         collection={collection} 
//                         key={index}
//                         bool={props.collectionsBoolArray[index]}
//                     />
//                 )
//             })}
//             </VerticalScroll>
//             {isCreateCollection ? 
//             <div>
//                 <input placeholder='collection name' id='collection-name' className='dropdown'></input>
//                 <button onClick={createCollection} className='dropdown'>Enter</button>
//             </div>
//             :
//             <button onClick={()=>setIsCreateCollection(true)} className='dropdown'>Add to new collection</button>
//         }
//         {isCollectionExists ? <Warning>Collection already exists</Warning> : null}
//         </Container>
//     )
// }

// export default Dropdown