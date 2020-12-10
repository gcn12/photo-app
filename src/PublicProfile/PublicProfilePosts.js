import React from 'react'
import {
    Container,
    Image,
    Title,
} from './PublicProfilesPosts.styles'

const PublicProfilesPosts = (props) => {

    const selectPhoto = () => {
        props.getFeaturedPhotoInfo(props.post.url, props.post.username)
        props.history.push(`/photo-app/post/${props.post.username}/${props.post.url}`)
    }

    return(
        <Container onClick={selectPhoto}>
            <Image src={props.post.image} alt=''></Image>
            <Title>{props.post.title}</Title>
            <Title>{`${props.post.city}, ${props.post.country}`}</Title>
            {/* <Title>{props.post.previewDescription}</Title> */}
        </Container>
    )
}

export default PublicProfilesPosts