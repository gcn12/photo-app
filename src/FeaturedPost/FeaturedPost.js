import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import { Link } from 'react-router-dom'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import { ReactComponent as EmptyHeart } from '../Icons/EmptyHeart.svg'
import { ReactComponent as FilledHeart } from '../Icons/FilledHeart.svg'
import { ReactComponent as Collections } from '../Icons/Collections.svg'
import { ReactComponent as EmptyBookmark } from '../Icons/EmptyBookmark.svg'
import { ReactComponent as FilledBookmark } from '../Icons/FilledBookmark.svg'
import { ReactComponent as Compass } from '../Icons/Compass.svg'
import firebase from 'firebase'
import { PopupDarken } from '../Styles/PopupStyles.styles'
import { connect } from 'react-redux'
import { photoInformation, userPosts, userData } from '../Redux/Actions/appActions'
import { isPostVisible, isVisible } from '../Redux/Actions/featuredPostActions'
import AddToCollection from './AddToCollection'
import EnlargeImage from './EnlargeImage'
import KeepReading from './KeepReading'
import { 
    incrementHeartCount, 
    decrementHeartCount,
    calculateLikeRatio,
} from '../Functions'
import moment from 'moment'
import {
    Title,
    Description,
    MainImage,
    Author,
    Container,
    InfoContainer,
    BodyContainer,
    BodyImageContainer,
    BodyImage,
    Header,
    Caption,
    PostFooterContainer,
    ButtonLabelContainer,
    ButtonLabel,
    UserBioContainer,
    ProfileImage,
    Bio,
    BioName,
    BioUsername,
    BioContainer,
    FeaturedPostContainer,
    PlaceholderImage,
    Text,
    CenterDate,
    ElementSpacings,
} from './FeaturedPost.styles'

const FeaturedPost = (props) => {

    const [showDropdown, setShowDropdown] = useState(null)
    const [isHeart, setIsHeart] = useState(false)
    const [isBookmark, setIsBookmark] = useState(false)
    const [isAddToCollection, setIsAddToCollection] = useState(false)
    const [showImageEnlarged, setShowImageEnlarged] = useState(false)
    const [imageToEnlarge, setImageToEnlarge] = useState('')
    const [collectionsList, setCollectionsList] = useState([])
    const [showSpinner, setShowSpinner] = useState(true)

    const bookmark = () => {
        const {views, hearts, ratio, dataObj, font, imagesLarge, imagesSmall, photoBodyMap, ...data } = props.photoInformation
        db.collection('users')
        .doc(props.user)
        .collection('bookmarked')
        .add({
            ...data,
            timestamp: Date.now(),
        })
        .then(()=>setIsBookmark(true))
        .catch(err =>console.log(err))
    }

    const unbookmark = () => {
        db.collection('users')
        .doc(props.user)
        .collection('bookmarked')
        .where('postID', '==', props.photoInformation.postID)
        // .where('url', '==', props.photoInformation.url)
        .get()
        .then(data=> {
            data.docs[0].ref.delete()
            setIsBookmark(false)
        })
    }

    useEffect(()=>{
        props.dispatch(photoInformation({}))
        if(props.user) {
            db.collection('users')
            .doc(props?.user)
            .collection('bookmarked')
            .where('postID', '==', props?.match?.params?.postID)
            .get()
            .then(data=> {
                if(data.docs[0]) {
                    setIsBookmark(true)
                }
                setShowDropdown(!showDropdown)
            })
        }
        getFeaturedPhotoInfo2(props?.match?.params?.postID)
        // eslint-disable-next-line
    },[])

    const getFeaturedPhotoInfo2 = (postID) => {
        window.scrollTo({top: 0})
        db.collection('posts')
        .where('postID', '==', postID)
        .get()
        .then(data=> {
            let post = data.docs[0].data()
            // getImageSize(post.smallestImage)
            props.dispatch(photoInformation(post))
            // window.scrollTo({top: 0})
            firebase.auth().onAuthStateChanged((user)=> {
                if(user) {
                db.collection('users')
                .doc(user.uid)
                .collection('hearts')
                .where('hearts', 'array-contains', post.id)
                .get()
                .then(data=> {
                    let arr = []
                    data.forEach(item=> {
                        arr.push(item.data())
                    })
                    setIsHeart(arr.length)
                })
            }
            })
        })
    }

    const getCollectionsList = () => {
        openAddToCollection()
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
                    .where('id', '==', props.photoInformation.id)
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
                            setCollectionsList(collectionsArray)
                            setShowSpinner(false)
                        }
                    })
                })
            }else{
                openAddToCollection()
            }
        }) 
    }

    

    const heartImage = () => {
        const {views, hearts, ratio, dataObj, font, imagesLarge, imagesSmall, photoBodyMap, ...data } = props.photoInformation
        db.collection('users')
        .doc(props.user)
        .collection('admired')
        .add({
            ...data,
            timestamp: Date.now(),
        })
        .then(()=>{
            db.collection('users')
            .doc(props.user)
            .collection('hearts')
            .doc('hearts')
            .set({
                hearts: firebase.firestore.FieldValue.arrayUnion(props.photoInformation.id)
            }, {merge: true})
            .then(()=> {
                setIsHeart(true)
                db.collection('preview-posts').where('id', '==', props.photoInformation.id)
                .get()
                .then(ref=> {
                    incrementHeartCount(ref.docs[0].ref.id)
                    calculateLikeRatio(ref.docs[0].ref.id)
                })
            })
        })
        .catch(err =>console.log(err))
        
    }

    const unheartImage = () => {
        db.collection('users')
        .doc(props.user)
        .collection('hearts')
        .doc('hearts')
        .set({
            hearts: firebase.firestore.FieldValue.arrayRemove(props.photoInformation.id)
        }, {merge: true}).then(()=> {
            setIsHeart(false)
            db.collection('preview-posts').where('id', '==', props.photoInformation.id)
            .get()
            .then(ref=> {
                decrementHeartCount(ref.docs[0].ref.id)
                calculateLikeRatio(ref.docs[0].ref.id)
            })
        })
    }

    window.onclick = (e) => {
        if (!e.target.matches('.dropdown')) {
            setShowDropdown(false)
        }
    }

    const enlarge = (imageURL) => {
        setImageToEnlarge(imageURL)
        setShowImageEnlarged(true)
    }

    const openCollections = () => {
        if(props.collectionsList?.length === 0) {
            getCollectionsList()
        }else{
            openAddToCollection()
        }
    }

    const pageLoaded = () => {
        props.dispatch(isPostVisible(true))
        window.scrollTo({top: 0})
    }

    const openImage = (imageURL) => {
        enlarge(imageURL)
        setShowImageEnlarged(true)
        disableBodyScroll(document.body)
    }

    const closeImage = () => {
        setShowImageEnlarged(false)
        enableBodyScroll(document.body)
    }

    const openAddToCollection = () => {
        setIsAddToCollection(true)
    }

    const closeAddToCollection = () => {
        setIsAddToCollection(false)
        const toNotLock = document.getElementById('add-to-collection-container')
        enableBodyScroll(toNotLock)
    }

    const clearDataOnProfileView = () => {
        props.dispatch(userData([]))
        props.dispatch(userPosts([]))
    }

    return(
        <FeaturedPostContainer 
        opacity={props.isPostVisible ? 1 : 0} 
        style={{marginTop: '85px'}}>
            {showImageEnlarged ? 
            <div>
                <PopupDarken onClick={closeImage} />
                <EnlargeImage closeImage={closeImage} setShowImageEnlarged={setShowImageEnlarged} image={imageToEnlarge} />
            </div>
            :
            null
            }
            {isAddToCollection ? 
            <div>
                <PopupDarken onClick={closeAddToCollection} />
                <AddToCollection showSpinner={showSpinner} closeAddToCollection={closeAddToCollection} photoInfo={props.photoInformation} setCollectionsList={setCollectionsList} collectionsList={collectionsList} setIsAddToCollection={setIsAddToCollection} />
            </div>
            :
            null
            }
            <Container>
                <div>
                    <div style={{width: '90vw', maxHeight: '90vh', display: `${props.isVisible ? 'none' : 'block'}`}}>
                        <PlaceholderImage 
                        onLoad={pageLoaded} 
                        id='featured-post-placeholder-image' 
                        display={props.isVisible ? 'none' : 'block'} alt='' 
                        src={props?.photoInformation?.smallestImage} 
                        />
                    </div>
                    <MainImage 
                        display={props.isVisible ? 'block' : 'none'}
                        onLoad={()=>props.dispatch(isVisible(true))}
                        alt='' src={props?.photoInformation?.image}>
                    </MainImage>
                </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Title font={props?.photoInformation?.font}>{props?.photoInformation?.title}</Title>
                    </div>
                    <InfoContainer justify='center'>
                        <Compass style={{transform: 'scale(0.8)', marginRight: '4px'}} />
                        <Author font={props?.photoInformation?.font}>{props?.photoInformation?.location}</Author>
                    </InfoContainer>
            </Container>
            {props?.photoInformation?.dataObj ? 
            Object.keys(props?.photoInformation?.dataObj)?.map((item, index) => {
                return(
                    <BodyContainer key={index}>
                        {Object.values(props?.photoInformation?.dataObj)[item][0]==='caption' && Object.values(props?.photoInformation?.dataObj)[item][1].length>0 ? 
                        <div>
                            <Caption font={props.photoInformation.font}>{Object.values(props?.photoInformation?.dataObj)[item][1]}</Caption>
                            {Object.values(props?.photoInformation?.dataObj)[index+1] &&
                            <PostSpacings element={Object.values(props?.photoInformation?.dataObj)[index+1][0]} imagesSpacing='32px' captionSpacing='00px' headerSpacing='32px' paragraphSpacing='32px'  />
                            }
                        </div>
                        :
                        null
                        }
                        {Object.values(props?.photoInformation?.dataObj)[item][0]==='paragraph' && Object.values(props?.photoInformation?.dataObj)[item][1].length>0 ? 
                        <div>
                            <Description font={props.photoInformation.font}>{Object.values(props?.photoInformation?.dataObj)[item][1]}</Description>
                            {Object.values(props?.photoInformation?.dataObj)[index+1]
                            ?
                            <PostSpacings element={Object.values(props?.photoInformation?.dataObj)[index+1][0]} imagesSpacing='32px' captionSpacing='00px' headerSpacing='32px' paragraphSpacing='16px'  />
                            :
                            null
                            }
                        </div>
                        :
                        null
                        }
                        {Object.values(props?.photoInformation?.dataObj)[item][0]==='header' && Object.values(props?.photoInformation?.dataObj)[item][1].length>0 ? 
                        <div>
                            <Header font={props.photoInformation.font}>{Object.values(props?.photoInformation?.dataObj)[item][1]}</Header>
                            {Object.values(props?.photoInformation?.dataObj)[index+1]
                            ?
                            <PostSpacings element={Object.values(props?.photoInformation?.dataObj)[index+1][0]} imagesSpacing='0px' captionSpacing='00px' headerSpacing='0px' paragraphSpacing='8px'  />
                            :
                            null
                            }
                        </div>
                        :
                        null
                        }
                        {Object.values(props?.photoInformation?.dataObj)[item][0]==='images' ? 
                        <BodyImageContainer>
                            {props?.photoInformation?.imagesSmall[item]?.map((image, i)=> {
                                return(
                                    <div key={i}>
                                        {props.photoInformation.photoBodyMap[item].length === 1 ? 
                                        <BodyImage 
                                        onClick={()=>openImage(props?.photoInformation?.imagesLarge[item][i])}
                                        imageQuantity={props?.photoInformation?.photoBodyMap[item].length} 
                                        margin={props?.photoInformation?.photoBodyMap[item].length > 1 ? '0 4px' : '0%'} 
                                        imageSize={`${65 * props?.photoInformation?.photoBodyMap[item][i]}vw`} 
                                        width={props?.photoInformation?.photoBodyMap[item][i]} 
                                        imageGap='0px'
                                        src={image} key={i} 
                                        />

                                        :
                                        null}
    
                                        {props.photoInformation.photoBodyMap[item].length === 2 ? 
                                        <div>
                                            <BodyImage 
                                            onClick={()=>openImage(props?.photoInformation?.imagesLarge[item][i])}
                                            imageQuantity={props?.photoInformation?.photoBodyMap[item].length} 
                                            margin={props?.photoInformation?.photoBodyMap[item].length > 1 ? '0 4px' : '0%'} 
                                            imageSize={`${65 * props?.photoInformation?.photoBodyMap[item][i]}vw`} 
                                            width={props?.photoInformation?.photoBodyMap[item][i]} 
                                            imageGap='8px'
                                            src={image} key={i} 
                                            />
                                        </div>
                                        :
                                        null}
    
                                        {props.photoInformation.photoBodyMap[item].length === 3 ? 
                                        <div>
                                            <BodyImage 
                                            onClick={()=>openImage(props?.photoInformation?.imagesLarge[item][i])}
                                            imageQuantity={props?.photoInformation?.photoBodyMap[item].length} 
                                            margin={props?.photoInformation?.photoBodyMap[item].length > 1 ? '0 4px' : '0%'} 
                                            imageSize={`${65 * props?.photoInformation?.photoBodyMap[item][i]}vw`} 
                                            width={props?.photoInformation?.photoBodyMap[item][i]} 
                                            imageGap='16px'
                                            src={image} key={i} 
                                            />
                                        </div>
                                        :
                                        null}
                                        {Object.values(props?.photoInformation?.dataObj)[index+1]
                                        ?
                                        <PostSpacings element={Object.values(props?.photoInformation?.dataObj)[index+1][0]} imagesSpacing='4px' captionSpacing='4px' headerSpacing='32px' paragraphSpacing='32px'  />
                                        :
                                        null
                                        }
                                    </div>
                                )
                            })}
                        </BodyImageContainer>
                        :
                        null
                        }
                    </BodyContainer>
                )
            })
            :
            null}


            <PostFooterContainer>
                <ButtonLabelContainer onClick={isHeart ? unheartImage : heartImage}>
                    {isHeart ? 
                    <FilledHeart style={{cursor: 'pointer'}} />
                    :
                    <EmptyHeart style={{cursor: 'pointer'}} />
                    }
                    <ButtonLabel>Admire this post</ButtonLabel>
                </ButtonLabelContainer>
                <ButtonLabelContainer onClick={openCollections}>
                    <Collections style={{cursor: 'pointer'}} />
                    <ButtonLabel>Add to collection</ButtonLabel>
                </ButtonLabelContainer>
                <ButtonLabelContainer onClick={isBookmark ? unbookmark : bookmark}>
                    {isBookmark ? 
                    <FilledBookmark style={{cursor: 'pointer'}} />
                    :
                    <EmptyBookmark style={{cursor: 'pointer'}} />
                    }
                    <ButtonLabel>Save for later</ButtonLabel>
                </ButtonLabelContainer>
            </PostFooterContainer>


            <CenterDate>
                <Text size='20px'>Published on</Text>
                &nbsp;
                <Text size='20px' weight='600'>{moment(props.photoInformation?.timestamp).format('MMMM DD YYYY')}</Text> 
                &nbsp;
                <Text size='20px'>by:</Text>
            </CenterDate>


            <UserBioContainer>
                <Link to={`/photo-app/profiles/${props?.photoInformation?.username}`} onClick={clearDataOnProfileView} style={{textDecoration: 'none'}}>
                    {props?.photoInformation?.profileImage  ? 
                    <ProfileImage src={props.photoInformation.profileImage } />
                    :
                    <ProfileImage src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAyNGgtMjR2LTI0aDI0djI0em0tMi0yMmgtMjB2MjBoMjB2LTIwem0tNC4xMTggMTQuMDY0Yy0yLjI5My0uNTI5LTQuNDI3LS45OTMtMy4zOTQtMi45NDUgMy4xNDYtNS45NDIuODM0LTkuMTE5LTIuNDg4LTkuMTE5LTMuMzg4IDAtNS42NDMgMy4yOTktMi40ODggOS4xMTkgMS4wNjQgMS45NjMtMS4xNSAyLjQyNy0zLjM5NCAyLjk0NS0yLjA0OC40NzMtMi4xMjQgMS40OS0yLjExOCAzLjI2OWwuMDA0LjY2N2gxNS45OTNsLjAwMy0uNjQ2Yy4wMDctMS43OTItLjA2Mi0yLjgxNS0yLjExOC0zLjI5eiIvPjwvc3ZnPg==" />
                    }
                </Link>
                <BioContainer>
                    <Link to={`/photo-app/profiles/${props?.photoInformation?.username}`} onClick={clearDataOnProfileView} style={{textDecoration: 'none'}}>
                        <BioUsername>{props?.photoInformation?.username}</BioUsername>
                    </Link>
                    <BioName>{props?.photoInformation?.name}</BioName>
                    {props?.photoInformation?.bio ? 
                    <Bio>{props?.photoInformation?.bio}</Bio>
                    :
                    null
                    }
                </BioContainer>
            </UserBioContainer>
            
            <div style={{backgroundColor: '#fcfcfc', padding: '24px 0'}}>
                <KeepReading setShowSpinner={setShowSpinner} history={props.history} photoInformation={props?.photoInformation} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} />
            </div>

        </FeaturedPostContainer>
    )
}

const PostSpacings = (props) => {
    return(
        <div>
            {props.element==='images' && 
            <ElementSpacings spacing={props.imagesSpacing}></ElementSpacings>
            }
            {props.element==='caption' && 
            <ElementSpacings spacing={props.captionSpacing}></ElementSpacings>
            }
            {props.element==='header' && 
            <ElementSpacings spacing={props.headerSpacing}></ElementSpacings>
            }
            {props.element==='paragraph' && 
            <ElementSpacings spacing={props.paragraphSpacing}></ElementSpacings>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    photoInformation: state.app.photoInformation,
    collectionsList: state.featuredPost.collectionsList,
    isVisible: state.featuredPost.isVisible,
    isPostVisible: state.featuredPost.isPostVisible,
})

export default connect(mapStateToProps)(FeaturedPost)