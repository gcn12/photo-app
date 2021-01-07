import React, { useState } from 'react'
import {
    Container,
    Image,
    Title,
    Location,
} from './PublicProfilesPosts.styles'

const PublicProfilesPosts = (props) => {

    const [isVisible, setIsVisible] = useState(false)

    const selectPhoto = () => {
        props.getFeaturedPhotoInfo(props.post.url, props.post.username)
        props.history.push(`/photo-app/post/${props.post.username}/${props.post.url}`)
    }

    return(
        <Container visibility={isVisible ? 1 : 0} onClick={selectPhoto}>
            <Image onLoad={()=> setIsVisible(true)} src={props.post.smallImage} alt=''></Image>
            <Title>{props.post.title}</Title>
            <Location>{`${props.post.city}, ${props.post.country}`}</Location>
            {/* <Title>{props.post.previewDescription}</Title> */}
        </Container>
    )
}

export default PublicProfilesPosts