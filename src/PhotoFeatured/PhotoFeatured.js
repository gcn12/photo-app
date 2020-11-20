import React, { useEffect, useState } from 'react'
import HorizontalGallery from '../HorizontalGallery/HorizontalGallery'
import { db } from '../Firebase'
import { SubmitButton } from '../AddContent/AddContent.styles'
import {
    Title,
    Description,
    Image,
    Author,
    Container,
    Container2,
} from './PhotoFeatured.styles'

const PhotoFeatured = (props) => {

    const [countryPhotos, setCountryPhotos] = useState([])
    const [cityPhotos, setCityPhotos] = useState([])

    const { city, continent, country } = props.photoInformation

    const getCities = () => {

        const ref = db.collection('posts')
        .where('continent', '==', continent)
        .where('country', '==', country)

        ref.where('city', '==', city)
        .get().then(snapshot=>{
            const cityArray = []
            snapshot.forEach(city=>{
                cityArray.push(city.data())
                // console.log(city.data())
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

    

    useEffect(getCities,[city, continent, country])

    return(
        <div>
            <SubmitButton onClick={()=>props.setPageRoute('GetPhotos')}>Back</SubmitButton>
            <Container2>
                <Container>
                    <Title>{props.photoInformation.title}</Title>
                    <Container2>
                        <Image alt='display' src={props.photoInformation.image}></Image>
                    </Container2>
                    <Author>{props.photoInformation.author}</Author>
                    <Description>{props.photoInformation.description}</Description>
                </Container>
            </Container2>
            <HorizontalGallery getCountries={getCities} setHomePhotoInformation={props.setHomePhotoInformation} setPageRoute={props.setPageRoute}  placeName={props.photoInformation.city} place={'city'} title={props.photoInformation.city} photoInformation={props.photoInformation} photos={cityPhotos} setPhotoInformation={props.setPhotoInformation}  />
            <HorizontalGallery setHomePhotoInformation={props.setHomePhotoInformation} setPageRoute={props.setPageRoute} placeName={props.photoInformation.country} place={'country'} title={props.photoInformation.country} setPhotoInformation={props.setPhotoInformation} photos={countryPhotos} photoInformation={props.photoInformation} />
        </div>
    )
}

export default PhotoFeatured


// useEffect(()=> {
//     window.scrollTo({top: 0})
//     const countries = db.collection('posts')
//     .where('continent', '==', props.photoInformation.continent)
//     .where('country', '==', props.photoInformation.country)
//     countries.get().then(snapshot=>{
//         const countriesArray = []
//         snapshot.docs.forEach(doc=> {
//             countriesArray.push(doc.data())
//         }) 
//         setCountryPhotos(countriesArray)
//     })

//     const cities = db.collection('posts')
//     .where('continent', '==', props.photoInformation.continent)
//     .where('country', '==', props.photoInformation.country)
//     .where('city', '==', props.photoInformation.city)
//     cities.get().then(snapshot=>{
//         const cityArray = []
//         snapshot.forEach(city=>{
//             cityArray.push(city.data())
//             // console.log(city.data())
//         })
//         setCityPhotos(cityArray)
//     })

//     // eslint-disable-next-line  
// }, [])