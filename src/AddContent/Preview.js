import React from 'react'
import moment from 'moment'
import {
    PreviewContainer,
    BodyImagePreview,
} from './Preview.styles'
import { SubmitButton } from '../AddContent/AddContentAnimationTest.styles'
import {
    Title,
    Description,
    Image,
    Author,
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
            const image = document.getElementById(`body-photo-${props.index}`)
            image.src = e.target.result
            // props.setMainImage(e.target.result)
        }
        viewFile.readAsDataURL(file)
        console.log(65 / (props.bodyImages[props.index] ? props.bodyImages[props.index].length : 1))
    }

    image()

    return(
        <BodyImagePreview id={`body-photo-${props.i}`} width={65 / (props.bodyImages[props.index] ? props.bodyImages[props.index].length : 1)} ></BodyImagePreview>
        // <BodyImagePreview id={`body-photo-${props.index}`} width={30} ></BodyImagePreview>
    )
}

const Preview = (props) => {

    return(
        <PreviewContainer initial='initial' visibility={props.animationMap.preview[props.previewProps].opacity} transition='transition' animate={props.previewProps} variants={props.animationMap.preview}>
            <Container>
                {document.getElementById('add-content-title') ? 
                <Title>{document.getElementById('add-content-title').value}</Title>
                :
                null
                }
                <Image id='test' alt='display' src={props?.mainImage}></Image>
                <InfoContainer>
 
                <SubmitButton className='dropdown'>
                    <div className='dropdown'>Add to collection</div>
                </SubmitButton>
                <Author>{'Dan Richards'}</Author>
                <Author>{moment(Date.now()).format('MMMM Do YYYY')}</Author>
                </InfoContainer>
            </Container>
            {props.bodyContent.map((item, index) => {
                return(
                    <BodyContainer key={index}>
                        <Description>{item}</Description>
                        <BodyImageContainer>
                        {props?.bodyImages[index].map((image, i)=> {
                            return(
                                <BodyImage bodyImages={props.bodyImages} i={i} image={image} index={index} key={i}></BodyImage>
                            )
                        })}
                        </BodyImageContainer>
                    </BodyContainer>
                )
            })}
        </PreviewContainer>
    )
}
 
export default Preview