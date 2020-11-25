import React, { useEffect } from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions'
import '../App.css'
import { 
    Image, 
    Container, 
    PhotoContainer,
    PhotoTitle,
    PhotoTextContainer,
    PhotoTextContainerCenter,
    PhotoLocation,
    SortSelect,
} from './GetPhotosHomepage.styles'
import macy from 'macy'

const DisplayPhoto = (props) => {

    useEffect(()=> { 
        props.grid()
        // eslint-disable-next-line
    }, [props.homePhotoInformation])

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

    const sort = () => {
        const e = document.getElementById('sort-photos')
        const value = e.options[e.selectedIndex].value
        if(value !== 'Sort by:') {
            db.collection('preview-posts').orderBy(value, 'desc')
            .get()
            .then(data=> {
                const photoArray = []
                data.docs.forEach(item=> {
                    photoArray.push(item.data())
                })
                setHomePhotoInformation([...photoArray])
            })
        }
    }

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
            trueOrder: true,
            breakAt: {
                1500: 3,
                520: 2,
                400: 1
            },
        })
    }
    return(
        <Container>
            <SortSelect id='sort-photos' onChange={()=>sort()}>
                <option defaultValue value='timestamp'>Newest</option>
                <option value='views'>Most popular</option>
            </SortSelect>
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
                            homePhotoInformation={props.homePhotoInformation}
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