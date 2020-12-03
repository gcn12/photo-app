import React, { useEffect, useState } from 'react'
import HorizontalGallery from '../HorizontalGallery/HorizontalGallery'
import Dropdown from '../Dropdown/Dropdown'
import { db } from '../Firebase'
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

    
    const getCities = () => {
        const { city, continent, country } = props.photoInformation
        const ref = db.collection('preview-posts')
        .where('continent', '==', continent)
        .where('country', '==', country)

        ref.where('city', '==', city)
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
    
    // eslint-disable-next-line
    useEffect(()=>getCities(props.photoInformation.id), [])
    // eslint-disable-next-line
    useEffect(()=>getVH(), [])
    // eslint-disable-next-line
    useEffect(()=>getImageSize(), [])


    const getImageSize = () => {
        var img = new Image();
        img.onload = function () { 
            if (img.height / img.width > 1) {
                setIsImageHorizontal(false)
            }
            // alert("height: " + img.height + " width:" + img.width); 
        };
        img.src = props.photoInformation.image;
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
                    mapArray.push(collection.data().name)
                    db.collection('users')
                    .doc(props.user)
                    .collection('collections')
                    .where('collection', '==', collection.data().name)
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
            <SubmitButton onClick={()=>props.setPageRoute('GetPhotos')}>Back</SubmitButton>
            <Container>
                <Title font={props.photoInformation.font}>{props.photoInformation?.title}</Title>
                <div>
                <MainImage width={isImageHorizontal ? '80vw' : 'auto'} height={isImageHorizontal ? 'auto' : '80vh'} id='test' alt='display' src={props?.photoInformation?.image}></MainImage>
                <InfoContainer>
                    {props?.user ? 
                    <div>
                        <SubmitButton className='dropdown' onClick={showDropdownAndGetList}>
                            <div className='dropdown'>Add to collection</div>
                        </SubmitButton>
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
                    </div>
                    :
                    null}
                    <Author onClick={()=>props.getUserProfile(props.photoInformation.username)} font={props.photoInformation.font}>{props.photoInformation?.author}</Author>
                    <DateStyle font={props.photoInformation.font}>{moment(props.photoInformation?.timestamp).format('MMMM Do YYYY')}</DateStyle>
                </InfoContainer>
                </div>
            </Container>
                {props.photoInformation?.content.map((item, index) => {
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
                setCollectionsList={setCollectionsList}
                getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                getPost={getPost}
                getCountries={getCities} 
                setHomePhotoInformation={props.setHomePhotoInformation} 
                setPageRoute={props.setPageRoute}  
                placeName={props?.city} 
                place={'city'} 
                title={props.photoInformation?.city} 
                photoInformation={props.photoInformation} 
                photos={cityPhotos} 
                setPhotoInformation={props.setPhotoInformation}  
            />
            <HorizontalGallery 
                setCollectionsList={setCollectionsList}
                getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                getPost={getPost}
                setHomePhotoInformation={props.setHomePhotoInformation} 
                setPageRoute={props.setPageRoute} 
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