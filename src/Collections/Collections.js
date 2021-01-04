import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import Collection from './Collection'
import Rename from './Rename'
import Delete from './Delete'
import CollectionsComponent from './CollectionsComponent'
import { connect } from 'react-redux'
import { 
    Container,
} from './Collections.styles'
import {
    CollectionName,
} from './CollectionsComponent.styles'

const Collections = (props) => {

    const [collectionInfo, setCollectionInfo] = useState([])
    const [showRename, setShowRename] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [collectionName, setCollectionName] = useState('')
    const [isCollectionDisplay, setIsCollectionDisplay] = useState(false)

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
                        valueArray.push([null])
                    }
                    collectionsArray.push(valueArray)
                })
                setCollectionInfo(collectionsArray)
            })
        }
    }

    useEffect(getCollections, [props.user])
 
    return(
        <div>
            {isCollectionDisplay ? 
            <div>
                <CollectionName>{props?.collectionsData[0].collection}</CollectionName>
                {props?.collectionsData.map((collection, index)=> {
                    return(
                        <CollectionsComponent collection={collection} key={index} />
                    )
                })}
            </div>
            :
            <div>
                { showRename ?
                <Rename showRename={showRename} getCollections={getCollections} collectionName={collectionName} setShowRename={setShowRename}></Rename>
                : 
                null
                }
                {showDelete ? 
                <Delete setCollectionInfo={setCollectionInfo} collectionInfo={collectionInfo} collectionName={collectionName} setShowDelete={setShowDelete} />
                :
                null
                }
                <Container>
                    {collectionInfo?.map((collection, index)=> {
                        return(
                            <Collection 
                                setIsCollectionDisplay={setIsCollectionDisplay}
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
            }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    collectionsData: state.collections.collectionsData
})

export default connect(mapStateToProps)(Collections)