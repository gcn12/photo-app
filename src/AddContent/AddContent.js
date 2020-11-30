import TitlePhoto from './TitlePhoto'
import CategoryLocation from './CategoryLocation'
import Preview from './Preview'
import Body from './Body'
import Scroll from './Scroll'
import { db } from '../Firebase'
import firebase from 'firebase'
// import { fileUpload } from './Submit'
import UploadProgress from './UploadProgress'
import React, { 
    useState 
} from 'react'
import {
    NextButton,
    ButtonContainer,
} from './AddContentAnimationTest.styles'

const animationMap = {
    titlePhoto: {
        initial: {
            y: '30vh',
            opacity: 1,
        },
        transitionStart: {
            y: 10,
            opacity: 1,
        }, 
        transitionEnd: {
            x: -200,
            opacity: 0,
        },
        transitionBack: {
            y: 10,
            x: 0,
            opacity: 1,
        }, 
        transition: {
            x: {
                duration: 10
            }
        }
    },
    categoryLocation: {
        initial: {
            x: 100,
            opacity: 0,
            y: '30vh',
        },
        transitionStart: {
            x: 0,
            opacity: 1,
            y: '30vh',
        },
        transitionBack: {
            x: 400,
            opacity: 0,
        },
        transitionEnd: {
            x: -1000,
            opacity: 0
        },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    },
    body: {
        initial: {
            x: 100,
            opacity: 0,
            y: '25vh',
        },
        transitionStart: {
            x: 0,
            opacity: 1,
            y: '25vh',
        },
        shiftUp: {
            x: 0,
            opacity: 1,
            y: '0',
        },
        transitionBack: {
            x: 0,
            opacity: 1,
        },
        transitionEnd: {
            x: -1000,
            opacity: 0
        },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    },
    preview: {
        initial: {
            y: '10',
            opacity: 0,
        },
        transitionStart: {
            opacity: 1,
            y: 0,
        },
        transitionBack: {
            x: 0,
            opacity: 0,
        },
        transitionEnd: {
            // x: -1000,
            opacity: 0
        },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    },
    uploadStatus: {
        initial: {
            x: 30,
            y: '35vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            opacity: 1,
            y: '35vh',
        },
        // transitionBack: {
        //     x: 0,
        //     opacity: 0,
        // },
        transitionEnd: {
            // x: -1000,
            opacity: 0
        },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    }
}


const AddContent = (props) => {
    const [mainImage, setMainImage] = useState(null)
    const [titlePhotoProps, setTitlePhotoProps] = useState('initial')
    const [categoryLocationProps, setCategoryLocationProps] = useState('initial')
    const [bodyProps, setBody] = useState('initial')
    const [previewProps, setPreviewProps] = useState('initial')
    const [uploadStatusProps, setUploadStatusProps] = useState('initial')
    const [switchValue, setSwitchValue] = useState(1)
    const [bodyContent, setBodyContent] = useState([])
    const [bodyImages, setBodyImages] = useState([])
    const [imageSizeRatio, setImageSizeRatio] = useState({})
    const [uploadCount, setUploadCount] = useState(5)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadProgressColor, setUploadProgressColor] = useState(false)

    const submit = (imagesEmptyArrays, unsortedImages, imageMap, user, imageSizeArray) => {
        const title = document.getElementById('add-content-title').value
        const location = document.getElementById('autocomplete').value
        const splitLocation = location.split(',')
        const country = splitLocation[splitLocation.length-1].trim()
        const city = splitLocation[0]
        const category = document.getElementById('category').value
        const timestamp = Date.now()
        const descriptionArray = []
        const content = document.getElementsByClassName('content-paragraph')
    
        for (let i=0; i<content.length; i++) {
            descriptionArray.push(String(content[i].value))
        }
    
        let mainImage = ''
    
        let imagesEmptyArraysCopy = imagesEmptyArrays
        let imageMapCopy = imageMap
    
        for(let i=0; i<unsortedImages.length; i++) {
            if(i === 0) {
                mainImage = unsortedImages[i]
            }else{
                if(i<imageMapCopy.length+1) {
                    imagesEmptyArraysCopy[imageMapCopy[i-1]].push(unsortedImages[i])
                }
            }
        }
    
        const urlObject = {}
        
        for (let i=0; i<imagesEmptyArraysCopy.length; i++) {
            urlObject[i] = imagesEmptyArraysCopy[i]
        }
    
        db.collection('continents-countries').doc('map').collection(country)
        .where(country, 'in', ['North America', 'South America', 'Asia', 'Europe', 'Oceania', 'Africa'])
        .get()
        .then(data => {
            setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
            const continent = data.docs[0].data()[country]
            db.collection('posts').add({
                photoBodyMap: imageSizeArray,
                content: descriptionArray,
                images: urlObject,
                title,
                timestamp,
                image: mainImage,
                category,
                city,
                country,
                continent,
                author: 'Dan Smith',
                views: 0,
            }).then(docRef => {
                setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                db.collection('users').doc(user)
                .collection('posts').doc(docRef.id).set({
                    reference: `posts/${docRef.id}`,
                    timestamp,
                    id: docRef.id,
                    title: title,
                    image: mainImage,
                    views: 0,
                    city,
                    country,
                    continent,
                }, {merge: true})
                .then(()=>{ 
                    db.collection('posts').doc(docRef.id).set({
                        id: docRef.id,
                    }, {merge: true}) 
                })
                .then(()=> {
                    // setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                    db.collection('preview-posts').add({
                        reference: `/posts/${docRef.id}`,
                        timestamp,
                        id: docRef.id,
                        title,
                        image: mainImage,
                        views: 0,
                        category,
                        city,
                        country,
                        continent,
                    })
                    // .then(()=>setUploadProgress(previousUploadProgress=> previousUploadProgress + 1))
                    .then(()=>{
                        console.log('uploaded')
                        setTimeout(()=>setUploadProgressColor(true), 300)
                        setTimeout(()=>props.getFeaturedPhotoInfo(docRef.id), 2000)
                    })
                })              
            })
        })
    }
    
    const fileUpload = (user, imageSizeArray) => {
        let photoIndexes = []
        let fileArray = []
        const photoUrlArraySorted = []
        // const urlArray = []
        const photoFiles = document.getElementsByClassName('photo-input')
        for (let i = 0; i < photoFiles.length; i++) {
            fileArray = [...fileArray, ...photoFiles[i].files]
            if(photoFiles[i].files.length > 1) {
                photoUrlArraySorted.push([])
                for(let j = 0; j<photoFiles[i].files.length; j++) {
                    photoIndexes.push(i-1)
                }
            }else{
                if(i!==0) {
                    photoIndexes.push(i-1)
                    photoUrlArraySorted.push([])
                }
            }
        }
        const urlArray = []
        let index = []
        let indexNum = 0
        const upload = () => {
            console.log(indexNum)
            console.log('working')
            if(indexNum<fileArray.length) {
                const file = fileArray[indexNum]
                const metadata = {
                    contentType: file.type
                }
                firebase.storage().ref()
                .child(file.name)
                .put(file, metadata)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL()
                    .then(downloadURL => {
                        urlArray.push(downloadURL)  
                        indexNum++ 
                        index.push(downloadURL) 
                    }).then((downloadURL)=> {
                        if(urlArray.length===fileArray.length) {
                            console.log(photoUrlArraySorted)
                            submit(photoUrlArraySorted, [...urlArray, downloadURL], photoIndexes, user, imageSizeArray)
                        }else{
                            setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                            upload()
                        }
                    })
                    .catch(error => console.log(error))
                });
            }else{
                return
            }
        }
        upload()
    }

    const getBodyContent = () => {
        const paragraphs = document.getElementsByClassName('content-paragraph')
        const content = []
        for (let paragraph of paragraphs) {
            content.push(paragraph.value)
        }
        setBodyContent(content)
    }

    const getBodyImages = () => {
        const images = document.getElementsByClassName('body-photos')
        let imagesArray = []
        for (let i = 0; i < images.length; i++) {
            let subArray = []
            for(let j = 0; j<images[i].files.length; j++) {
                subArray.push(images[i].files[j])
            }
            imagesArray.push(subArray)
        }
        setUploadCount(uploadCount + imagesArray.length)
        setBodyImages(imagesArray)
    }

    const transitionSwitchNext = () => {
        switch(switchValue) {
            case 1:
                setTitlePhotoProps('transitionEnd')
                setCategoryLocationProps('transitionStart')
                setSwitchValue(2)
                break
            case 2:
                setBody('transitionStart')
                setCategoryLocationProps('transitionEnd')
                setSwitchValue(3)
                break
            case 3:
                setPreviewProps('transitionStart')
                setBody('transitionEnd')
                setSwitchValue(4)
                getBodyContent()
                getBodyImages()
                break
            case 4: 
                setPreviewProps('transitionEnd')
                fileUpload(props.user, imageSizeRatio)
                setUploadStatusProps('transitionStart')
                setUploadProgress(previousUploadProgress => previousUploadProgress + 1)
                setSwitchValue(5)
                break
            default: 
                return null
        }
    }

    const transitionSwitchBack = () => {
        switch(switchValue) {
            case 2:
                setCategoryLocationProps('transitionBack')
                setTitlePhotoProps('transitionBack')
                setSwitchValue(1)
                break
            case 3: 
                setBody('initial')
                setCategoryLocationProps('transitionStart')
                setSwitchValue(2)
                break
            case 4: 
                setPreviewProps('transitionBack')
                setBody('transitionBack')
                setSwitchValue(3)
                break
            default: 
                return null
        }
    }

    return(
        <div>
            <NextButton width='130px' onClick={()=>props.setPageRoute('GetPhotos')}>Back</NextButton>
            <UploadProgress uploadProgressColor={uploadProgressColor} animate={uploadStatusProps} variants={animationMap.uploadStatus} uploadCount={uploadCount} uploadProgress={uploadProgress}/>
            {switchValue === 5 ? 
            null
            :
            <div>

            <Scroll animate={previewProps} variants={animationMap.preview} scrollHeight='90vh' visibility={animationMap.preview[previewProps].opacity}>
                <Preview imageSizeRatio={imageSizeRatio} bodyImages={bodyImages} bodyContent={bodyContent} mainImage={mainImage} previewProps={previewProps} animationMap={animationMap}></Preview>
            </Scroll>
            </div>
            }
            <Scroll scrollHeight='90vh' visibility={animationMap.titlePhoto[titlePhotoProps].opacity}>
                <TitlePhoto setMainImage={setMainImage} animationMap={animationMap} setTitlePhotoProps={setTitlePhotoProps} transition={titlePhotoProps}/>
            </Scroll>
            <Scroll scrollHeight='90vh' visibility={animationMap.categoryLocation[categoryLocationProps].opacity}>
                <CategoryLocation animationMap={animationMap} categoryLocation={categoryLocationProps}/>
            </Scroll>
            <Scroll scrollHeight='90vh' visibility={animationMap.body[bodyProps].opacity}>
                <Body imageSizeRatio={imageSizeRatio} setImageSizeRatio={setImageSizeRatio} setBody={setBody} animationMap={animationMap} bodyProps={bodyProps}></Body>
            </Scroll>
            <ButtonContainer>
                {switchValue === 1 ? 
                null
                :
                <NextButton width='150px' onClick={transitionSwitchBack}>Back</NextButton>
                }
                {switchValue === 4 ? 
                <NextButton width={switchValue === 1 ? '300px' :'150px'} onClick={transitionSwitchNext}>Submit</NextButton>
                :
                <NextButton width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Next</NextButton>
                }
            </ButtonContainer>
        </div>
    )
}

export default AddContent