import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import CollectionPhotoGrid from './CollectionPhotoGrid'
import { connect } from 'react-redux'
import { 
    Container,
} from './CollectionsProfilePage.styles'

const Collections = (props) => {

    const [collectionInfo, setCollectionInfo] = useState([])

    const getCollections = () => {
        if(props.user) {    
            const collectionsArray = []
            db.collection('users')
            .doc(props.user)
            .collection('collection-names')
            .orderBy('timestamp', 'desc')
            .get()
            .then(collections=> {
                collections.docs.forEach(collection => {
                    const valueArray = []
                    const collectionObject = collection.data()
                    valueArray.push(collectionObject.collection)
                    if(collectionObject?.preview?.length>0) {
                        valueArray.push(collectionObject.preview)
                    }else{
                        valueArray.push([])
                    }
                    valueArray.push(collectionObject.collectionUrl)
                    collectionsArray.push(valueArray)
                })
                setCollectionInfo(collectionsArray)
            })
        }
    }

    useEffect(getCollections, [props.user])
 
    return(
        <div>
            <Container>
                {collectionInfo?.map((collection, index)=> {
                    return(
                        <CollectionPhotoGrid 
                            collectionInfo={collectionInfo}
                            setCollectionInfo={setCollectionInfo}
                            getCollections={getCollections}
                            history={props.history}
                            index={index}
                            collection={collection} 
                            key={index}
                        />
                    )
                })}
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    collectionsData: state.collections.collectionsData
})

export default connect(mapStateToProps)(Collections)