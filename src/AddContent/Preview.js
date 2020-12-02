import React from 'react'
import moment from 'moment'
import {
    PreviewContainer,
    BodyImagePreview,
    PreviewContainer2,
} from './Preview.styles'
import { SubmitButton } from './AddContent.styles'
import {
    Author,
    Title,
    Description,
    MainImage,
    Container,
    InfoContainer,
    BodyContainer,
    BodyImageContainer,
    // Container2,
    // Container3,
} from '../FeaturedPost/FeaturedPost.styles'

const BodyImage = (props) => {

    const image = () => {
        const viewFile = new FileReader()
        const file = props.image
        viewFile.onload = (e) => {
            const image = document.getElementById(`body-photo-${props.index}-${props.i}`)
            image.src = e.target.result
        }
        viewFile.readAsDataURL(file)
    }

    image()

    // console.log(65 * props.imageSizeRatio)
    // console.log(props.image)
    return(
        // <BodyImagePreview id={`body-photo-${props.index}-${props.i}`} width={65 / (props.bodyImages[props.index] ? props.bodyImages[props.index].length : 1)} ></BodyImagePreview>
        // <BodyImagePreview id={`body-photo-${props.index}-${props.index}`} ></BodyImagePreview>
        <BodyImagePreview id={`body-photo-${props.index}-${props.i}`} width={65 * props.imageSizeRatio} ></BodyImagePreview>
    )
}

const Preview = (props) => {
    
    return( 
        <PreviewContainer2>
        {/* {console.log(props.imageSizeRatio)} */}

            <PreviewContainer initial='initial' visibility={props.animationMap.preview[props.previewProps].opacity} transition='transition' animate={props.previewProps} variants={props.animationMap.preview}>
                <Container>
                    {document.getElementById('add-content-title') ? 
                    <Title font={props.font}>{document.getElementById('add-content-title').value}</Title>
                    :
                    null
                    }
                    <div> 
                    <MainImage id='test'  width={props.isImageHorizontal ? '80vw' : 'auto'} height={props.isImageHorizontal ? 'auto' : '80vh'} alt='display' src={props?.mainImage}></MainImage>
                    <InfoContainer>
    
                    <SubmitButton className='dropdown'>
                        <div className='dropdown'>Add to collection</div>
                    </SubmitButton>
                    <Author font={props.font}>{'Dan Richards'}</Author>
                    <Author font={props.font}>{moment(Date.now()).format('MMMM Do YYYY')}</Author>
                    </InfoContainer>
                    </div>
                </Container> 
                {props.bodyContent.map((item, index) => {
                    // console.log(item)
                    return(
                        <BodyContainer margin='35px' key={index}>
                            <Description font={props.font}>{item}</Description>
                            <BodyImageContainer>
                            {props?.bodyImages[index]?.map((image, i)=> {
                                return(
                                    <BodyImage imageSizeRatio={props.imageSizeRatio[index][i]} bodyImages={props.bodyImages} i={i} image={image} index={index} key={i}></BodyImage>
                                )
                            })}
                            </BodyImageContainer>
                        </BodyContainer>
                    )
                })}
            </PreviewContainer>
        </PreviewContainer2>
    )
}
 
export default Preview