import React, { useState, useEffect } from 'react'
// import HorizontalGallery from '../HorizontalGallery/HorizontalGallery'
// import Dropdown from '../Dropdown/Dropdown'
import { db } from '../Firebase'
import { Link } from 'react-router-dom'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import { ReactComponent as EmptyHeart } from '../Icons/EmptyHeart.svg'
import { ReactComponent as FilledHeart } from '../Icons/FilledHeart.svg'
import { ReactComponent as Collections } from '../Icons/Collections.svg'
import { ReactComponent as EmptyBookmark } from '../Icons/EmptyBookmark.svg'
import { ReactComponent as FilledBookmark } from '../Icons/FilledBookmark.svg'
import { ReactComponent as SquareAvatar } from '../Icons/SquareAvatar.svg'
import firebase from 'firebase'
import { PopupDarken } from '../Styles/PopupStyles.styles'
import { connect } from 'react-redux'
import { photoInformation } from '../Redux/Actions/appActions'
import { isVisible } from '../Redux/Actions/featuredPostActions'
import AddToCollection from './AddToCollection'
import EnlargeImage from './EnlargeImage'
import KeepReading from './KeepReading'
// import FeaturedPostGallery from '../FeaturedPostGallery/FeaturedPostGallery'
// import { SubmitButton } from '../AddContent/AddContent.styles'
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
    DateStyle,
    ButtonLabelContainer,
    ButtonLabel,
    UserBioContainer,
    ProfileImage,
    Bio,
    BioName,
    BioUsername,
    BioContainer,
    FeaturedPostContainer,
    // AddCollectionHeartContainer,
} from './FeaturedPost.styles'



const FeaturedPost = (props) => {

    const [showDropdown, setShowDropdown] = useState(null)
    // const [countryPhotos, setCountryPhotos] = useState([])
    // const [cityPhotos, setCityPhotos] = useState([])
    // const [isImageHorizontal, setIsImageHorizontal] = useState(true)
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
        .where('username', '==', props.photoInformation.username)
        .where('url', '==', props.photoInformation.url)
        .get()
        .then(data=> {
            data.docs[0].ref.delete()
            setIsBookmark(false)
        })
    }

    useEffect(()=>{
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
        db.collection('posts')
        .where('postID', '==', postID)
        .get()
        .then(data=> {
            let post = data.docs[0].data()
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
                    window.scrollTo({top: 0})
                    // props.dispatch(isVisible(true))
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
                            // props.dispatch(collectionsList(collectionsArray))
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
            // setIsBookmark(true)
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
        // setIsAddToCollection(true)
        if(props.collectionsList?.length === 0) {
            getCollectionsList()
        }else{
            openAddToCollection()
        }
    }

    const pagedLoaded = () => {
        props.dispatch(isVisible(true))
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
        disableBodyScroll(document.body)
    }

    const closeAddToCollection = () => {
        setIsAddToCollection(false)
        enableBodyScroll(document.body)
    }

    return(
        <div>
            <FeaturedPostContainer opacity={props.isVisible ? 1 : 0} style={{marginTop: '85px'}}>
                {showImageEnlarged ? 
                <div>
                    <PopupDarken />
                    <EnlargeImage closeImage={closeImage} setShowImageEnlarged={setShowImageEnlarged} image={imageToEnlarge} />
                </div>
                :
                null
                }
                {/* <SubmitButton onClick={()=>props.history.goBack()}>Back</SubmitButton> */}
                {isAddToCollection ? 
                <div>
                    <PopupDarken />
                    <AddToCollection showSpinner={showSpinner} closeAddToCollection={closeAddToCollection} photoInfo={props.photoInformation} setCollectionsList={setCollectionsList} collectionsList={collectionsList} setIsAddToCollection={setIsAddToCollection} />
                </div>
                :
                null
                }
                <Container>
                    <div>
                        <MainImage 
                        onLoad={pagedLoaded} 
                        id='featured-main-image' alt='display' src={props?.photoInformation?.image}>
                        </MainImage>
                        {/* <DateStyle font={props?.photoInformation?.font}>{moment(props.photoInformation?.timestamp).format('MMMM Do YYYY')}</DateStyle> */}
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <DateStyle font={props?.photoInformation?.font}>{moment(props.photoInformation?.timestamp).format('MM DD YY')}</DateStyle>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Title font={props?.photoInformation?.font}>{props?.photoInformation?.title}</Title>
                        </div>
                        <InfoContainer justify='center'>
                            <Link to={`/photo-app/profiles/${props?.photoInformation?.username}`} style={{textDecoration: 'none'}}>
                                <Author font={props?.photoInformation?.font}>{props?.photoInformation?.author} | {props?.photoInformation?.username}</Author>
                            </Link>
                        </InfoContainer>
                    </div>
                </Container>
                {/* {console.log(props?.photoInformation)} */}
                {props?.photoInformation?.dataObj ? 
                Object.keys(props?.photoInformation?.dataObj)?.map((item, index) => {
                    return(
                        <BodyContainer key={index}>
                            {Object.values(props?.photoInformation?.dataObj)[item][0]==='caption' && Object.values(props?.photoInformation?.dataObj)[item][1].length>0 ? 
                            <Caption font={props.photoInformation.font}>{Object.values(props?.photoInformation?.dataObj)[item][1]}</Caption>
                            :
                            null
                            }
                            {Object.values(props?.photoInformation?.dataObj)[item][0]==='paragraph' && Object.values(props?.photoInformation?.dataObj)[item][1].length>0 ? 
                            <Description font={props.photoInformation.font}>{Object.values(props?.photoInformation?.dataObj)[item][1]}</Description>
                            :
                            null
                            }
                            {Object.values(props?.photoInformation?.dataObj)[item][0]==='header' && Object.values(props?.photoInformation?.dataObj)[item][1].length>0 ? 
                            <Header font={props.photoInformation.font}>{Object.values(props?.photoInformation?.dataObj)[item][1]}</Header>
                            :
                            null
                            }
                            {Object.values(props?.photoInformation?.dataObj)[item][0]==='images' ? 
                            <BodyImageContainer>
                                {props?.photoInformation?.imagesSmall[item]?.map((image, i)=> {
                                    return(
                                        <div key={i}>
                                            {/* <BodyImage length={props?.photoInformation?.photoBodyMap[item].length} margin={props?.photoInformation?.photoBodyMap[item].length > 1 ? '0 .5%' : '0%'} width={props?.photoInformation?.photoBodyMap[item].length > 1 ? `${65 * props?.photoInformation?.photoBodyMap[item][i]}vw` : 'auto'} src={image} key={i}></BodyImage> */}
                                            {props.photoInformation.photoBodyMap[item].length === 1 ? 
                                            <div>
                                                <BodyImage 
                                                onClick={()=>openImage(props?.photoInformation?.imagesLarge[item][i])}
                                                imageQuantity={props?.photoInformation?.photoBodyMap[item].length} 
                                                margin={props?.photoInformation?.photoBodyMap[item].length > 1 ? '0 5px' : '0%'} 
                                                imageSize={`${65 * props?.photoInformation?.photoBodyMap[item][i]}vw`} 
                                                // width={props?.photoInformation?.photoBodyMap[item].length > 1 ? `${65 * props?.photoInformation?.photoBodyMap[item][i]}vw` : 'auto'} 
                                                width={props?.photoInformation?.photoBodyMap[item][i]} 
                                                imageGap='0px'
                                                src={image} key={i} 
                                                />
                                            </div>
                                            :
                                            null}
        
                                            {props.photoInformation.photoBodyMap[item].length === 2 ? 
                                            <div>
                                                <BodyImage 
                                                onClick={()=>openImage(props?.photoInformation?.imagesLarge[item][i])}
                                                imageQuantity={props?.photoInformation?.photoBodyMap[item].length} 
                                                margin={props?.photoInformation?.photoBodyMap[item].length > 1 ? '0 5px' : '0%'} 
                                                imageSize={`${65 * props?.photoInformation?.photoBodyMap[item][i]}vw`} 
                                                // width={props?.photoInformation?.photoBodyMap[item].length > 1 ? `${65 * props?.photoInformation?.photoBodyMap[item][i]}vw` : 'auto'} 
                                                width={props?.photoInformation?.photoBodyMap[item][i]} 
                                                imageGap='10px'
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
                                                margin={props?.photoInformation?.photoBodyMap[item].length > 1 ? '0 5px' : '0%'} 
                                                imageSize={`${65 * props?.photoInformation?.photoBodyMap[item][i]}vw`} 
                                                // width={props?.photoInformation?.photoBodyMap[item].length > 1 ? `${65 * props?.photoInformation?.photoBodyMap[item][i]}vw` : 'auto'} 
                                                width={props?.photoInformation?.photoBodyMap[item][i]} 
                                                imageGap='20px'
                                                src={image} key={i} 
                                                />
                                            </div>
                                            :
                                            null}
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

                <UserBioContainer>
                    <Link to={`/photo-app/profiles/${props?.photoInformation?.username}`} style={{textDecoration: 'none'}}>
                        {props?.photoInformation?.profileImage  ? 
                        <ProfileImage src={props.photoInformation.profileImage } />
                        :
                        <SquareAvatar style={{ transform: 'scale(4.5)', marginRight: '50px' }}/>
                        }
                    </Link>
                    <BioContainer>
                        <Link to={`/photo-app/profiles/${props?.photoInformation?.username}`} style={{textDecoration: 'none'}}>
                            <BioUsername>{props?.photoInformation?.username}</BioUsername>
                        </Link>
                        <BioName>{props?.photoInformation?.author}</BioName>
                        {props?.photoInformation?.bio ? 
                        <Bio>{props?.photoInformation?.bio}</Bio>
                        :
                        null
                        }
                    </BioContainer>
                </UserBioContainer>
                
                <div style={{backgroundColor: '#fcfcfc', padding: '20px 0'}}>
                    <KeepReading history={props.history} photoInformation={props?.photoInformation} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} />
                </div>
                {/* <HorizontalGallery 
                history={props.history}
                getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                getPost={getPost}
                getCountries={getCities} 
                placeName={props?.city} 
                place={'city'} 
                title={props.photoInformation?.city} 
                photos={cityPhotos} 
                />
                <HorizontalGallery 
                    history={props.history}
                    getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                    getPost={getPost}
                    placeName={props.photoInformation?.country} 
                    place={'country'} 
                    title={props.photoInformation?.country} 
                    photos={countryPhotos} 
                /> */}
            </FeaturedPostContainer>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    photoInformation: state.app.photoInformation,
    collectionsList: state.featuredPost.collectionsList,
    isVisible: state.featuredPost.isVisible
})

export default connect(mapStateToProps)(FeaturedPost)