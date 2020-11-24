import React, { useEffect } from 'react'
import { db } from '../Firebase'
import '../App.css'
import { 
    Image, 
    Container, 
    PhotoContainer,
    PhotoTitle,
    PhotoTextContainer,
    PhotoTextContainerCenter,
    PhotoLocation,
} from './GetPhotosHomepage.styles'
import macy from 'macy'

const DisplayPhoto = (props) => {
    useEffect(()=> { 
        props.grid()
        // eslint-disable-next-line  
    }, [])

    const click = () => {
        // props.setPageRoute('PhotoFeatured')
        props.setPhotoInformation(props.photoInfo)
        props.getFeaturedPhotoInfo(props.photoInfo.id)
    }

    let width = '30vw'

    return(
        <PhotoContainer onClick={click}>
            <Image width={width} className='grid-item' alt='' src={props.photoInfo.image}></Image>
            <PhotoTextContainer>
                <PhotoTextContainerCenter>
                    <PhotoTitle>{props.photoInfo.title}</PhotoTitle>
                    <PhotoLocation>{`${props.photoInfo.city}, ${props.photoInfo.country}`}</PhotoLocation>
                </PhotoTextContainerCenter>
            </PhotoTextContainer>
        </PhotoContainer>
    )
}

const GetPhotos = (props) => {

    const { setHomePhotoInformation, homePhotoInformation} = props

    useEffect(()=>{
        window.scrollTo({top: 0})
        if(!homePhotoInformation){
            const photoRef = db.collection('preview-posts')
            photoRef.get()
            .then(snapshot => {
                const photosArray = []
                snapshot.docs.forEach(doc => {
                    photosArray.push(doc.data())
                })
                setHomePhotoInformation(photosArray)
                console.log('running')
            })
        }
    }, [setHomePhotoInformation, homePhotoInformation])

    const grid = () => {
        var elem = document.getElementById('grid');
        macy ({
            container: elem,
            columns: 2,
            trueOrder: false,
            breakAt: {
                1500: 3,
                520: 2,
                400: 1
            },
        })
    }
    return(
        <Container>
            <div id="grid">
                {props.homePhotoInformation ? props.homePhotoInformation.map((photo, index)=> {
                    return(
                        <DisplayPhoto 
                            getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                            setPageRoute={props.setPageRoute} 
                            setPhotoInformation={props.setPhotoInformation} 
                            key={index} 
                            grid={grid} 
                            photoInfo={photo} 
                        />
                    )
                })
                :
                null}
            </div>
        </Container>
    )
}

export default GetPhotos