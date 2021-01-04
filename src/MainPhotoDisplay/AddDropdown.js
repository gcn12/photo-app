import React from 'react'
// import AddToCollection from '../FeaturedPost/AddToCollection'
import { ReactComponent as FilledBookmark } from '../Icons/FilledBookmark.svg'
import { db } from '../Firebase'
import { ReactComponent as EmptyBookmark } from '../Icons/EmptyBookmark.svg'
import { ReactComponent as Add } from '../Icons/Add.svg'
import { connect } from 'react-redux'
import {
    Container,
    Option,
    Options,
} from './AddDropdown.styles'

const AddDropdown = (props) => {

    const getCollectionsList = () => {
        const collectionsArray = []
        db.collection('users')
        .doc(props.user)
        .collection('collection-names')
        .orderBy('timestamp', 'desc')
        .get()
        .then(collections => {
            if(collections.docs.length>0) {
                collections.docs.forEach((collection, index)=> {
                    const mapArray = []
                    mapArray.push(collection.data().collection)
                    db.collection('users')
                    .doc(props.user)
                    .collection('collections')
                    .where('collection', '==', collection.data().collection)
                    .where('id', '==', props.id)
                    .get()
                    .then(data=> {
                        if(data) {
                            if(data.docs.length > 0){
                                mapArray.push(true)
                            }else{
                                mapArray.push(false)
                            }
                        }
                        collectionsArray.push(mapArray)
                        if (index+1 === collections.docs.length) {
                            props.setCollectionsList(collectionsArray)
                            // props.dispatch(collectionsList(collectionsArray))
                            props.setShowAddToCollection(true)
                        }
                    })
                })
            }else{
                props.setShowAddToCollection(true)
            }
        }) 
    }

    const bookmark = () => {
        const {views, hearts, ratio, ...data } = props.photoInfo
        db.collection('users')
        .doc(props.user)
        .collection('bookmarked')
        .add({
            ...data,
            timestamp: Date.now(),
        })
        .then(()=>props.setIsBookmarked(true))
        .catch(err =>console.log(err))
    }

    const unbookmark = () => {
        db.collection('users')
        .doc(props.user)
        .collection('bookmarked')
        .where('username', '==', props.photoInfo.username)
        .where('url', '==', props.photoInfo.url)
        .get()
        .then(data=> {
            data.docs[0].ref.delete()
            props.setIsBookmarked(false)
        })
    }


    return(
        <Container>
            {/* <AddToCollection /> */}
            <Options>
                {props.isBookmarked ? 
                <Option className='add-dropdown' onClick={unbookmark}>
                    <div style={{transform: 'scale(.9)'}}>
                        <FilledBookmark />
                    </div>
                    Remove from saved
                </Option>
                :
                <Option className='add-dropdown' onClick={bookmark}> 
                    <div style={{transform: 'scale(.9)'}}>
                        <EmptyBookmark />
                    </div>
                    Save for later
                </Option>
                }     
                <Option onClick={getCollectionsList}>
                    <div style={{transform: 'scale(.8)'}}>
                        <Add />
                    </div>
                    Add to collection
                </Option>
            </Options>
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
})

export default connect(mapStateToProps)(AddDropdown)