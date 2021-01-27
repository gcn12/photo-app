import React from 'react'
import { Link } from 'react-router-dom'
import {
    BackgroundImage,
    ParagraphContainer,
    Title,
    Paragraph,
    ReadMoreButton,
    ImageContainer,
    Container,
} from './SingleLocation.styles'

const SingleLocation = (props) => {

    return(
        <Container>
            <ParagraphContainer leftSmall={props.leftSmall} topSmall={props.topSmall} top={props.top} left={props.left}>
                <Title>{props.title}</Title>
                <Paragraph>{props.paragraph}</Paragraph>
                <Link to='/photo-app/posts/popular' onClick={()=>props.goToPlacesPage(props.title)}>
                    <ReadMoreButton>Read More</ReadMoreButton>
                </Link>
            </ParagraphContainer>
            <ImageContainer background={props.background} backgroundSmall={props.backgroundSmall} >
                <BackgroundImage src={props.image} />
            </ImageContainer>
        </Container>
    )
}

export default SingleLocation