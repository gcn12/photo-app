import React, { useState } from 'react'
import CollectionsDropdown from './CollectionsDropdown'
import { homePhotoInformation } from '../Redux/Actions/appActions'
import { db } from '../Firebase'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PopupDarken } from '../Styles/PopupStyles.styles'
import RenameCollectionModal from './RenameCollectionModal'
import DeleteCollectionModal from './DeleteCollectionModal'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import { collectionsData } from '../Redux/Actions/collectionsActions'
import { 
    Title
} from '../UserPosts/UserPosts.styles'
import { 
    Image,
    ImagesContainer,
    NoImage,
    Header,
    Ellipsis,
    ImageTitleContainer,
} from './CollectionsProfilePage.styles'

const CollectionPhotoGrid = (props) => {

    const [isVisible, setIsVisible] = useState(false)
    const [showRename, setShowRename] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

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
            props.dispatch(homePhotoInformation(imageArray))
            props.dispatch(collectionsData(imageArray))
        })
    }

    const [isDeleteMenu, setIsDeleteMenu] = useState(false)

    window.onclick = (e) => {
        if (!e.target.matches('.delete-collection')) {
            setIsDeleteMenu(false)
        }
    } 

    let items = props.collection[1].length
    if(props.collection[1] !== null) {
        items = props.collection[1].length
    }else{
        items = 0
    }

    const openDelete = () => {
        setShowDelete(true)
        disableBodyScroll(document.body)
    }

    const closeDelete = () => {
        setShowDelete(false)
        enableBodyScroll(document.body)
    }

    const openRename = () => {
        setShowRename(true)
        disableBodyScroll(document.body)
    }

    const closeRename = () => {
        setShowRename(false)
        enableBodyScroll(document.body)
    }
    
    const { collection } = props
    
    return(
        <ImageTitleContainer opacity={isVisible ? 1 : 0}>
            {props.collection[1].length > 0 ? 
            <Link to={`/photo-app/profile/collections/${collection[2]}`}>
                <ImagesContainer shadow='0 5px 15px 0px rgba(0, 0, 0, .6)' cursor='pointer' onClick={getPhotos}>
                    <div>
                        <Image onLoad={()=> setIsVisible(true)} margin={dimensionsMap[items].margin[1]} height={dimensionsMap[items].height[1]} width={dimensionsMap[items].width[1]} src={collection[1][0]} key='1' alt='placeholder' />
                        <Image margin={dimensionsMap[items].margin[2]} height={dimensionsMap[items].height[2]} width={dimensionsMap[items].width[2]} src={collection[1][1]} key='2' alt='placeholder' />
                        <Image margin={dimensionsMap[items].margin[3]} height={dimensionsMap[items].height[3]} width={dimensionsMap[items].width[3]} src={collection[1][2]} key='3' alt='placeholder' />
                        <Image margin={dimensionsMap[items].margin[4]} height={dimensionsMap[items].height[4]} width={dimensionsMap[items].width[4]} src={collection[1][3]} key='4' alt='placeholder' />
                    </div>
                </ImagesContainer>
            </Link>
            :
            <ImagesContainer shadow='0 5px 15px 0px rgba(0, 0, 0, .15)' cursor='default' onClick={getPhotos}>
                {!isVisible ? setIsVisible(true) : null}
                <NoImage >Collection is empty</NoImage>
            </ImagesContainer>
            }
            <Header>
                <Title>{props.collection[0]}</Title>
                <div style={{position: 'relative'}}>
                    <Ellipsis className='delete-collection' onClick={()=>setIsDeleteMenu(!isDeleteMenu)}>
                        <div style={{fontWeight: 800, fontSize: '22px'}} className='delete-collection'>&#8942;</div>
                    </Ellipsis>
                    {isDeleteMenu ? 
                    <CollectionsDropdown openDelete={openDelete} openRename={openRename} setShowDelete={props.setShowDelete} setShowRename={props.setShowRename} collectionInfo={props.collectionInfo} index={props.index} setCollectionInfo={props.setCollectionInfo} collectionName={props.collection[0]} />
                    :
                    null
                    }
                </div>
            </Header>
            { showRename ?
            <div>
                <PopupDarken onClick={closeRename} />
                <RenameCollectionModal closeRename={closeRename} showRename={showRename} getCollections={props.getCollections} collectionName={props.collection[0]} setShowRename={setShowRename} />
            </div>
            : 
            null
            }
            {showDelete ? 
            <div>
                <PopupDarken onClick={closeDelete} />
                <DeleteCollectionModal closeDelete={closeDelete} collectionIndex={props.index} setCollectionInfo={props.setCollectionInfo} collectionInfo={props.collectionInfo} collectionName={props.collection[0]} setShowDelete={setShowDelete} />
            </div>
            :
            null
            }
        </ImageTitleContainer>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
})

export default connect(mapStateToProps)(CollectionPhotoGrid)


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