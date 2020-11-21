import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import { 
    Title
} from '../UserPosts/UserPosts.styles'
import { 
    Image,
    ImagesContainer,
    Container,
} from './Collections.styles'


const Collection = (props) => {
    const getPhotos = () => {
        db.collection('users')
        .doc(props.user)
        .collection('collections')
        .doc(props.collection[0])
        .collection(props.collection[0])
        .get()
        .then(data=> {
            const array = []
            data.docs.forEach(doc=> {
                array.push(doc.data())
            })
            props.setHomePhotoInformation(array)
            props.setPageRoute('GetPhotos')
        })
    }
    const items = props.collection[1].length
    const { collection } = props
    
    
    return(
        <div>
            <Title>{props.collection[0]}</Title>
            <ImagesContainer onClick={getPhotos}>
                <Image height={dimensionsMap[items].height[1]} width={dimensionsMap[items].width[1]} src={collection[1][0]} key='1' alt='placeholder' />
                <Image height={dimensionsMap[items].height[2]} width={dimensionsMap[items].width[2]} src={collection[1][1]} key='2' alt='placeholder' />
                <Image height={dimensionsMap[items].height[3]} width={dimensionsMap[items].width[3]} src={collection[1][2]} key='3' alt='placeholder' />
                <Image height={dimensionsMap[items].height[4]} width={dimensionsMap[items].width[4]} src={collection[1][3]} key='4' alt='placeholder' />
            </ImagesContainer>
        </div>
    )
}

const Collections = (props) => {

    const [collectionInfo, setCollectionInfo] = useState(null)

    const getCollections = () => {
        if(props.user) {    
            db.collection('users')
            .doc(props.user)
            .get()
            .then(collections=> {
                setCollectionInfo(Object.entries(collections.data()))
            })
        }
    }

    useEffect(getCollections, [props.user])

    return(
        <Container>
            {collectionInfo?.map((collection, index)=> {
                return(
                    <Collection user={props.user} setHomePhotoInformation={props.setHomePhotoInformation} setPageRoute={props.setPageRoute} collection={collection} key={index}/>
                )
            })}
        </Container>
    )
}

const large = 270
const small = 135

const dimensionsMap = {
    1: {
        height: {
            1: large,
        },
        width: {
            1: large
        }
    },
    2: {
        height: {
            1: small,
            2: small,
        },
        width: {
            1: large,
            2: large
        }
    },
    3: {
        height: {
            1: small,
            2: small,
            3: small
        },
        width: {
            1: small,
            2: small,
            3: large
        }
    },
    4: {
        height: {
            1: small,
            2: small,
            3: small,
            4: small
        },
        width: {
            1: small,
            2: small,
            3: small,
            4: small,
        }
    },
}

export default Collections