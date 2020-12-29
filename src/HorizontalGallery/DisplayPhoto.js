import React from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions'
import { connect } from 'react-redux'
import { collectionsList } from '../Redux/Actions/featuredPostActions'
import { 
    Image,
} from './HorizontalGallery.styles'

const DisplayPhoto = (props) => {

    const selectPhoto = () => {
        // props.getPost(props.info.id)
        props.dispatch(collectionsList([]))
        props.getFeaturedPhotoInfo(props.info.url, props.info.username)
        db.collection('preview-posts')
        .where('image', '==', props.url)
        .where('username', '==', props.username)
        .get()
        .then(reference=> {
            incrementViewCount(reference.docs[0].ref.id)
        })
    }

    return(
        <div>
            <Image onClick={selectPhoto} className='grid-item' alt='' src={props.url}></Image>
        </div>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(DisplayPhoto)