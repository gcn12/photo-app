import React, { useEffect, useState, Component } from 'react'
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
} from './MainPhotoDisplayVertical.styles'
import { SubmitButton, } from '../AddContent/AddContent.styles'
import { 
    Image,
    PhotoContainer,
    PhotoTitle,
    PhotoTextContainer,
    PhotoLocation,
    TextContainer,
    IndividualTextContainer,
} from './DisplayPhoto.styles'

const GetPhotos = (props) => {

    const { setHomePhotoInformation, homePhotoInformation } = props
    const [startAfter, setStartAfter] = useState(null)
    const [isLoadMore, setIsLoadMore] = useState(true)
    // eslint-disable-next-line
    const [observerVisible, setObserverVisible] = useState(false)

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
        .startAfter(startAfter)
        .limit(3)
        .get()
        .then(snapshot => {
            const photosArray = []
            snapshot.docs.forEach(doc => {
                console.log(doc.id)
                photosArray.push(doc.data())
            })
            if(photosArray.length > 0) {
                setStartAfter(snapshot.docs[snapshot.docs.length-1])
            }else{
                setIsLoadMore(false)
            }
            props.setHomePhotoInformation([...props.homePhotoInformation, ...photosArray])
        })
    }

    useEffect(()=>{
        // window.scrollTo({top: 0})
        if(!homePhotoInformation){
            db.collection('preview-posts')
            .orderBy('views', 'desc')
            .limit(3)
            .get()
            .then(snapshot => {
                const photosArray = []
                snapshot.docs.forEach(doc => {
                    console.log(doc.id)
                    photosArray.push(doc.data())
                })
                props.setHomePhotoInformation(photosArray)
                if(photosArray.length > 0) {
                    setStartAfter(snapshot.docs[snapshot.docs.length-1])
                }
                setHomePhotoInformation(photosArray)
                console.log('running')
            })
        }
    // }, [setHomePhotoInformation, homePhotoInformation])
    // eslint-disable-next-line
    }, [])

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
                        setObserverVisible={setObserverVisible}
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
                <div className="image-list">{images}</div>
            </Container>
            }
            {isLoadMore ? 
            <LoadMoreButtonContainer>
                <SubmitButton onClick={lazy}>Load more</SubmitButton>
            </LoadMoreButtonContainer>
            :
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div>You've reached the bottom</div>
            </div>
            }
            <div style={{margin: '30px'}}></div>
        </DisplayContainer>
       
       )
    }

export default GetPhotos

class ImageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {spans:0};
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.imageRef.current.addEventListener("load", this.setSpans)
        fitty(`#fitty-${this.props.index}`)
        fitty(`#fitty-location-${this.props.index}`)
        window.addEventListener("resize", ()=>setTimeout(()=> {
            if(this.imageRef.current) {
                const height = this.imageRef.current.clientHeight;
                const spans = Math.ceil(height) + 7;
                this.setState({ spans: spans });
                fitty(`#fitty-${this.props.index}`)
                fitty(`#fitty-location-${this.props.index}`)
            }
        }, 800))
    }

    componentWillUnmount() {
        this.imageRef.current.addEventListener("load", this.setSpans)
        window.addEventListener("resize", ()=>setTimeout(()=> {
            if(this.imageRef.current) {
                const height = this.imageRef.current.clientHeight;
                const spans = Math.ceil(height) + 7;
                this.setState({ spans: spans });
                fitty(`#fitty-${this.props.index}`)
                fitty(`#fitty-location-${this.props.index}`)
            }
        }, 750))
    }
     
    setSpans = () => { 
        const height = this.imageRef.current.clientHeight;
        const spans = Math.ceil(height) + 7;
        this.setState({ spans: spans });
    }

    click = () => {
        this.props.setPhotoInformation(this.props.photoInfo)
        this.props.getFeaturedPhotoInfo(this.props.photoInfo.url, this.props.photoInfo.username)
        this.props.history.push(`/photo-app/post/${this.props.photoInfo.username}/${this.props.photoInfo.url}`)
        db.collection('preview-posts').where('image', '==', this.props.photoInfo.image)
        .get()
        .then(reference=> {
            incrementViewCount(reference.docs[0].ref.id)
        }) 
    }

    imageLoaded = () => {
        if (this.props.index === this.props.photoLength - 1){
            // setTimeout(()=>this.props.setIsMainPhotosVisible(true), 1200)
            this.props.setIsMainPhotosVisible(true)
            this.props.setObserverVisible(true)
        }
    }
    
    render() {
        return( 
            <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
                <PhotoContainer onClick={this.click}>
                    <PhotoTextContainer>
                        <Image  onLoad={this.imageLoaded} className='masonry-image' ref={this.imageRef} src={this.props.photoInfo.image} alt='main display'  />
                        <TextContainer>
                            <IndividualTextContainer>
                                <PhotoTitle id={`fitty-${this.props.index}`}>{this.props.photoInfo.title}</PhotoTitle>
                            </IndividualTextContainer>
                            <IndividualTextContainer>
                                <PhotoLocation id={`fitty-location-${this.props.index}`}>{`${this.props.photoInfo.city}, ${this.props.photoInfo.country}`}</PhotoLocation>
                            </IndividualTextContainer>
                        </TextContainer>
                    </PhotoTextContainer>
                </PhotoContainer>
            </div>
        )
    }
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