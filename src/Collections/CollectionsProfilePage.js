import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import CollectionPhotoGrid from './CollectionPhotoGrid'
import RenameCollectionModal from './RenameCollectionModal'
import DeleteCollectionModal from './DeleteCollectionModal'
import { connect } from 'react-redux'
import { PopupDarken } from '../Styles/PopupStyles.styles'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import { 
    Container,
} from './CollectionsProfilePage.styles'

const Collections = (props) => {

    const [collectionInfo, setCollectionInfo] = useState([])
    const [showRename, setShowRename] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [collectionName, setCollectionName] = useState('')
    const [collectionIndex, setCollectionIndex] = useState()

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

    const openDelete = () => {
        setShowDelete(true)
        disableBodyScroll()
    }

    const closeDelete = () => {
        setShowDelete(false)
        enableBodyScroll()
    }

    const openRename = () => {
        setShowRename(true)
        disableBodyScroll()
    }

    const closeRename = () => {
        setShowRename(false)
        enableBodyScroll()
    }

    useEffect(getCollections, [props.user])
 
    return(
        <div>
            { showRename ?
            <div>
                <PopupDarken onClick={closeRename} />
                <RenameCollectionModal closeRename={closeRename} showRename={showRename} getCollections={getCollections} collectionName={collectionName} setShowRename={setShowRename} />
            </div>
            : 
            null
            }
            {showDelete ? 
            <div>
                <PopupDarken onClick={closeDelete} />
                <DeleteCollectionModal closeDelete={closeDelete} collectionIndex={collectionIndex} setCollectionInfo={setCollectionInfo} collectionInfo={collectionInfo} collectionName={collectionName} setShowDelete={setShowDelete} />
            </div>
            :
            null
            }
            <Container>
                {collectionInfo?.map((collection, index)=> {
                    return(
                        <CollectionPhotoGrid 
                            openRename={openRename}
                            openDelete={openDelete}
                            setCollectionIndex={setCollectionIndex}
                            setShowDelete={setShowDelete}
                            setCollectionName={setCollectionName}
                            setShowRename={setShowRename}
                            history={props.history}
                            collectionInfo={collectionInfo}
                            setCollectionInfo={setCollectionInfo}
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