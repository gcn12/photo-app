import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import DropdownDelete from './DropdownDelete'
import Rename from './Rename'
import Delete from './Delete'
import { 
    Title
} from '../UserPosts/UserPosts.styles'
import { 
    Image,
    ImagesContainer,
    Container,
    NoImage,
    Header,
    Ellipsis,
    ImageTitleContainer,
} from './Collections.styles'

const Collection = (props) => {

    const getPhotos = () => {
        db.collection('users')
        .doc(props.user)
        .collection('collections')
        .where('collection', '==', props.collection[0])
        .get()
        .then(data=> {
            const imageArray = []
            data.docs.forEach(doc=> {
                imageArray.push(doc.data())
            })
            props.setHomePhotoInformation(imageArray)
            props.history.push('/photo-app/posts')
        })
    }

    const [isDeleteMenu, setIsDeleteMenu] = useState(false)

    window.onclick = (e) => {
        if (!e.target.matches('.delete-collection')) {
            setIsDeleteMenu(false)
        }
    } 

    let items = props.collection[1].length
    if(props.collection[1][0] !== null) {
        items = props.collection[1].length
    }else{
        items = 0
    }
    
    const { collection } = props
    
    return(
        <ImageTitleContainer>
            <ImagesContainer onClick={getPhotos}>
                {items > 0 ? 
                <div>
                    <Image margin={dimensionsMap[items].margin[1]} height={dimensionsMap[items].height[1]} width={dimensionsMap[items].width[1]} src={collection[1][0]} key='1' alt='placeholder' />
                    <Image margin={dimensionsMap[items].margin[2]} height={dimensionsMap[items].height[2]} width={dimensionsMap[items].width[2]} src={collection[1][1]} key='2' alt='placeholder' />
                    <Image margin={dimensionsMap[items].margin[3]} height={dimensionsMap[items].height[3]} width={dimensionsMap[items].width[3]} src={collection[1][2]} key='3' alt='placeholder' />
                    <Image margin={dimensionsMap[items].margin[4]} height={dimensionsMap[items].height[4]} width={dimensionsMap[items].width[4]} src={collection[1][3]} key='4' alt='placeholder' />
                </div>
                :
                <NoImage>Collection is empty</NoImage>
                }
            </ImagesContainer>
            <Header>
                <Title>{props.collection[0]}</Title>
                <Ellipsis onClick={()=>setIsDeleteMenu(!isDeleteMenu)}>
                    <div className='delete-collection'>&#8942;</div>
                    {isDeleteMenu ? 
                    <DropdownDelete setShowDelete={props.setShowDelete} setCollectionName={props.setCollectionName} setShowRename={props.setShowRename} collectionInfo={props.collectionInfo} index={props.index} setCollectionInfo={props.setCollectionInfo} user={props.user} collectionName={props.collection[0]}></DropdownDelete>
                    :
                    null
                    }
                </Ellipsis>
            </Header>
        </ImageTitleContainer>
    )
}

const Collections = (props) => {

    const [collectionInfo, setCollectionInfo] = useState([])
    const [showRename, setShowRename] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [collectionName, setCollectionName] = useState('')

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
            { showRename ?
            <Rename showRename={showRename} getCollections={getCollections} user={props.user} collectionName={collectionName} setShowRename={setShowRename}></Rename>
            : 
            null
            }
            {showDelete ? 
            <Delete collectionName={collectionName} setShowDelete={setShowDelete} />
            :
            null
            }
            <Container>
                {collectionInfo?.map((collection, index)=> {
                    return(
                        <Collection 
                            setShowDelete={setShowDelete}
                            setCollectionName={setCollectionName}
                            setShowRename={setShowRename}
                            history={props.history}
                            collectionInfo={collectionInfo}
                            setCollectionInfo={setCollectionInfo}
                            index={index}
                            user={props.user} 
                            setHomePhotoInformation={props.setHomePhotoInformation} 
                            collection={collection} 
                            key={index}
                        />
                    )
                })}
            </Container>
        </div>
    )
}

const large = 272
const small = 134

const dimensionsMap = {
    1: {
        height: {
            1: large,
        },
        width: {
            1: large
        },
        margin: {
            1: '0 0 0 0'
        }
    },
    2: {
        height: {
            1: small,
            2: small,
        },
        width: {
            1: large,
            2: large
        }, 
        margin: {
            1: '0 0 1px 0',
            2: '1px 0 0 0'
        }
    },
    3: {
        height: {
            1: small,
            2: small,
            3: small
        },
        width: {
            1: small,
            2: small,
            3: large
        },
        margin: {
            1: '0 1px 1px 0',
            2: '0 0 1px 1px',
            3: '1px 0 0 0'
        }
    },
    4: {
        height: {
            1: small,
            2: small,
            3: small,
            4: small
        },
        width: {
            1: small,
            2: small,
            3: small,
            4: small,
        },
        margin: {
            1: '0 1px 1px 0',
            2: '0 0 1px 1px',
            3: '1px 1px 0 0',
            4: '1px 0 0 1px'
        }
    },
}

export default Collections