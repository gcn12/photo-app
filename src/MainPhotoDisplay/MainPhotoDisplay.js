import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import DisplayPhoto from './DisplayPhoto'
import PhotoDescriptionView from './PhotoDescriptionView'
// import { useInView } from 'react-intersection-observer'
import '../App.css'
import { 
    Container, 
    LazyButtonContainer,
    PhotoDescriptionViewContainer,
} from './MainPhotoDisplay.styles'
import Masonry from 'react-masonry-css'
import { SubmitButton, } from '../AddContent/AddContent.styles'



const GetPhotos = (props) => {

    const { setHomePhotoInformation, homePhotoInformation } = props
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
            .limit(28)
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
        <div>
            {props.displayView ? 
            <PhotoDescriptionViewContainer>
                {props.homePhotoInformation ? props.homePhotoInformation.map((photo, index)=> {
                    return( 
                        <PhotoDescriptionView 
                        history={props.history}
                        lazy={lazy}
                        index={index}
                        length={props.homePhotoInformation.length}
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
                <div style={{marginTop: '15px'}}></div>
                <div id="grid" className='masonry-container'>
                <Masonry
                // breakpointCols={{default: 3, 700: 2}}
                breakpointCols={{default: 4, 1000: 3, 700: 2}}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">

                    {props.homePhotoInformation ? props.homePhotoInformation.map((photo, index)=> {
                        return(
                            <DisplayPhoto 
                                history={props.history}
                                lazy={lazy}
                                index={index}
                                length={props.homePhotoInformation.length}
                                getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
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
            }
        </div>
       
       )
    }

export default GetPhotos

 