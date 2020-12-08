import React, { Component, useEffect } from 'react'
import { db } from './Firebase'
import './App.css'

const GetPhotos = (props) => {

    const { setHomePhotoInformation, homePhotoInformation } = props
    // const [startAfter, setStartAfter] = useState(null)

    // const lazy = () => {
    //     db.collection('preview-posts')
    //     .startAt(startAfter)
    //     .limit(15)
    //     .get()
    //     .then(snapshot => {
    //         setStartAfter(snapshot.docs[snapshot.docs.length-1])
    //         const photosArray = []
    //         snapshot.docs.forEach(doc => {
    //             photosArray.push(doc.data())
    //         })
    //         setHomePhotoInformation([...homePhotoInformation, ...photosArray])
    //         console.log('lazy')
    //     })
    // }

    useEffect(()=>{
        window.scrollTo({top: 0})
        if(!homePhotoInformation){
            db.collection('preview-posts')
            .limit(28)
            .get()
            .then(snapshot => {
                // setStartAfter(snapshot.docs[snapshot.docs.length-1])
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
        return <ImageCard key={index} image={photo.image} />;
    });
      
      
    
    return(
        <div>
            <button onClick={null}>heess</button>
            <div className="image-list">{images}</div>;
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
        this.imageRef.current.addEventListener("load", this.setSpans);
    }
    
    setSpans = () => {
        const height = this.imageRef.current.clientHeight;
        const spans = Math.ceil(height / 10);
        this.setState({ spans: spans});
    }
    
    render() {
        return(
            <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
                <img
                ref={this.imageRef}
                src={this.props.image}
                alt='test'
                />
            </div>
        )
    }
}
 


/* <div>
    <Container>
        <div style={{marginTop: '15px'}}></div>
        <div id="grid" className='masonry-container'>
        <Masonry
        breakpointCols={{default: 4, 1100: 3, 700: 2}}
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
        </div>
    </Container>
</div> */