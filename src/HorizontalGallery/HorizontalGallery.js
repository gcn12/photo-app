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
            <a href={props.url}><Image className='grid-item' alt='' src={props.url}></Image></a>
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
            {props.countryPhotos ? 
            <div>
            <TextContainer>
                <Title>City, Country</Title>
                <SeeMore>See more</SeeMore>
            </TextContainer>
            <OverflowX>
                {
                props.countryPhotos.map((info, index) => {
                    console.log(info.image)
                    return(
                        <DisplayPhoto key={index} url={info.image}/>
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

// const images = [
//     {image: 'https://media.timeout.com/images/105240189/630/472/image.jpg'},
//     {image: 'https://i.guim.co.uk/img/media/39509f6344c723acd2f7f79588d0ff1d5df7dcbf/0_200_6000_3600/master/6000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=5b015005ff2fb3c17bc001106c9d3e25'},
//     {image: 'https://www.telegraph.co.uk/content/dam/Travel/2019/September/nz.jpg'},
//     {image: 'https://www.usnews.com/dims4/USNEWS/ef37c6c/2147483647/thumbnail/1000x468/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Fd8%2Fab%2Fc53e172746338529fdcaef9df304%2Fbc18.countries_new_zealand_crop.jpg'},
//     {image: 'https://www.telegraph.co.uk/content/dam/Travel/2019/September/Kauri%20tree.jpg?imwidth=1400'},
//     {image: 'https://api.time.com/wp-content/uploads/2017/08/200-americans-living-north-korea.jpg'},
// ]

export default HorizontalGallery