import React, { useEffect, 
    // useState 
} from 'react'
import { db } from '../Firebase'
import '../App.css'
import { 
    Image, 
    Container, 
} from './GetPhotosHomepage.styles'
import macy from 'macy'
// import Spinner from '../Spinner/Spinner'

const DisplayPhoto = (props) => {
    useEffect(()=> { 
        props.grid()
        // eslint-disable-next-line  
    }, [])

    const click = () => {
        props.setPageRoute('PhotoFeatured')
        props.setPhotoInformation(props.photoInfo)
    }

    return(
        <div>
            <a href={props.url}><Image onClick={click} className='grid-item' alt='' src={props.photoInfo.image}></Image></a>
        </div>
    )
}

const GetPhotos = (props) => {
    
    
    // const [photos, setPhotos] = useState(null)
    

    const { setHomePhotoInformation, homePhotoInformation} = props


    useEffect(()=>{
        window.scrollTo({top: 0})
        if(!homePhotoInformation){
            const photoRef = db.collection('posts')
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
                940: 3,
                520: 2,
                400: 1
            },
        })
    }
    return(
        <div>
            <Container>
                <div id="grid">
                    {props.homePhotoInformation ? props.homePhotoInformation.map((photo, index)=> {
                        return(
                            <DisplayPhoto setPageRoute={props.setPageRoute} setPhotoInformation={props.setPhotoInformation} key={index} grid={grid} photoInfo={photo} />
                        )
                    })
                    :
                    null}
                </div>
            </Container>
        </div>
    )
}

export default GetPhotos