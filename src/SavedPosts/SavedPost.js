import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
// import { ReactComponent as TrashCan } from '../Icons/TrashCan.svg'
import {
    Container,
    Image,
    Title,
    Description,
    ImageTextContainer,
    More,
} from './SavedPost.styles'

const SavedPost = (props) => {

    const [isVisible, setIsVisible] = useState(false)

    return(
        <Container opacity={isVisible ? 1 : 0}>
            <ImageTextContainer>
            <Link to={`/photo-app/post/${props.post.username}/${props.post.url}`}>
                <Image onLoad={()=>setIsVisible(true)} src={props.post.image} />
            </Link>
            <div style={{display: 'flex', alignItems: 'start'}}>
                <div>
                    <Link to={`/photo-app/post/${props.post.username}/${props.post.url}`} style={{textDecoration: 'none'}}>
                        <Title>{props.post.title}</Title>
                    </Link>
                    {/* <Description>{`${props.post.city}, ${props.post.country}`}</Description> */}
                    <Description>{props.post.previewDescription}</Description>
                </div>
                <More>&#8942;</More>
            </div>
                {/* <TrashCan style={{height: '50px', width: '50px'}} /> */}
            </ImageTextContainer>
        </Container>
    )
}

export default SavedPost