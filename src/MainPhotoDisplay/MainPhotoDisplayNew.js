import React, { useEffect, useState, Component } from 'react'
import { db } from '../Firebase'
import PhotoDescriptionView from './PhotoDescriptionView'
import '../App.css'
import { incrementViewCount } from '../Functions'
import { 
    Container, 
    PhotoDescriptionViewContainer,
} from './MainPhotoDisplay.styles'
import { SubmitButton, } from '../AddContent/AddContent.styles'
import { 
    Image,
    PhotoContainer,
    PhotoTitle,
    PhotoTextContainer,
    PhotoLocation,
    TextContainer,
} from './DisplayPhoto.styles'

const GetPhotos = (props) => {

    const { setHomePhotoInformation, homePhotoInformation } = props
    const [startAfter, setStartAfter] = useState(null)

    const lazy = () => {
        db.collection('preview-posts')
        .startAt(startAfter)
        .limit(2)
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
            .limit(20)
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
    

    const images = props?.homePhotoInformation?.map((photo, index) => {
        return <ImageCard
            key={index} 
            photoInfo={photo} 
            history={props.history}
            lazy={lazy}
            index={index}
            length={props.homePhotoInformation.length}
            getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
            setPhotoInformation={props.setPhotoInformation} 
            homePhotoInformation={props.homePhotoInformation}
        />;
    });

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
                <div className="image-list">{images}</div>
            </Container>
            }
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <SubmitButton onClick={lazy}>Load more</SubmitButton>
            </div>
        </div>
       
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
        window.addEventListener("resize", ()=>setTimeout(()=> {
            if(this.imageRef.current) {
                const height = this.imageRef.current.clientHeight;
                const spans = Math.ceil(height) + 7;
                this.setState({ spans: spans });
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
    
    render() {
        return( 
            <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
                <PhotoContainer onClick={this.click}>
                    <PhotoTextContainer>
                        <Image className='masonry-image' ref={this.imageRef} src={this.props.photoInfo.image} alt='main display'  />
                        <TextContainer>
                            <PhotoTitle>{this.props.photoInfo.title}</PhotoTitle>
                            <PhotoLocation>{`${this.props.photoInfo.city}, ${this.props.photoInfo.country}`}</PhotoLocation>
                        </TextContainer>
                    </PhotoTextContainer>
                </PhotoContainer>
            </div>
        )
    }
}