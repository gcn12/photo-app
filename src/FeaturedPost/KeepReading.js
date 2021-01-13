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
    const [countries, setCountries] = useState([])
    const [userPosts, setUserPosts] = useState([])

    useEffect(()=> {
        if(props.photoInformation?.userID){
            // db.collection('preview-posts')
            // .orderBy('ratio', 'desc')
            // .where('city', '==', props.photoInformation.city)
            // .limit(4)
            // .get()
            // .then(cityData=> {
            //     let cityArray = []
            //     cityData.forEach(item=> {
            //         cityArray.push(item.data())
            //     })
            //     setCities(cityArray)
            // })
            // .catch(err=>console.log(err))

            db.collection('preview-posts')
            .orderBy('ratio', 'desc')
            .where('country', '==', props.photoInformation.country)
            .limit(5)
            .get()
            .then(countryData=> {
                let countryArray = []
                countryData.forEach(item=> {
                    const data = item.data()
                    if(data.postID !== props.photoInformation.postID && countryArray.length < 4) {
                        countryArray.push(data)
                    }
                })
                if(countryArray.length === 4) {
                    setCountries(countryArray)
                }else{
                    db.collection('preview-posts')
                    .orderBy('ratio', 'desc')
                    .limit(5)
                    .get()
                    .then(countryData=> {
                        let countryArray = []
                        countryData.forEach(item=> {
                            const data = item.data()
                            if(data.postID !== props.photoInformation.postID && countryArray.length < 4) {
                                countryArray.push(data)
                            }
                        })
                        setCountries(countryArray)
                    })
                }
            })
            .catch(err=>console.log(err))

            db.collection('preview-posts')
            .orderBy('timestamp', 'desc')
            .where('userID', '==', props.photoInformation.userID)
            .limit(5)
            .get()
            .then(userData=> {
                let userArray = []
                userData.forEach(item=> {
                    const data = item.data()
                    if(data.postID!==props.photoInformation.postID && userArray.length < 4){
                        userArray.push(data)
                    }
                })
                setUserPosts(userArray)
            })
            .catch(err=>console.log(err))
        }
    }, [props.photoInformation])

    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '40px'}}>
                <Text size='40px' weight='600'>Keep reading</Text>
            </div>
            {userPosts.length === 4 ? 
            <ContentContainer>
                <MoreFromContainer>
                    <Text size='20px' weight='400'>More from</Text>
                    <Text size='20px' weight='600'>&nbsp;{props?.photoInformation?.username}</Text>
                </MoreFromContainer>
                {/* <div style={{display: 'flex', justifyContent: 'center'}}> */}
                    <PostsContainer>
                        {userPosts.map((post, index) => {
                            return(
                                <PublicProfilePosts height='150px' minWidth='80px' history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} post={post} key={index} />
                            )
                        })}
                    </PostsContainer>
                {/* </div> */}
            </ContentContainer>
            :
            null
            }
            {countries.length === 4 ?
            <ContentContainer>
                <MoreFromContainer>
                    <Text size='20px' weight='400'>More from</Text>
                    <Text size='20px' weight='600'>&nbsp;{props?.photoInformation?.country}</Text>
                </MoreFromContainer>
                <PostsContainer>
                    {countries.map((country, index) => {
                        return(
                            <PublicProfilePosts height='150px' minWidth='100px' history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} post={country} key={index} />
                        )
                    })}
                </PostsContainer>
            </ContentContainer>
            :
            null
            }
            {/* {cities.length > 0 ? 
            <div style={{margin: '0 10% 20px 10%'}}>
                <div style={{display: 'flex'}}>
                    <Text size='20px' weight='400'>More from</Text>
                    <Text size='20px' weight='600'>&nbsp;{props?.photoInformation?.city}</Text>
                </div>
                <PostsContainer>
                    {cities.map((city, index) => {
                        return(
                            <PublicProfilePosts height='150px' minWidth='100px' history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} post={city} key={index} />
                        )
                    })}
                </PostsContainer>
            </div>
            :
            null
            } */}
        </div>
    )
}

export default KeepReading