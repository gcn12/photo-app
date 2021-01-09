import React from 'react'
import moment from 'moment'
import {
    PreviewContainer,
    BodyImagePreview,
} from './Preview.styles'
import {
    Author,
    Title,
    Description,
    MainImage,
    Container,
    BodyContainer,
    BodyImageContainer,
    DateStyle,
    Header, 
    Caption,
    // Container3,
} from '../FeaturedPost/FeaturedPost.styles'

const BodyImage = (props) => {

    // const image = () => {
    //     const viewFile = new FileReader()
    //     const file = props.image
    //     viewFile.onload = (e) => {
    //         const image = document.getElementById(`body-photo-${props.index}-${props.i}`)
    //         image.src = e.target.result
    //     }
    //     viewFile.readAsDataURL(file)
    // }

    // image()

    // console.log(65 * props.imageSizeRatio)
    // console.log(props.imageSizeRatioLength)
    return(
        // <BodyImagePreview id={`body-photo-${props.index}-${props.i}`} width={65 / (props.bodyImages[props.index] ? props.bodyImages[props.index].length : 1)} ></BodyImagePreview>
        // <BodyImagePreview id={`body-photo-${props.index}-${props.index}`} ></BodyImagePreview>
        <BodyImagePreview src={props.image} id={`body-photo-${props.index}-${props.i}`}  width={props.imageSizeRatioLength > 1 ? `${65 * props.imageSizeRatio}vw` : 'auto'} ></BodyImagePreview>
    )
}

const Preview = (props) => {
    return( 
        <PreviewContainer initial='initial' visibility={props.animationMap.preview[props.previewProps].opacity} transition='transition' animate={props.previewProps} variants={props.animationMap.preview}>
        <div style={{margin: '10px 0 65px 0'}}>
            <Container>
            {/* <PreviewContainer2> */}
                <div>
                    {props?.filesLarge[0] ? 
                    <MainImage id='test'  width={props.isImageHorizontal ? '80vw' : 'auto'} height={props.isImageHorizontal ? 'auto' : '80vh'} alt='display' src={props?.filesLarge[0][0]}></MainImage>
                    :
                    null
                    }
                    <DateStyle font={props.font}>{moment(Date.now()).format('MMMM Do YYYY')}</DateStyle>

                </div>
                {document.getElementById('add-content-title') ? 
                <Title font={props.font}>{document.getElementById('add-content-title').value}</Title>
                :
                null 
                }
                <div style={{margin: '15px 0 40px 0'}}>
                    <Author font={props.font}>{'Dan Richards'}</Author>
                </div>
                </Container>
                {Object.keys(props.itemsToUploadData).map((item, index)=> {
                    return(
                            <BodyContainer margin='0px' key={index}>

                                {Object.values(props.itemsToUploadData)[item][0] === 'paragraph' ? 
                                <Description font={props.font}>{Object.values(props.itemsToUploadData)[item][1]}</Description>
                                :
                                null
                                }
                                {Object.values(props.itemsToUploadData)[item][0] === 'caption' ? 
                                <Caption font={props.font}>{Object.values(props.itemsToUploadData)[item][1]}</Caption>
                                :
                                null
                                }
                                {Object.values(props.itemsToUploadData)[item][0] === 'header' ? 
                                <Header font={props.font}>{Object.values(props.itemsToUploadData)[item][1]}</Header>
                                :
                                null
                                }
                                {Object.values(props.itemsToUploadData)[item][0] === 'images' ? 
                                <BodyImageContainer> 
                                {props.previewImages[item].map((image, index)=> {
                                    return(
                                        // <img src={} key={index}></img>
                                        <BodyImage imageSizeRatioLength={props.previewImageSizeRatio[item].length} imageSizeRatio={props.previewImageSizeRatio[item][index]} bodyImages={props.bodyImages} i={index} image={image} index={index} key={index}></BodyImage>
                                        )
                                    })}
                                    </BodyImageContainer>
                                    :
                                    null
                                }
                        </BodyContainer>
                        )
                    })}
            {/* </PreviewContainer2> */}
        </div>
        </PreviewContainer>
    )
}
 
export default Preview



// const Preview = (props) => {
    
//     return( 
//         <PreviewContainer2>
//             <PreviewContainer initial='initial' visibility={props.animationMap.preview[props.previewProps].opacity} transition='transition' animate={props.previewProps} variants={props.animationMap.preview}>
//                 <Container>
//                     {document.getElementById('add-content-title') ? 
//                     <Title font={props.font}>{document.getElementById('add-content-title').value}</Title>
//                     :
//                     null 
//                     }
//                     <div> 
//                     {props?.filesLarge[0] ? 
//                     <MainImage id='test'  width={props.isImageHorizontal ? '80vw' : 'auto'} height={props.isImageHorizontal ? 'auto' : '80vh'} alt='display' src={props?.filesLarge[0][0]}></MainImage>
//                     :
//                     null
//                     }
//                     <InfoContainer>
//                     <AddCollectionHeartContainer>
//                         <SubmitButton className='dropdown'>
//                             <div className='dropdown'>Add to collection</div>
//                         </SubmitButton>
//                         <FilledHeart style={{marginLeft: '10px'}} />
//                     </AddCollectionHeartContainer>
//                     <Author font={props.font}>{'Dan Richards'}</Author>
//                     <DateStyle font={props.font}>{moment(Date.now()).format('MMMM Do YYYY')}</DateStyle>
//                     </InfoContainer>
//                     </div>
//                 </Container> 
//                 {props.bodyContent.map((item, index) => {
//                     return(
//                         <BodyContainer margin='0px' key={index}>
//                             <Description font={props.font}>{item}</Description>
//                             <BodyImageContainer>
//                             {props?.bodyImages[index]?.map((image, i)=> {
//                                 return(
//                                     <BodyImage imageSizeRatioLength={props.imageSizeRatio[index].length} imageSizeRatio={props.imageSizeRatio[index][i]} bodyImages={props.bodyImages} i={i} image={image} index={index} key={i}></BodyImage>
//                                 )
//                             })}
//                             </BodyImageContainer>
//                         </BodyContainer>
//                     )
//                 })}
//             </PreviewContainer>
//         </PreviewContainer2>
//     )
// }