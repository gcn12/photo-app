import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { db } from '../Firebase'
import PublicProfilesPosts from '../PublicProfile/PublicProfilePosts'
import {
    Title,
    Container,
    PostsContainer,
} from './CollectionsComponent.styles'

const CollectionsComponent = (props) => {

    const [collectionImages, setCollectionImages] = useState([])

    useEffect(()=> {
        if(props.user){
            db.collection('users')
            .doc(props.user)
            .collection('collections')
            .orderBy('timestamp', 'desc')
            .where('collectionUrl', '==', props.match.params.collectionName)
            .get()
            .then(data=> {
                let imageArray = []
                data.forEach(item=> {
                    imageArray.push(item.data())
                })
                setCollectionImages(imageArray)
            })
            .catch(err=> console.log(err))
        }
        // eslint-disable-next-line
    }, [props.user])

    return(
        <Container>
            <Title>{collectionImages[0]?.collection}</Title>
            <PostsContainer>
                {collectionImages.map((post, index) => {
                    return(
                        <div key={index} style={{textDecoration: 'none'}}> 
                            <PublicProfilesPosts marginTop='30px' history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} post={post} />
                        </div>
                    )
                })}
            </PostsContainer>
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
})

export default connect(mapStateToProps)(CollectionsComponent)