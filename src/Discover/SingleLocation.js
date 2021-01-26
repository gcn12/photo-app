import React from 'react'
import { Link } from 'react-router-dom'
import {
    BackgroundImage,
    ParagraphContainer,
    Title,
    Paragraph,
    ReadMoreButton,
    ImageContainer,
} from './SingleLocation.styles'

const SingleLocation = (props) => {

    return(
        <div style={{position: 'relative'}}>
            <ParagraphContainer top={props.top} left={props.left}>
                <Title>{props.title}</Title>
                <Paragraph>{props.paragraph}</Paragraph>
                <Link to='/photo-app/posts/popular' onClick={()=>props.goToPlacesPage(props.title)}>
                    <ReadMoreButton>Read More</ReadMoreButton>
                </Link>
            </ParagraphContainer>
            <ImageContainer background={props.background}>
                <BackgroundImage src={props.image} />
            </ImageContainer>
        </div>
    )
}

export default SingleLocation