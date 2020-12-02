import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions'
// import { useInView } from 'react-intersection-observer'
import '../App.css'
import { 
    Image, 
    Container, 
    PhotoContainer,
    PhotoTitle,
    PhotoTextContainer,
    PhotoLocation,
    LazyButtonContainer,
} from './GetPhotosHomepage.styles'
import Masonry from 'react-masonry-css'
import { SubmitButton, } from '../AddContent/AddContent.styles'

const DisplayPhoto = (props) => {

    const click = () => {
        // props.setPageRoute('PhotoFeatured')
        props.setPhotoInformation(props.photoInfo)
        props.getFeaturedPhotoInfo(props.photoInfo.id)
        db.collection('preview-posts').where('image', '==', props.photoInfo.image)
        .get()
        .then(reference=> {
            incrementViewCount(reference.docs[0].ref.id)
        })
    }

    let width = '30vw'
 
    return(
        <PhotoContainer onClick={click}>
            <PhotoTextContainer>
                <Image width={width} className='grid-item masonry' alt='' src={props.photoInfo.image}></Image>
                <PhotoTitle>{props.photoInfo.title}</PhotoTitle>                    
                <PhotoLocation>{`${props.photoInfo.city}, ${props.photoInfo.country}`}</PhotoLocation>
            </PhotoTextContainer>
        </PhotoContainer>
    )
}

const GetPhotos = (props) => {

    const { setHomePhotoInformation, homePhotoInformation} = props
    const [startAfter, setStartAfter] = useState(null)

    const lazy = () => {
        db.collection('preview-posts')
        .startAt(startAfter)
        .limit(15)
        .get()
        .then(snapshot => {
            setStartAfter(snapshot.docs[snapshot.docs.length-1])
            const photosArray = []
            snapshot.docs.forEach(doc => {
                photosArray.push(doc.data())
            })
            setHomePhotoInformation([...homePhotoInformation, ...photosArray])
            console.log('lazy')
        })
    }

    useEffect(()=>{
        window.scrollTo({top: 0})
        if(!homePhotoInformation){
            db.collection('preview-posts')
            .limit(17)
            .get()
            .then(snapshot => {
                setStartAfter(snapshot.docs[snapshot.docs.length-1])
                const photosArray = []
                snapshot.docs.forEach(doc => {
                    photosArray.push(doc.data())
                })
                setHomePhotoInformation(photosArray)
                console.log('running')
            })
        }
    }, [setHomePhotoInformation, homePhotoInformation])
    
    return(
        // <Container onLoad={startObserve}>
        <Container>
            <div style={{marginTop: '15px'}}></div>
            <div id="grid" className='masonry-container'>
            <Masonry
            breakpointCols={{default: 3, 700: 2}}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">

                {props.homePhotoInformation ? props.homePhotoInformation.map((photo, index)=> {
                    return(
                        <DisplayPhoto 
                            lazy={lazy}
                            index={index}
                            length={props.homePhotoInformation.length}
                            getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                            setPageRoute={props.setPageRoute} 
                            setPhotoInformation={props.setPhotoInformation} 
                            key={index} 
                            // grid={grid} 
                            photoInfo={photo} 
                            homePhotoInformation={props.homePhotoInformation}
                        />
                    )
                })
                :
                null}
            </Masonry>
            <LazyButtonContainer>
                <SubmitButton onClick={lazy}>Load more</SubmitButton>
            </LazyButtonContainer>
            </div>
        </Container>
    )
}

export default GetPhotos