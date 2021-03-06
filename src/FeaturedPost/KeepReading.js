import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import PublicProfilePosts from '../PublicProfile/PublicProfilePosts'
import {
    PostsContainer,
    MoreFromContainer,
    ContentContainer,
    Container,
} from './KeepReading.styles'
import { Text } from '../Styles/GlobalStyles.styles'

const KeepReading = (props) => {

    const [postType, setPostType] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(()=> {
        if(props.photoInformation?.userID){
            db.collection('preview-posts')
            .orderBy('timestamp', 'desc')
            .where('userID', '==', props.photoInformation.userID)
            .limit(5)
            .get()
            .then(userData=> {
                let dataArray = []
                userData.forEach(item=> {
                    const data = item.data()
                    if(data.postID!==props.photoInformation.postID && dataArray.length < 4){
                        dataArray.push(data)
                    }
                })
                if(dataArray.length === 4) {
                    setPosts(dataArray)
                    setPostType(props.photoInformation.userID)
                }else{
                    db.collection('preview-posts')
                    .orderBy('ratio', 'desc')
                    .where('country', '==', props.photoInformation.country)
                    .limit(5)
                    .get()
                    .then(countryData=> {
                        let dataArray = []
                        countryData.forEach(item=> {
                            const data = item.data()
                            if(data.postID !== props.photoInformation.postID && dataArray.length < 4) {
                                dataArray.push(data)
                            }
                        })
                        if (dataArray.length===4) {
                            setPosts(dataArray)
                            setPostType(props.photoInformation.country)
                        }else{
                            db.collection('preview-posts')
                            .orderBy('ratio', 'desc')
                            .limit(5)
                            .get()
                            .then(countryData=> {
                                let dataArray = []
                                countryData.forEach(item=> {
                                    const data = item.data()
                                    if(data.postID !== props.photoInformation.postID && dataArray.length < 4) {
                                        dataArray.push(data)
                                    }
                                })
                                setPosts(dataArray)
                                setPostType('recommended')
                            })
                            .catch(err=>console.log(err))
                        }
                    })
                }
            })
            .catch(err=>console.log(err))

        }
    }, [props.photoInformation])

    return(
        <Container>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '32px'}}>
                <Text size='36px' weight='600'>Keep reading</Text>
            </div>
            <ContentContainer>
                {postType==='recommended' ? 
                <Text size='20px' weight='400'>Recommended for you</Text>
                :
                <MoreFromContainer>
                    <Text size='20px' weight='400'>More from</Text>
                    <Text size='20px' weight='600'>&nbsp;{props?.photoInformation?.username}</Text>
                </MoreFromContainer>
                }
                <PostsContainer>
                    {posts.map((post, index) => {
                        return(
                            <PublicProfilePosts setShowSpinner={props.setShowSpinner} marginTop='10px' height='150px' minWidth='80px' history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} post={post} key={index} />
                        )
                    })}
                </PostsContainer>
            </ContentContainer>
        </Container>
    )
}

export default KeepReading