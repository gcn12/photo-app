import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    isVisible,
    isPostVisible,
} from '../Redux/Actions/featuredPostActions'
import {
    Container,
    Image,
    Title,
    Location,
} from './PublicProfilesPosts.styles'

const PublicProfilesPosts = (props) => {

    const [isProfilePostVisible, setIsProfilePostVisible] = useState(false)

    const selectPhoto = () => {
        props.dispatch(isPostVisible(false))
        props.dispatch(isVisible(false))
        props.getFeaturedPhotoInfo(props.post.postID)
        // props.history.push(`/photo-app/post/${props.post.postID}`)
    }

    return(
        <Container visibility={isProfilePostVisible ? 1 : 0} >
            <Image height={props.height} minWidth={props.minWidth} onClick={selectPhoto} onLoad={()=> setIsProfilePostVisible(true)} src={props.post.smallImage} alt=''></Image>
            <Title onClick={selectPhoto}>{props.post.title}</Title>
            <Location>{`${props.post.city}, ${props.post.country}`}</Location>
            {/* <Title>{props.post.previewDescription}</Title> */}
        </Container>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(PublicProfilesPosts)