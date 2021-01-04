import React, { useState } from 'react'
import { connect } from 'react-redux'
import AddToCollectionItem from './AddToCollectionItem'
import { db } from '../Firebase'
import {
    Container,
    X,
    Text,
    CollectionsContainer,
    // Container,
    Warning,
    CreateNewButton,
    CreateNewInput,
    CreateNewSubmit,
} from './AddToCollection.styles'

const AddToCollection = (props) => {

    const [isCreateCollection, setIsCreateCollection] = useState(false)
    const [isCollectionExists, setIsCollectionExists] = useState(false)

    const addToCollection = (name) => {
        const addRef = db.collection('users').doc(props.user).collection('collections')
        addRef.where('image', '==', props.photoInfo.image)
        .where('collection', '==', name)
        .get()
        .then(data=> {
            if(data.docs.length === 0) {
                addRef.add({
                    ...props.photoInfo,
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
                preview: [props.photoInfo.image]
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
        <Container>
            <X onClick={()=>props.setIsAddToCollection(false)} style={{cursor: 'pointer'}} size='60px'>&times;</X>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Text size='30px'>Add to collection</Text>
            </div>
            <CollectionsContainer>
                {props?.collectionsList?.map((collection, index) => {
                    return(
                        <AddToCollectionItem 
                            photoInformation={props.photoInfo}
                            setCollectionsList={props.setCollectionsList}
                            collectionsList={props.collectionsList}
                            index={index} 
                            className='dropdown' 
                            collection={collection[0]} 
                            key={index}
                            bool={collection[1]} 
                        />
                    )
                })}
            </CollectionsContainer>
            {/* <ButtonContainer>
                <RenameButton onClick={()=>props.setIsAddToCollection(false)}>Done</RenameButton>
            </ButtonContainer> */}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
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

const mapStateToProps = state => ({
    user: state.app.user,
    photoInformation: state.app.photoInformation,
    // collectionsList: state.featuredPost.collectionsList,
})

export default connect(mapStateToProps)(AddToCollection)