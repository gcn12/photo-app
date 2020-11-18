import React from 'react'
import { 
    Title,
    OverflowX, 
    Image,
    SeeMore,
    TextContainer,
} from './HorizontalGallery.styles'

const DisplayPhoto = (props) => {
    return(
        <div>
            <Image onClick={()=>props.setPhotoInformation(props.info)} className='grid-item' alt='' src={props.url}></Image>
        </div>
    )
}

// const HorizontalGallery = (props) => {
//     return(
//         <div>
//             <TextContainer>
//                 <Title>City, Country</Title>
//                 <SeeMore>See more</SeeMore>
//             </TextContainer>
//             <OverflowX>
//                 {images.map(image => {
//                     return(
//                         <DisplayPhoto image={image.image}/>
//                     )
//                 })
//                 }
//             </OverflowX>
//         </div>
//     )
// }

const HorizontalGallery = (props) => {
    return(
        <div>
            {props.photos ? 
            <div>
            <TextContainer>
                <Title>{props.title}</Title>
                <SeeMore>See more</SeeMore>
            </TextContainer>
            <OverflowX>
                {
                props.photos.map((info, index) => {
                    return(
                        <DisplayPhoto setPhotoInformation={props.setPhotoInformation} key={index} info={info} url={info.image}/>
                    )
                })
                }
            </OverflowX>
            </div>
        :
        null
        }
        </div>
    )
}

export default HorizontalGallery