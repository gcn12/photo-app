import React, { } from 'react'
import {
    Image,
    Container,
} from './FeaturedPostGallery.styles'

const FeaturePostGallery = (props) => {

    const calculateSizes = () => {
        const images = document.getElementsByClassName('hello'); 
        console.log(images)
        for(let image of images) {
            console.log(image.naturalWidth, image.naturalHeight)
        }
        // const images = document.getElementById('hello'); 
        // console.log(images)
        // console.log(images.naturalWidth, images.naturalHeight)
        // img.src = 'https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/photo-1513407030348-c983a97b98d8.jpg?alt=media&token=671c3411-d381-42b4-b64c-8b29b7f1bf61';
    }

    return(
        <Container onLoad={calculateSizes}>
            {/* <button onClick={calculateSizes}>Click</button> */}
            {props.images.map((image, index)=> {
                return(
                    <Image className='hello' height={'25'} key={index} src={image}></Image>
                )
            })}
        </Container>
    )
}

export default FeaturePostGallery