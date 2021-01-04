import React, { useState } from 'react'
import DropdownDelete from './DropdownDelete'
import { homePhotoInformation } from '../Redux/Actions/appActions'
import { db } from '../Firebase'
import { connect } from 'react-redux'
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
} from './Collections.styles'

const Collection = (props) => {

    const [isVisible, setIsVisible] = useState(false)

    const getPhotos = () => {
        console.log(props.collection[0])
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
            // props.history.push('/photo-app/posts')
            props.dispatch(collectionsData(imageArray))
            props.setIsCollectionDisplay(true)
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
        <ImageTitleContainer opacity={isVisible ? 1 : 0}>
            <ImagesContainer onClick={getPhotos}>
                {items > 0 ? 
                <div>
                    <Image onLoad={()=> setIsVisible(true)} margin={dimensionsMap[items].margin[1]} height={dimensionsMap[items].height[1]} width={dimensionsMap[items].width[1]} src={collection[1][0]} key='1' alt='placeholder' />
                    <Image margin={dimensionsMap[items].margin[2]} height={dimensionsMap[items].height[2]} width={dimensionsMap[items].width[2]} src={collection[1][1]} key='2' alt='placeholder' />
                    <Image margin={dimensionsMap[items].margin[3]} height={dimensionsMap[items].height[3]} width={dimensionsMap[items].width[3]} src={collection[1][2]} key='3' alt='placeholder' />
                    <Image margin={dimensionsMap[items].margin[4]} height={dimensionsMap[items].height[4]} width={dimensionsMap[items].width[4]} src={collection[1][3]} key='4' alt='placeholder' />
                </div>
                :
                <NoImage onLoad={()=> setIsVisible(true)}>Collection is empty</NoImage>
                }
            </ImagesContainer>
            <Header>
                <Title>{props.collection[0]}</Title>
                <Ellipsis onClick={()=>setIsDeleteMenu(!isDeleteMenu)}>
                    <div className='delete-collection'>&#8942;</div>
                    {isDeleteMenu ? 
                    <DropdownDelete setShowDelete={props.setShowDelete} setCollectionName={props.setCollectionName} setShowRename={props.setShowRename} collectionInfo={props.collectionInfo} index={props.index} setCollectionInfo={props.setCollectionInfo} collectionName={props.collection[0]}></DropdownDelete>
                    :
                    null
                    }
                </Ellipsis>
            </Header>
        </ImageTitleContainer>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
})

export default connect(mapStateToProps)(Collection)


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