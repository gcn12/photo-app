import React, { useState } from 'react'
import { connect } from 'react-redux'
import AddToCollectionItem from './AddToCollectionItem'
import CollectionItemsShimmer from './CollectionItemsShimmer'
// import SpinnerOnly from '../Spinner/SpinnerOnly'
import { disableBodyScroll } from 'body-scroll-lock'
import { db } from '../Firebase'
import {
    Container,
    X,
    Text,
    CollectionsContainer,
    Warning,
    CreateNewButton,
    CreateNewInput,
    CreateNewSubmit,
    CreateNewContainer,
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
            let collectionNameUrl = name.trim()
            collectionNameUrl = collectionNameUrl.split(' ')
            collectionNameUrl = collectionNameUrl.join('-')
            collectionNameUrl = collectionNameUrl.toLowerCase()
            if(data.docs.length === 0) {
                addRef.add({
                    collectionUrl: collectionNameUrl,
                    id: props.photoInfo.id,
                    image: props.photoInfo.image,
                    smallImage: props.photoInfo.smallImage,
                    country: props.photoInfo.country,
                    // city: props.photoInfo.city,
                    location: props.photoInfo.location,
                    title: props.photoInfo.title,
                    url: props.photoInfo.url,
                    username: props.photoInfo.username,
                    collection: name,
                    timestamp: Date.now()
                })
            }
        })
    }

    const createCollection = () => {
        const collectionName = document.getElementById('collection-name').value
        let isCollectionExists = false
        for (let collection of props.collectionsList){
            if (collection[0]===collectionName) {
                isCollectionExists = true
                break
            }
        }
        if(!isCollectionExists && collectionName.length>0){
            let collectionNameUrl = collectionName.trim()
            collectionNameUrl = collectionNameUrl.split(' ')
            collectionNameUrl = collectionNameUrl.join('-')
            collectionNameUrl = collectionNameUrl.toLowerCase()
            db.collection('users')
            .doc(props.user)
            .collection('collection-names')
            .doc(collectionName)
            .set({
                collectionUrl: collectionNameUrl,
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

    const lockScroll = () => {
        const toNotLock = document.getElementById('add-to-collection-container')
        disableBodyScroll(toNotLock)
    }

    return(
        <div>
            <Container>
                <X onClick={props.closeAddToCollection} style={{cursor: 'pointer'}} size='60px'>&times;</X>
                <div style={{marginBottom: '15px', display: 'flex', justifyContent: 'center'}}>
                    <Text size='30px'>Add to collection</Text>
                </div>
                {props.showSpinner ? 
                <CollectionsContainer>
                    {[1, 1, 1, 1].map((item, index) => {
                        return(
                            <CollectionItemsShimmer key={index}/>
                        )
                    })}
                </CollectionsContainer>
                :
                <CollectionsContainer id='add-to-collection-container'>
                    <img src='' alt='' onError={lockScroll} />
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
                }
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <CreateNewContainer>
                        {isCreateCollection ? 
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <CreateNewInput autoComplete='off' placeholder='collection name' id='collection-name' className='dropdown'></CreateNewInput>
                            <CreateNewSubmit onClick={createCollection} className='dropdown'>Create</CreateNewSubmit>
                        </div>
                        :
                        <CreateNewButton onClick={()=>setIsCreateCollection(true)} className='dropdown'>Create new collection</CreateNewButton>
                        }
                    </CreateNewContainer>
                    {isCollectionExists ? <Warning>Collection already exists</Warning> : null}
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    photoInformation: state.app.photoInformation,
    // collectionsList: state.featuredPost.collectionsList,
})

export default connect(mapStateToProps)(AddToCollection)