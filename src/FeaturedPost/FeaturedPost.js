import React, { useState, useEffect } from 'react'
import HorizontalGallery from '../HorizontalGallery/HorizontalGallery'
import Dropdown from '../Dropdown/Dropdown'
import { db } from '../Firebase'
import { Link } from 'react-router-dom'
import {ReactComponent as EmptyHeart} from '../EmptyHeart.svg'
import { ReactComponent as FilledHeart } from '../FilledHeart.svg'
import firebase from 'firebase'
// import FeaturedPostGallery from '../FeaturedPostGallery/FeaturedPostGallery'
import { SubmitButton } from '../AddContent/AddContent.styles'
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
    DateStyle,
    AddCollectionHeartContainer,
    // Container2,
    // Container3,
    BodyImage,
} from './FeaturedPost.styles'



const FeaturedPost = (props) => {

    const [collectionsList, setCollectionsList] = useState([])
    const [collectionsBoolArray, setCollectionsBoolArray] = useState(null)
    const [showDropdown, setShowDropdown] = useState(null)
    const [countryPhotos, setCountryPhotos] = useState([])
    const [cityPhotos, setCityPhotos] = useState([])
    const [isImageHorizontal, setIsImageHorizontal] = useState(true)
    const [isHeart, setIsHeart] = useState(false)

    
    const getCities = () => {
        const ref = db.collection('preview-posts')
        .where('continent', '==', props?.photoInformation?.continent)
        .where('country', '==', props?.photoInformation?.country)

        ref.where('city', '==', props?.photoInformation?.city)
        .get().then(snapshot=>{
            const cityArray = []
            snapshot.forEach(city=>{
                cityArray.push(city.data())
            })
            setCityPhotos(cityArray)
        })

        ref.get().then(snapshot=>{
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
    
    // const { url, username } = props.match.params
    // const { getFeaturedPhotoInfo } = props
    // eslint-disable-next-line
    // useEffect(()=>getCities(props?.photoInformation?.id), [])
    // eslint-disable-next-line
    useEffect(()=>getVH(), [])
    // eslint-disable-next-line
    useEffect(()=>getImageSize(), [])
    
    useEffect(()=>{
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
          info['username'] = username
          props.setPhotoInformation(info)
          window.scrollTo({top: 0})
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
            }
        })
        })
    }


    // const getHearts = () => {
    //     db.collection('users')
    //     .doc(props.user)
    //     .collection('hearts')
    //     .where('hearts', 'array-contains', props.photoInformation.id)
    //     .get()
    //     .then(data=> {
    //         let arr = []
    //         data.forEach(item=> {
    //             arr.push(item.data())
    //         })
    //         setIsHeart(arr.length)
    //     })
    // }

    

    




    const getImageSize = () => {
        var img = new Image();
        img.onload = function () { 
            if (img.height / img.width > 1) {
                setIsImageHorizontal(false)
            }
            // alert("height: " + img.height + " width:" + img.width); 
        };
        img.src = props?.photoInformation?.image;
    }
    

    const getVH = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
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
                            setShowDropdown(!showDropdown)
                        }
                    })
                })
            }else{
                setShowDropdown(!showDropdown)
            }
        }) 
    }

    

    const heartImage = () => {
        db.collection('users')
        .doc(props.user)
        .collection('hearts')
        .doc('hearts')
        .update({
            hearts: firebase.firestore.FieldValue.arrayUnion(props.photoInformation.id)
        })
        .then(()=> {
            setIsHeart(true)
        })
    }

    const unheartImage = () => {
        db.collection('users')
        .doc(props.user)
        .collection('hearts')
        .doc('hearts')
        .update({
            hearts: firebase.firestore.FieldValue.arrayRemove(props.photoInformation.id)
        }).then(()=> {
            setIsHeart(false)
        })
    }

    const showDropdownAndGetList = () => {
        if(collectionsList?.length === 0) {
            getCollectionsList()
        }else{
            setShowDropdown(!showDropdown)
        }
    }

    window.onclick = (e) => {
        if (!e.target.matches('.dropdown')) {
            setShowDropdown(false)
        }
    }

    return(
        <div>
            <SubmitButton onClick={()=>props.history.goBack()}>Back</SubmitButton>
            <Container>
                <Title font={props?.photoInformation?.font}>{props?.photoInformation?.title}</Title>
                <div>
                <MainImage width={isImageHorizontal ? '80vw' : 'auto'} height={isImageHorizontal ? 'auto' : '80vh'} id='test' alt='display' src={props?.photoInformation?.image}></MainImage>
                <InfoContainer>
                    {props?.user ? 
                    <AddCollectionHeartContainer>
                        <SubmitButton className='dropdown' onClick={showDropdownAndGetList}>
                            <div className='dropdown'>Add to collection</div>
                        </SubmitButton>
                        {isHeart ? 
                        <FilledHeart onClick={unheartImage} style={{marginLeft: '10px', cursor: 'pointer'}} />
                        :
                        <EmptyHeart onClick={heartImage} style={{marginLeft: '10px', cursor: 'pointer'}} />
                        }
                        {showDropdown ? 
                        <Dropdown
                            photoInformation={props.photoInformation}
                            setCollectionsBoolArray={setCollectionsBoolArray}
                            collectionsBoolArray={collectionsBoolArray} 
                            className='dropdown' 
                            user={props.user} 
                            collectionsList={collectionsList}
                            setCollectionsList={setCollectionsList}
                        /> 
                        : 
                        null}  
                    </AddCollectionHeartContainer>
                    :
                    null}
                    <Link to={`/photo-app/profiles/${props?.photoInformation?.username}`} style={{textDecoration: 'none'}}>
                    <Author font={props?.photoInformation?.font}>{props?.photoInformation?.author}</Author>
                    {/* <Author onClick={()=>props.getUserProfile(props.photoInformation.username)} font={props.photoInformation.font}>{props.photoInformation?.author}</Author> */}
                    </Link>
                    <DateStyle font={props?.photoInformation?.font}>{moment(props.photoInformation?.timestamp).format('MMMM Do YYYY')}</DateStyle>
                </InfoContainer>
                </div>
            </Container>
                {props?.photoInformation?.content?.map((item, index) => {
                    return(
                        <BodyContainer key={index}>
                            <Description font={props.photoInformation.font}>{item}</Description>
                            <BodyImageContainer>
                            {props?.photoInformation?.images[index]?.map((image, i)=> {
                                return(
                                    <BodyImage width={65 * props.photoInformation.photoBodyMap[index][i]} src={image} key={i}></BodyImage>
                                )
                            })}
                            </BodyImageContainer>
                        </BodyContainer>
                    )
                })}
                <HorizontalGallery 
                history={props.history}
                setCollectionsList={setCollectionsList}
                getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                getPost={getPost}
                getCountries={getCities} 
                setHomePhotoInformation={props.setHomePhotoInformation} 
                placeName={props?.city} 
                place={'city'} 
                title={props.photoInformation?.city} 
                photoInformation={props.photoInformation} 
                photos={cityPhotos} 
                setPhotoInformation={props.setPhotoInformation}  
            />
            <HorizontalGallery 
                history={props.history}
                setCollectionsList={setCollectionsList}
                getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                getPost={getPost}
                setHomePhotoInformation={props.setHomePhotoInformation} 
                placeName={props.photoInformation?.country} 
                place={'country'} 
                title={props.photoInformation?.country} 
                setPhotoInformation={props.setPhotoInformation} 
                photos={countryPhotos} 
                photoInformation={props.photoInformation} 
            />
        </div>
    )
}

export default FeaturedPost