import React, { useState } from 'react'
import VerticalScroll from '../VeritcalScroll/VerticalScroll'
import { collectionsList } from '../Redux/Actions/featuredPostActions'
import { db } from '../Firebase'
import { connect } from 'react-redux'
import DropdownItem from './DropdownItem'
// import firebase from 'firebase'
import { 
    Container,
    Warning,
    CreateNewButton,
    CreateNewInput,
    CreateNewSubmit,
} from './Dropdown.styles'

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
                props.dispatch(collectionsList([[collectionName, true], ...props.collectionsList]))
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
                        index={index} 
                        className='dropdown' 
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

const mapStateToProps = state => ({
    user: state.app.user,
    photoInformation: state.app.photoInformation,
    collectionsList: state.featuredPost.collectionsList,
})

export default connect(mapStateToProps)(Dropdown)