import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    isVisible,
    isPostVisible,
} from '../Redux/Actions/featuredPostActions'
import {
    Container,
    Image,
    Title,
} from './PublicProfilesPosts.styles'
import { Text } from '../Styles/GlobalStyles.styles'

const PublicProfilesPosts = (props) => {

    const [isProfilePostVisible, setIsProfilePostVisible] = useState(false)

    const selectPhoto = () => {
        props.dispatch(isPostVisible(false))
        props.dispatch(isVisible(false))
        props.getFeaturedPhotoInfo(props.post.postID)
    }

    return(
        <Container marginTop={props.marginTop} visibility={isProfilePostVisible ? 1 : 0} >
            <Link onClick={selectPhoto} to={`/photo-app/post/${props.post.postID}`}>
                <Image minWidth={props.minWidth} onLoad={()=> setIsProfilePostVisible(true)} src={props.post.smallImage} alt=''></Image>
            </Link>
            <Link to={`/photo-app/post/${props.post.postID}`} onClick={selectPhoto} style={{textDecoration: 'none'}}>
                <Title>{props.post.title}</Title>
            </Link>
            <Text size='16px'>{props.post.location}</Text>
        </Container>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(PublicProfilesPosts)