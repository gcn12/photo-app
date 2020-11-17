import React, { useEffect, useState } from 'react'
import HorizontalGallery from '../HorizontalGallery/HorizontalGallery'
import { db } from '../Firebase'
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

    // const [cityPhotos, setCityPhotos] = useState()

    useEffect(()=> {
        const countries = db.collection('posts').where('continent', '==', props.photoInformation.continent)
        // .where('country', '==', props.photoInformation.country)
        countries.get().then(snapshot=>{
            const countriesArray = []
            snapshot.docs.forEach(doc=> {
                countriesArray.push(doc.data())
                console.log(doc.data())
            }) 
            setCountryPhotos(countriesArray)
        })
        // const cities = db.collection('posts').where('continent', '==', props.photoInformation.continent).where('country', '==', props.photoInformation.country)
        // cities.get().then(snapshot=>{
        //     console.log(snapshot)
        //     setCityPhotos()
        // }, [])
    }, [])

    return(
        <div>
            <Container2>
                {/* <Container>
                    <Title>{props.photoInformation?.title}</Title>
                    <Description>{props.photoInformation?.description}</Description>
                    <Image>{props.photoInformation?.image}</Image>
                    <Author>{props.photoInformation?.author}</Author>
                </Container> */}
                <Container>
                    <Title>{props.photoInformation.title}</Title>
                    <Container2>
                        <Image alt='placeholder' src={props.photoInformation.image}></Image>
                    </Container2>
                    <Author>{props.photoInformation.author}</Author>
                    <Description>{props.photoInformation.description}</Description>
                </Container>
            </Container2>
            {/* <HorizontalGallery photoInformation={countryPhotos} />
            <HorizontalGallery photoInformation={cityPhotos} /> */}
            {/* {countryPhotos.length > 0 ?  */}
            <HorizontalGallery countryPhotos={countryPhotos} photoInformation={props.photoInformation} />
            {/* :
            null
            } */}
        </div>
    )
}

export default PhotoFeatured