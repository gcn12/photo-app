import React, { useState, useEffect } from 'react'
import HorizontalGallery from '../HorizontalGallery/HorizontalGallery'
// import Dropdown from '../Dropdown/Dropdown'
import { db } from '../Firebase'
import { Link } from 'react-router-dom'
import { ReactComponent as EmptyHeart } from '../Icons/EmptyHeart.svg'
import { ReactComponent as FilledHeart } from '../Icons/FilledHeart.svg'
import { ReactComponent as Add } from '../Icons/Add.svg'
import { ReactComponent as EmptyBookmark } from '../Icons/EmptyBookmark.svg'
import { ReactComponent as FilledBookmark } from '../Icons/FilledBookmark.svg'
import firebase from 'firebase'
import { motion } from 'framer-motion'
import { connect } from 'react-redux'
import { photoInformation } from '../Redux/Actions/appActions'
// import { collectionsList } from '../Redux/Actions/featuredPostActions'
import AddToCollection from './AddToCollection'
import EnlargeImage from './EnlargeImage'
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
    // AddCollectionHeartContainer,
} from './FeaturedPost.styles'



const FeaturedPost = (props) => {

    const [showDropdown, setShowDropdown] = useState(null)
    const [countryPhotos, setCountryPhotos] = useState([])
    const [cityPhotos, setCityPhotos] = useState([])
    const [isImageHorizontal, setIsImageHorizontal] = useState(true)
    const [isHeart, setIsHeart] = useState(false)
    const [isBookmark, setIsBookmark] = useState(false)
    const [isAddToCollection, setIsAddToCollection] = useState(false)
    const [animateLoad, setAnimateLoad] = useState('initial')
    const [showImageEnlarged, setShowImageEnlarged] = useState(false)
    const [imageToEnlarge, setImageToEnlarge] = useState('')
    const [collectionsList, setCollectionsList] = useState([])

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
    
    const getCities = (city, country, continent) => {
        const ref = db.collection('preview-posts')
        .where('continent', '==', continent)
        .where('country', '==', country)

        ref.where('city', '==', city)
        .limit(6)
        .get().then(snapshot=>{
            const cityArray = []
            snapshot.forEach(city=>{
                cityArray.push(city.data())
            })
            setCityPhotos(cityArray)
        })

        ref.limit(6).get().then(snapshot=>{
            const countriesArray = []
            snapshot.docs.forEach(doc=> {
                countriesArray.push(doc.data())
            }) 
            setCountryPhotos(countriesArray)
        })
        window.scrollTo({top: 0})
    }

    const getPost = (docID) => {
        db.collection('posts')
        .doc(docID)
        .get()
        .then(data=> {
            getCities(data.data())
        })
    }

    
    useEffect(()=>{
        if(props.user) {
            db.collection('users')
            .doc(props?.user)
            .collection('bookmarked')
            .where('username', '==', props?.match?.params?.username)
            .where('url', '==', props?.match?.params?.url)
            .get()
            .then(data=> {
                if(data.docs[0]) {
                    setIsBookmark(true)
                }
                setShowDropdown(!showDropdown)
            })
        }
        // eslint-disable-next-line
        getFeaturedPhotoInfo2(props?.match?.params?.url, props?.match?.params?.username)
        // eslint-disable-next-line
    },[])

    const getFeaturedPhotoInfo2 = (url, username) => {
        db.collection('posts')
        .where('url', '==', url)
        .where('username', '==', username)
        .get()
        .then(data=> {
            let arr = []
            data.forEach(item=> {
                arr.push(item.data())
            })
            const info = arr[0]
            getImageSize(info.image)
            info['username'] = username
            props.dispatch(photoInformation(info))
            window.scrollTo({top: 0})
            getCities(info.city, info.country, info.continent)
            firebase.auth().onAuthStateChanged((user)=> {
            if(user) {
                db.collection('users')
                .doc(user.uid)
                .collection('hearts')
                .where('hearts', 'array-contains', info.id)
                .get()
                .then(data=> {
                    let arr = []
                    data.forEach(item=> {
                        arr.push(item.data())
                    })
                    setIsHeart(arr.length)
                })
                .then(()=> {
                    setAnimateLoad('transitionStart')
                })
            }
            })
        })
    }

    const getImageSize = (src) => {
        var img = new Image();
        img.onload = function () { 
            if (img.height / img.width > 1) {
                setIsImageHorizontal(false)
            }
        };
        // img.src = props?.photoInformation?.image;
        img.src = src
    }
    

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
                            setIsAddToCollection(true)
                        }
                    })
                })
            }else{
                setIsAddToCollection(true)
            }
        }) 
    }

    

    const heartImage = () => {
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

    // const showDropdownAndGetList = () => {
    //     if(props.collectionsList?.length === 0) {
    //         getCollectionsList()
    //     }else{
    //         setShowDropdown(!showDropdown)
    //     }
    // }

    window.onclick = (e) => {
        if (!e.target.matches('.dropdown')) {
            setShowDropdown(false)
        }
    }

    const variants = {
        initial: {
            opacity: 0,
        },
        transitionStart: {
            opacity: 1,
        }
    }

    const enlarge = (imageURL) => {
        setImageToEnlarge(imageURL)
        setShowImageEnlarged(true)
    }

    const openCollections = () => {
        setIsAddToCollection(true)
        if(props.collectionsList?.length === 0) {
            getCollectionsList()
        }else{
            setIsAddToCollection(true)
        }
    }

    return(
        <motion.div style={{marginTop: '75px'}} variants={variants} initial='initial' animate={animateLoad}>
            {showImageEnlarged ? 
            <EnlargeImage setShowImageEnlarged={setShowImageEnlarged} image={imageToEnlarge} />
            :
            null
            }
            {/* <SubmitButton onClick={()=>props.history.goBack()}>Back</SubmitButton> */}
            {isAddToCollection ? 
            <AddToCollection photoInfo={props.photoInformation} setCollectionsList={setCollectionsList} collectionsList={collectionsList} setIsAddToCollection={setIsAddToCollection} />
            :
            null
            }
            <Container>
                <div>
                    <MainImage onLoad={null} width={isImageHorizontal ? '80vw' : 'auto'} height={isImageHorizontal ? 'auto' : '80vh'} id='featured-main-image' alt='display' src={props?.photoInformation?.image}></MainImage>
                    {/* <DateStyle font={props?.photoInformation?.font}>{moment(props.photoInformation?.timestamp).format('MMMM Do YYYY')}</DateStyle> */}
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <DateStyle font={props?.photoInformation?.font}>{moment(props.photoInformation?.timestamp).format('MM DD YY')}</DateStyle>
                    </div>
                    {/* <InfoContainer justify='space-between'>
                        {props?.user ? 
                        <AddCollectionHeartContainer>
                            <SubmitButton className='dropdown' onClick={showDropdownAndGetList}>
                                <div className='dropdown'>Add to collection &#x25BC;</div>
                            </SubmitButton>
                            {showDropdown ? 
                            <Dropdown className='dropdown' /> 
                            : 
                            null}  
                            {isHeart ? 
                            <FilledHeart onClick={unheartImage} style={{marginLeft: '10px', cursor: 'pointer'}} />
                            :
                            <EmptyHeart onClick={heartImage} style={{marginLeft: '10px', cursor: 'pointer'}} />
                            }
                        </AddCollectionHeartContainer>
                        :
                        null}
                        <DateStyle font={props?.photoInformation?.font}>{moment(props.photoInformation?.timestamp).format('MMMM Do YYYY')}</DateStyle>
                    </InfoContainer> */}
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
                                            onClick={()=>enlarge(props?.photoInformation?.imagesLarge[item][i])}
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
                                            onClick={()=>enlarge(props?.photoInformation?.imagesLarge[item][i])}
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
                                            onClick={()=>enlarge(props?.photoInformation?.imagesLarge[item][i])}
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
                <ButtonLabelContainer>
                    {isHeart ? 
                    <FilledHeart onClick={unheartImage} style={{cursor: 'pointer'}} />
                    :
                    <EmptyHeart onClick={heartImage} style={{cursor: 'pointer'}} />
                    }
                    <ButtonLabel>Admire this post</ButtonLabel>
                </ButtonLabelContainer>
                <ButtonLabelContainer>
                    <Add onClick={openCollections} style={{cursor: 'pointer'}} />
                    <ButtonLabel>Add to collection</ButtonLabel>
                </ButtonLabelContainer>
                <ButtonLabelContainer>
                    {isBookmark ? 
                    <FilledBookmark onClick={unbookmark} style={{cursor: 'pointer'}} />
                    :
                    <EmptyBookmark onClick={bookmark} style={{cursor: 'pointer'}} />
                    }
                    <ButtonLabel>Save for later</ButtonLabel>
                </ButtonLabelContainer>
            </PostFooterContainer>


            
            <HorizontalGallery 
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
            />
        </motion.div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    photoInformation: state.app.photoInformation,
    collectionsList: state.featuredPost.collectionsList,
})

export default connect(mapStateToProps)(FeaturedPost)