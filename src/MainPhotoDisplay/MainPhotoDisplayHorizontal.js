import React, { useEffect, useState } from 'react'
import fitty from 'fitty'
import { db } from '../Firebase'
import PhotoDescriptionView from './PhotoDescriptionView'
import '../App.css'
import { incrementViewCount } from '../Functions'
import { 
    Container, 
    PhotoDescriptionViewContainer,
    DisplayContainer,
    LoadMoreButtonContainer,
    PhotoContainer,
    PhotoTitle,
    PhotoLocation,
    Image,
} from './MainPhotoDisplayHorizontal.styles'
import { SubmitButton, } from '../AddContent/AddContent.styles'
import { 
    PhotoTextContainer,
    TextContainer,
    IndividualTextContainer,
} from './DisplayPhoto.styles'

const GetPhotos = (props) => {
    // eslint-disable-next-line
    const { setHomePhotoInformation, homePhotoInformation } = props
    const [startAfter, setStartAfter] = useState(null)
    // eslint-disable-next-line
    const [observerVisible, setObserverVisible] = useState(false)
    // eslint-disable-next-line
    const [randomString, setRandomString] = useState('')
    
    // const lazy2 = () => {
    //     db.collection('preview-posts')
    //     .startAfter(startAfter)
    //     .limit(2)
    //     .get()
    //     .then(snapshot => {
    //         setStartAfter(snapshot.docs[snapshot.docs.length-1].ref)
    //         const photosArray = []
    //         snapshot.docs.forEach(doc => {
    //             photosArray.push(doc.data())
    //         })
    //         setHomePhotoInformation([...homePhotoInformation, ...photosArray])
    //         console.log('lazy')
    //     })
    // }

    const lazy = () => {
        // window.scrollTo({top: 0})
        db.collection('preview-posts')
        .orderBy('views', 'desc')
        // .where('id', '>=', randomString)
        .startAfter(startAfter)
        .limit(5)
        .get()
        .then(snapshot => {
            const photosArray = []
            snapshot.docs.forEach(doc => {
                console.log(doc.id)
                photosArray.push(doc.data())
            })
            if(photosArray.length > 0) {
                setStartAfter(snapshot.docs[snapshot.docs.length-1].id)
            }
            if(photosArray.length===0) {
                db.collection('preview-posts')
                .orderBy('id', 'asc')
                .where('id', '<=', randomString)
                .limit(15)
                .get()
                .then(snapshot => {
                    const photosArray = []
                    snapshot.docs.forEach(doc => {
                        console.log(doc.id)
                        photosArray.push(doc.data())
                    })
                    if(photosArray.length === 10) {
                        setStartAfter(snapshot.docs[snapshot.docs.length-1])
                    }
                    setTimeout(()=> props.setHomePhotoInformation([...props.homePhotoInformation, ...photosArray]), 700)
                    // props.setHomePhotoInformation(photosArray)
                })
            }else{
                props.setHomePhotoInformation([...props.homePhotoInformation, ...photosArray])
            }
        })
    }

    // useEffect(()=>{
    //     // window.scrollTo({top: 0})
    //     let randomStringText = ''
    //     const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
    //     for (let i = 0; i < 8; i++) {
    //         randomStringText += values[Math.floor(Math.random() * 62)]
    //     }
    //     setRandomString(randomStringText)
    //     // eslint-disable-next-line
    //     if(!homePhotoInformation){
    //         db.collection('preview-posts')
    //         .orderBy('views', 'desc')
    //         // .where('id', '<=', randomStringText)
    //         .limit(15)
    //         .get()
    //         .then(snapshot => {
    //             const photosArray = []
    //             snapshot.docs.forEach(doc => {
    //                 console.log(doc.id)
    //                 photosArray.push(doc.data())
    //             })
    //             // if(photosArray.length===0) {
    //         //     db.collection('preview-posts')
    //         //     .orderBy('id', 'asc')
    //         //     .where('id', '<=', randomString)
    //         //     .limit(5)
    //         //     .get()
    //         //     .then(snapshot => {
    //         //         const photosArray = []
    //         //         snapshot.docs.forEach(doc => {
    //         //             console.log(doc.id)
    //         //             photosArray.push(doc.data())
    //         //         })
    //         //         if(photosArray.length === 10) {
    //         //             setStartAfter(snapshot.docs[snapshot.docs.length-1])
    //         //         }
    //         //         setTimeout(()=> props.setHomePhotoInformation([...props.homePhotoInformation, ...photosArray]), 700)
    //         //         // props.setHomePhotoInformation(photosArray)
    //         //     })
    //         // }else{
    //             // eslint-disable-next-line
    //             props.setHomePhotoInformation(photosArray)
    //         // }
    //             if(photosArray.length > 0) {
    //                 setStartAfter(snapshot.docs[snapshot.docs.length-1].id)
    //             }
    //             // eslint-disable-next-line
    //             setHomePhotoInformation(photosArray)
    //             console.log('running')
    //         })
    //     }
    // // }, [setHomePhotoInformation, homePhotoInformation])
    // }, [])

    const images = props?.homePhotoInformation?.map((photo, index) => {
        return <ImageCard
            setObserverVisible={setObserverVisible}
            setIsMainPhotosVisible={props.setIsMainPhotosVisible}
            key={index} 
            photoInfo={photo} 
            history={props.history}
            lazy={lazy}
            index={index}
            photoLength={props.homePhotoInformation.length}
            getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
            setPhotoInformation={props.setPhotoInformation} 
            homePhotoInformation={props.homePhotoInformation}
        />;
    });

    return(
        <DisplayContainer opacity={props.isMainPhotosVisible ? 1 : 0} style={{marginTop: '110px'}}>
            {props.displayView ? 
            <PhotoDescriptionViewContainer>
                {props.homePhotoInformation ? props.homePhotoInformation.map((photo, index)=> {
                    return( 
                        <PhotoDescriptionView 
                        setIsMainPhotosVisible={props.setIsMainPhotosVisible}
                        history={props.history}
                        lazy={lazy}
                        index={index}
                        photoLength={props.homePhotoInformation.length}
                        getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                        setPhotoInformation={props.setPhotoInformation} 
                        key={index} 
                        photoInfo={photo} 
                        homePhotoInformation={props.homePhotoInformation}
                        />
                    )
                })
                :
                null
                }
            </PhotoDescriptionViewContainer>
            :
            <Container>
                <div style={{display: 'flex', flexWrap: 'wrap'}} className="image-list">{images}</div>
                    {/* <div ref={ref}> */}
                        {/* {console.log(inView)} */}
                    {/* </div> */}
                {/* <div style={{display: observerVisible ? 'initial' : 'none', visibility: observerVisible ? 'visible' : 'none'}}>
                    <h2>Plain children are always rendered. Use onChange to monitor state.</h2>
                <InView  as="div" onChange={observerVisible ? lazy : null}>
                </InView>
                </div> */}
            </Container>
            }
            <LoadMoreButtonContainer>
                <SubmitButton onClick={lazy}>Load more</SubmitButton>
            </LoadMoreButtonContainer>
            <div style={{margin: '30px'}}></div>
        </DisplayContainer>
       
       )
    }

export default GetPhotos

const ImageCard = (props) => {

    useEffect(()=>{
        fitty(`#fitty-${props.index}`)
        fitty(`#fitty-location-${props.index}`)
    })
    window.addEventListener("resize", ()=>setTimeout(()=> {
        fitty(`#fitty-${props.index}`)
        fitty(`#fitty-location-${props.index}`)
    }, 800))

    const click = () => {
        props.setPhotoInformation(props.photoInfo)
        props.getFeaturedPhotoInfo(props.photoInfo.url, props.photoInfo.username)
        props.history.push(`/photo-app/post/${props.photoInfo.username}/${props.photoInfo.url}`)
        db.collection('preview-posts').where('image', '==', props.photoInfo.image)
        .get()
        .then(reference=> {
            incrementViewCount(reference.docs[0].ref.id)
        }) 
    }

    const imageLoaded = () => {
        if (props.index === props.photoLength - 1){
            // setTimeout(()=>this.props.setIsMainPhotosVisible(true), 1200)
            props.setIsMainPhotosVisible(true)
            props.setObserverVisible(true)
        }
    }
    
    return( 
        <PhotoContainer onClick={click}>
            <PhotoTextContainer>
                <Image  onLoad={imageLoaded} className='masonry-image' src={props.photoInfo.image} alt='main display'  />
                <TextContainer>
                    <IndividualTextContainer>
                        <PhotoTitle id={`fitty-${props.index}`}>{props.photoInfo.title}</PhotoTitle>
                    </IndividualTextContainer>
                    <IndividualTextContainer>
                        <PhotoLocation id={`fitty-location-${props.index}`}>{`${props.photoInfo.city}, ${props.photoInfo.country}`}</PhotoLocation>
                    </IndividualTextContainer>
                </TextContainer>
            </PhotoTextContainer>
        </PhotoContainer>
    )
}





// useEffect(()=>{
//     // window.scrollTo({top: 0})
//     let randomStringText = ''
//     const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
//     for (let i = 0; i < 8; i++) {
//         randomStringText += values[Math.floor(Math.random() * 62)]
//     }
//     setRandomString(randomStringText)
//     if(!homePhotoInformation){
//         db.collection('preview-posts')
//         .orderBy('id', 'asc')
//         .where('id', '<=', randomStringText)
//         .limit(10)
//         .get()
//         .then(snapshot => {
//             const photosArray = []
//             snapshot.docs.forEach(doc => {
//                 console.log(doc.id)
//                 photosArray.push(doc.data())
//             })
//             // if(photosArray.length===0) {
//         //     db.collection('preview-posts')
//         //     .orderBy('id', 'asc')
//         //     .where('id', '<=', randomString)
//         //     .limit(5)
//         //     .get()
//         //     .then(snapshot => {
//         //         const photosArray = []
//         //         snapshot.docs.forEach(doc => {
//         //             console.log(doc.id)
//         //             photosArray.push(doc.data())
//         //         })
//         //         if(photosArray.length === 10) {
//         //             setStartAfter(snapshot.docs[snapshot.docs.length-1])
//         //         }
//         //         setTimeout(()=> props.setHomePhotoInformation([...props.homePhotoInformation, ...photosArray]), 700)
//         //         // props.setHomePhotoInformation(photosArray)
//         //     })
//         // }else{
//             props.setHomePhotoInformation([...props.homePhotoInformation, ...photosArray])
//         // }
//             if(photosArray.length > 0) {
//                 setStartAfter(snapshot.docs[snapshot.docs.length-1].id)
//             }
//             setHomePhotoInformation(photosArray)
//             console.log('running')
//         })
//     }
// // }, [setHomePhotoInformation, homePhotoInformation])
// }, [])