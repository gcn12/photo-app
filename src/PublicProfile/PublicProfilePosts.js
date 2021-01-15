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
    Location,
} from './PublicProfilesPosts.styles'

const PublicProfilesPosts = (props) => {

    const [isProfilePostVisible, setIsProfilePostVisible] = useState(false)

    const selectPhoto = () => {
        if(props.setShowSpinner) {
            props.setShowSpinner(true)
        }
        props.dispatch(isPostVisible(false))
        props.dispatch(isVisible(false))
        props.getFeaturedPhotoInfo(props.post.postID)
        // props.history.push(`/photo-app/post/${props.post.postID}`)
    }

    return(
        <Container marginTop={props.marginTop} visibility={isProfilePostVisible ? 1 : 0} >
            <Link onClick={selectPhoto} to={`/photo-app/post/${props.post.postID}`}>
                <Image height={props.height} minWidth={props.minWidth}  onLoad={()=> setIsProfilePostVisible(true)} src={props.post.smallImage} alt=''></Image>
            </Link>
            <Link to={`/photo-app/post/${props.post.postID}`} style={{textDecoration: 'none'}}>
                <Title onClick={selectPhoto}>{props.post.title}</Title>
            </Link>
            <Location>{props.post.location}</Location>
            {/* <Title>{props.post.previewDescription}</Title> */}
        </Container>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(PublicProfilesPosts)