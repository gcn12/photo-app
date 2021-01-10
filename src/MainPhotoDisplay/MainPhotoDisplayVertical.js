import React, { useState } from 'react'
import PhotoDescriptionView from './PhotoDescriptionView'
import '../App.css'
import { connect } from 'react-redux'
import SpinnerOnly from '../Spinner/SpinnerOnly'
import { 
    PhotoDescriptionViewContainer,
    DisplayContainer,
    LoadMoreButtonContainer,
} from './MainPhotoDisplayVertical.styles'
import { SubmitButton } from '../AddContent/AddContent.styles'

const GetPhotos = (props) => {

    const [isVisible, setIsVisible] = useState(false)

    return(
        <div style={{position: 'relative'}}>
            {isVisible ? 
            null
            :
            <SpinnerOnly spinnerColor='#4D4D4D' />
            }
            <DisplayContainer opacity={isVisible ? 1 : 0} style={{marginTop: '120px'}}>
                <PhotoDescriptionViewContainer>
                    {props.homePhotoInformation.map((photo, index)=> {
                        return( 
                            <PhotoDescriptionView 
                            setIsVisible={setIsVisible}
                            history={props.history}
                            index={index}
                            photoLength={props.homePhotoInformation.length}
                            getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                            key={index} 
                            photoInfo={photo} 
                            />
                        )
                    })}
                </PhotoDescriptionViewContainer>
                {
                props?.homePhotoInformation?.length > 0 ?
                props.isLoadMore ? 
                <LoadMoreButtonContainer>
                    <SubmitButton onClick={()=>props.sort(props.sortCriteria)}>Load more</SubmitButton>
                </LoadMoreButtonContainer>
                :
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div>You've reached the bottom</div>
                </div>
                :
                null
                }
                <div style={{margin: '30px'}}></div>
            </DisplayContainer>
        </div>
    )
}

const mapStateToProps = state => ({
    isLoadMore: state.app.isLoadMore,
    homePhotoInformation: state.app.homePhotoInformation,
    sortCriteria: state.app.sortCriteria,
})

export default connect(mapStateToProps)(GetPhotos)



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