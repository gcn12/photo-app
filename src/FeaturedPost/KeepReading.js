import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import PublicProfilePosts from '../PublicProfile/PublicProfilePosts'
import {
    PostsContainer,
    Text,
    MoreFromContainer,
    ContentContainer,
} from './KeepReading.styles'

const KeepReading = (props) => {

    // const [cities, setCities] = useState([])
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
                    .where('country', '==', props.photoInformation.locationArray[props.photoInformation.locationArray.length-1])
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
                            setPostType(props.photoInformation.locationArray[props.photoInformation.locationArray.length-1])
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
        <div>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '40px'}}>
                <Text size='40px' weight='600'>Keep reading</Text>
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
                {/* <div style={{display: 'flex', justifyContent: 'center'}}> */}
                    <PostsContainer>
                        {posts.map((post, index) => {
                            return(
                                <PublicProfilePosts setShowSpinner={props.setShowSpinner} marginTop='10px' height='150px' minWidth='80px' history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} post={post} key={index} />
                            )
                        })}
                    </PostsContainer>
                {/* </div> */}
            </ContentContainer>
        </div>
    )
}

export default KeepReading