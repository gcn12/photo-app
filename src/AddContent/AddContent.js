import TitlePhoto from './TitlePhoto'
import CategoryLocation from './CategoryLocation'
import Preview from './Preview'
import Body from './Body'
import Scroll from './Scroll'
import SelectFont from './SelectFont'
import { db } from '../Firebase'
import firebase from 'firebase'
import UploadProgress from './UploadProgress'
import React, { 
    useState 
} from 'react'
import {
    NextButton,
    ButtonContainer,
} from './AddContent.styles'

const animationMap = {
    titlePhoto: {
        initial: {
            x: 0,
            y: '25vh',
            opacity: 1,
        },
        shiftUp: {
            x: 0,
            y: 10,
            opacity: 1,
        }, 
        transitionEnd: {
            x: -100,
            y: 10,
            opacity: 0,
        },
        transitionBack: {
            x: 0,
            // y: 10,
            opacity: 1,
        }, 
        transition: {
            opacity: {
                delay: 1,
            },
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    },
    categoryLocation: {
        initial: {
            x: 100,
            y: '25vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: '25vh',
            opacity: 1,
        },
        transitionBack: {
            x: 0,
            y: '25vh',
            opacity: 1,
        },
        transitionEnd: {
            x: -100,
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
            y: '25vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: '25vh',
            opacity: 1,
        },
        shiftUp: {
            x: 0,
            y: '0',
            opacity: 1,
        },
        transitionBack: {
            x: 0,
            opacity: 1,
        },
        transitionEnd: {
            x: -100,
            opacity: 0
        },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    },
    selectFont: {
        initial: {
            x: 100,
            y: '10vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: '10vh',
            opacity: 1,
        },
        transitionBack: {
            x: 0,
            opacity: 1,
        },
        transitionEnd: {
            opacity: 0,
            x: -100
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
            x: 100,
            y: '10',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: 0,
            opacity: 1,
        },
        transitionBack: {
            x: 0,
            opacity: 1,
        },
        transitionEnd: {
            x: -100,
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
            y: '35vh',
            opacity: 1,
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
    const [selectFontProps, setSelectFontProps] = useState('initial')
    const [switchValue, setSwitchValue] = useState(1)
    const [bodyContent, setBodyContent] = useState([])
    const [bodyImages, setBodyImages] = useState([])
    const [imageSizeRatio, setImageSizeRatio] = useState({})
    const [uploadCount, setUploadCount] = useState(5)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadProgressColor, setUploadProgressColor] = useState(false)
    const [paragraph, setParagraph] = useState('')
    const [isImageHorizontal, setIsImageHorizontal] = useState(true)
    const [font, setFont] = useState('')
    const [titlePhotoProceed, setTitlePhotoProceed] = useState(false)
    const [categoryLocationProceed, setCategoryLocationProceed] = useState(false)
    const [bodyProceed, setBodyProceed] = useState(false)
    const [fontProceed, setFontProceed] = useState(true)

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

        db.collection('users')
        .doc(props.user)
        .get()
        .then(data=> {
            const username = data.data()['username']
            db.collection('continents-countries').doc('map').collection(country)
            .where(country, 'in', ['North America', 'South America', 'Asia', 'Europe', 'Oceania', 'Africa'])
            .get()
            .then(data => {
                setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                const continent = data.docs[0].data()[country]
                db.collection('posts').add({
                    font,
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
                        setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                        db.collection('preview-posts').add({
                            reference: `/posts/${docRef.id}`,
                            username,
                            timestamp,
                            id: docRef.id,
                            previewDescription: descriptionArray[0],
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
                        setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                        if(urlArray.length===fileArray.length) {
                            submit(photoUrlArraySorted, [...urlArray, downloadURL], photoIndexes, user, imageSizeArray)
                        }else{
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

    const getParagraphSample = () => {
        const paragraph = document.getElementById('content-paragraph-original').value
        setParagraph(paragraph)
    }

    const getBodyImages = () => {
        const images = document.getElementsByClassName('body-photos')
        let count = 0
        let imagesArray = []
        for (let i = 0; i < images.length; i++) {
            let subArray = []
            for(let j = 0; j<images[i].files.length; j++) {
                count += 1
                subArray.push(images[i].files[j])
            }
            imagesArray.push(subArray)
        }
        setUploadCount(uploadCount => uploadCount + count)
        setBodyImages(imagesArray)
    }

    const transitionSwitchNext = () => {
        switch(switchValue) {
            case 1:
                if(titlePhotoProceed) {
                    setTitlePhotoProps('transitionEnd')
                    setCategoryLocationProps('transitionStart')
                    setSwitchValue(2)
                }
                break
            case 2:
                if(categoryLocationProceed) {
                    setCategoryLocationProps('transitionEnd')
                    setBody('transitionStart')
                    setSwitchValue(3)
                }
                break
            case 3:
                if(bodyProceed) {
                    setBody('transitionEnd')
                    setSelectFontProps('transitionStart')
                    getParagraphSample()
                    setSwitchValue(4)
                }
                break
            case 4:
                setSelectFontProps('transitionEnd')
                setPreviewProps('transitionStart')
                getBodyContent()
                getBodyImages()
                setSwitchValue(5)
            break
                case 5: 
                setPreviewProps('transitionEnd')
                fileUpload(props.user, imageSizeRatio)
                setUploadStatusProps('transitionStart')
                setUploadProgress(previousUploadProgress => previousUploadProgress + 1)
                setSwitchValue(6)
                break
            default: 
                return null
        }
    }

    const transitionSwitchBack = () => {
        switch(switchValue) {
            case 2:
                setTitlePhotoProps('transitionBack')
                setCategoryLocationProps('initial')
                setSwitchValue(1)
                break
            case 3: 
                setCategoryLocationProps('transitionBack')
                setBody('initial')
                setSwitchValue(2)
                break
            case 4:
                setBody('transitionBack')
                setSelectFontProps('initial')
                setSwitchValue(3)
                break
            case 5: 
                setSelectFontProps('transitionBack')
                setPreviewProps('initial')
                setSwitchValue(4)
                break
            default: 
                return null
        }
    }



    return(
        <div>
            <NextButton proceed={1} width='130px' onClick={()=>props.setPageRoute('GetPhotos')}>Back</NextButton>
            <UploadProgress uploadProgressColor={uploadProgressColor} animate={uploadStatusProps} variants={animationMap.uploadStatus} uploadCount={uploadCount} uploadProgress={uploadProgress}/>
            {switchValue === 6 ? 
            null
            :
            <div>

            <Scroll scrollHeight='90vh' visibility={animationMap.preview[previewProps].opacity}>
                <Preview font={font} isImageHorizontal={isImageHorizontal} imageSizeRatio={imageSizeRatio} bodyImages={bodyImages} bodyContent={bodyContent} mainImage={mainImage} previewProps={previewProps} animationMap={animationMap}></Preview>
            </Scroll>
            </div>
            }
            <Scroll scrollHeight='90vh' visibility={animationMap.titlePhoto[titlePhotoProps].opacity}>
                <TitlePhoto setTitlePhotoProceed={setTitlePhotoProceed} setIsImageHorizontal={setIsImageHorizontal} setMainImage={setMainImage} animationMap={animationMap} setTitlePhotoProps={setTitlePhotoProps} titlePhotoProps={titlePhotoProps}/>
            </Scroll>
            <Scroll scrollHeight='90vh' visibility={animationMap.categoryLocation[categoryLocationProps].opacity}>
                <CategoryLocation setCategoryLocationProceed={setCategoryLocationProceed} animationMap={animationMap} categoryLocation={categoryLocationProps}/>
            </Scroll>
            <Scroll scrollHeight='90vh' visibility={animationMap.body[bodyProps].opacity}>
                <Body setBodyProceed={setBodyProceed} imageSizeRatio={imageSizeRatio} setImageSizeRatio={setImageSizeRatio} setBody={setBody} animationMap={animationMap} bodyProps={bodyProps}></Body>
            </Scroll>
            <Scroll scrollHeight='90vh' visibility={animationMap.selectFont[selectFontProps].opacity}>
                <SelectFont setFontProceed={setFontProceed} font={font} setFont={setFont} paragraph={paragraph} animationMap={animationMap} selectFontProps={selectFontProps}/>
            </Scroll>
            {switchValue === 6 ? 
            null
            :
            <ButtonContainer>
                {switchValue === 1 ? 
                null
                :
                <NextButton proceed={1} width='150px' onClick={transitionSwitchBack}>Back</NextButton>
                }
                {(()=> {
                    switch (switchValue) {
                        case 1: 
                            return <NextButton proceed={titlePhotoProceed} width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Next</NextButton>
                        case 2: 
                            return <NextButton proceed={categoryLocationProceed} width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Next</NextButton>
                        case 3: 
                            return <NextButton proceed={bodyProceed } width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Next</NextButton>
                        case 4: 
                            return <NextButton proceed={fontProceed} width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Preview</NextButton>
                        case 5:
                            return <NextButton proceed={true} width={switchValue === 1 ? '300px' :'150px'} onClick={transitionSwitchNext}>Submit</NextButton>
                        default: 
                            return null
                    }
                })()}
            </ButtonContainer>
            }
        </div>
    )
}

export default AddContent