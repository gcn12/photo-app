import TitlePhoto from './TitlePhoto'
import CategoryLocation from './CategoryLocation'
import Preview from './Preview'
import Body from './Body'
import Scroll from './Scroll'
import PostDescription from './PostDescription'
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
            y: '20vh',
            opacity: 1,
        },
        shiftUp: {
            x: 0,
            y: '1vh',
            opacity: 1,
        }, 
        transitionEnd: {
            x: -100,
            y: '1vh',
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
            y: '20vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: '20vh',
            opacity: 1,
        },
        transitionBack: {
            x: 0,
            y: '20vh',
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
    createDescription: {
        initial: {
            x: 100,
            y: '20vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: '20vh',
            opacity: 1,
        },
        transitionBack: {
            x: 0,
            y: '20vh',
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
            y: '20vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: '20vh',
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
        transitionEnd: {
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
    const [createDescriptionProps, setCreateDescriptionProps] = useState('initial')
    const [switchValue, setSwitchValue] = useState(1)
    const [bodyContent, setBodyContent] = useState([])
    const [bodyImages, setBodyImages] = useState([])
    const [imageSizeRatio, setImageSizeRatio] = useState({})
    const [uploadCount, setUploadCount] = useState(5)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadProgressColor, setUploadProgressColor] = useState(false)
    const [paragraph, setParagraph] = useState('')
    const [isImageHorizontal, setIsImageHorizontal] = useState(true)
    const [font, setFont] = useState("'Castoro', serif;")
    const [titlePhotoProceed, setTitlePhotoProceed] = useState(false)
    const [categoryLocationProceed, setCategoryLocationProceed] = useState(false)
    const [bodyProceed, setBodyProceed] = useState(false)
    const [fontProceed, setFontProceed] = useState(true)
    const [isDuplicate, setIsDuplicate] = useState(false)
    const [numberCharacters, setNumberCharacters] = useState(150)

    const submit = (imagesEmptyArrays, unsortedImages, imageMap, imageSizeArray, smallImageUrl) => {
        const title = document.getElementById('add-content-title').value
        const location = document.getElementById('autocomplete').value
        const splitLocation = location.split(',')
        const country = splitLocation[splitLocation.length-1].trim()
        const city = splitLocation[0]
        const category = document.getElementById('category').value
        const timestamp = Date.now()
        const descriptionArray = []
        const content = document.getElementsByClassName('content-paragraph')

        let titleNoBlankSpace = title.trim()
        let url = titleNoBlankSpace.split(' ')
        url = url.join('-')
        // let url = titleNoBlankSpace.replaceAll(' ', '-')
        url = url.toLowerCase()
    
        for (let i=0; i<content.length; i++) {
            descriptionArray.push(String(content[i].value))
        }

        let previewDescription
        if (document.getElementById('post-description-input').value.length > 0) {
            previewDescription = document.getElementById('post-description-input').value
        }else{
            previewDescription = descriptionArray[0].substring(0, 150)
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
        db.collection('users').doc(props.user)
        .get()
        .then(data=> {
            const name = data.data().name
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
                        previewDescription,
                        smallImage: smallImageUrl,
                        image: mainImage,
                        category,
                        city,
                        country,
                        continent,
                        author: name,
                        location,
                        // views: 0, change back later
                        url,
                        username
                    }).then(docRef => {
                        setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                        db.collection('posts').doc(docRef.id).set({
                            id: docRef.id,
                        }, {merge: true}) 
                        .then(()=> {
                            const views = Math.round(Math.random()*500)+500
                            const hearts = Math.round(Math.random()*300)+100
                            const ratio = hearts / views
                            setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                            db.collection('preview-posts').add({
                                reference: `/posts/${docRef.id}`,
                                username,
                                timestamp,
                                id: docRef.id,
                                author: name,
                                previewDescription,
                                smallImage: smallImageUrl,
                                title,
                                image: mainImage,
                                category,
                                city,
                                country,
                                continent,
                                url,
                                // views: 0,
                                views,
                                hearts,
                                ratio,
                            })
                            .then(()=>{
                                db.collection('users')
                                .doc(props.user)
                                .collection('post-names')
                                .doc('post-names')
                                .set({
                                    'post-names': firebase.firestore.FieldValue.arrayUnion(url)
                                }, {merge: true})
                                setTimeout(()=>setUploadProgressColor(true), 300)
                                setTimeout(()=>props.getFeaturedPhotoInfo(url, username), 2000)
                                setTimeout(()=>props.history.push(`/photo-app/post/${username}/${url}`), 2000)
                            })
                        })              
                    })
                })
            })
        })
    }
    
    const fileUpload = (user, imageSizeArray) => {
        let smallImageUrl
        const title = document.getElementById('add-content-title').value
        let url = title.split(' ')
        url = url.join('-')
        url = url.toLowerCase()

        const file = document.getElementsByClassName('photo-input')[0].files[0]
        const reader2 = new FileReader()
        reader2.readAsDataURL(file);
        reader2.onload = (e) => {
            const fileName = file.name
            const image = document.createElement('img')
            image.src = e.target.result;
            image.onload = function () {
                resizeFile(image, image, fileName);
            };
        }

        const resizeFile = (loadedData, preview, fileName) => { 
            const height = loadedData.height
            const width = loadedData.width
            let ratio
            let finalHeight
            let finalWidth
            if (height >= width) {
                ratio = width / height
                finalHeight = 600
                finalWidth = Math.round(ratio * 600)
            }else {
                ratio = height / width
                finalWidth = 600
                finalHeight = Math.round(ratio * 600)
            }
            let canvas = document.createElement('canvas'),
            ctx;
            canvas.width = finalWidth;
            canvas.height = finalHeight;
            ctx = canvas.getContext('2d');
            ctx.drawImage(preview, 0, 0, canvas.width, canvas.height);
            fileUpload(canvas, fileName)
        }

        const fileUpload = (imageData, fileName) => {
            var dataURL = imageData.toDataURL('image/jpeg', 1)
            const random = Math.round(Math.random()*1000000)
            db.collection('users')
            .doc(props.user)
            .get()
            .then(userData=> {
                const username = userData.data().username
                firebase.storage().ref()
                .child(`${username}/${url}/${fileName}${random}`)
                .putString(dataURL, 'data_url')
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL()
                    .then(miniImageUrl=> {
                        smallImageUrl = miniImageUrl

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
                                const random = Math.round(Math.random()*1000000)
                                const file = fileArray[indexNum]
                                const metadata = {
                                    contentType: file.type
                                }
                                firebase.storage().ref()
                                .child(`${username}/${url}/${file.name}${random}`)
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
                                            submit(photoUrlArraySorted, [...urlArray, downloadURL], photoIndexes, imageSizeArray, smallImageUrl)
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
                    })
                }).catch((error) => {
                    console.log(error)
                })
            })
        }



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
        let paragraphArr = []
        const paragraph = document.getElementById('content-paragraph-original').value
        paragraphArr.push(paragraph)
        setParagraph(paragraphArr)
    }

    const checkTitleDuplicates = () => {
        const title = document.getElementById('add-content-title').value
        // let url = title.replaceAll(' ', '-')
        let url = title.split(' ')
        url = url.join('-')
        url = url.toLowerCase()
        db.collection('users').doc(props.user)
        .collection('post-names')
        .where('post-names', 'array-contains', url)
        .get()
        .then(data=> {
            let dataArray = []
            data.forEach(item=> {
                dataArray.push(item.data())
            })
            if(dataArray.length > 0){
                setIsDuplicate(true)
                setTitlePhotoProceed(false)
            }else{
                setIsDuplicate(false)
                setTitlePhotoProps('transitionEnd')
                setCategoryLocationProps('transitionStart')
                setSwitchValue(2)
            }
        })
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
                    checkTitleDuplicates()
                    // setTitlePhotoProps('transitionEnd')
                    // setCategoryLocationProps('transitionStart')
                    // setSwitchValue(2)
                }
                break
            case 2:
                if(categoryLocationProceed) {
                    setCategoryLocationProps('transitionEnd')
                    setCreateDescriptionProps('transitionStart')
                    setSwitchValue(3)
                }
                break
            case 3: 
            if (numberCharacters >= 0) {
                setCreateDescriptionProps('transitionEnd')
                setBody('transitionStart')
                setSwitchValue(4)
            }
                break
            case 4:
                if(bodyProceed) {
                    setBody('transitionEnd')
                    setSelectFontProps('transitionStart')
                    getParagraphSample()
                    setSwitchValue(5)
                }
                break
            case 5:
                setSelectFontProps('transitionEnd')
                setPreviewProps('transitionStart')
                getBodyContent()
                getBodyImages()
                setSwitchValue(6)
                props.setPhotoInformation([])
            break
                case 6: 
                setPreviewProps('transitionEnd')
                fileUpload(props.user, imageSizeRatio)
                setUploadStatusProps('transitionStart')
                setUploadProgress(previousUploadProgress => previousUploadProgress + 1)
                setSwitchValue(7)
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
                setSwitchValue(2)
                break
            case 4: 
            setCreateDescriptionProps('transitionBack')
                setBody('initial')
                setSwitchValue(3)
                break
            case 5:
                setBody('transitionBack')
                setSelectFontProps('initial')
                setSwitchValue(4)
                break
            case 6: 
                setSelectFontProps('transitionBack')
                setPreviewProps('initial')
                setSwitchValue(5)
                break
            default: 
                return null
        }
    }



    return(
        <div>
            <UploadProgress uploadProgressColor={uploadProgressColor} animate={uploadStatusProps} variants={animationMap.uploadStatus} uploadCount={uploadCount} uploadProgress={uploadProgress}/>
            {switchValue === 7 ? 
            null
            :
            <div>

            <NextButton proceed={1} width='130px' onClick={()=>props.history.goBack()}>Back</NextButton>
            <Scroll scrollHeight='90vh' visibility={animationMap.preview[previewProps].opacity}>
                <Preview font={font} isImageHorizontal={isImageHorizontal} imageSizeRatio={imageSizeRatio} bodyImages={bodyImages} bodyContent={bodyContent} mainImage={mainImage} previewProps={previewProps} animationMap={animationMap}></Preview>
            </Scroll>
            </div>
            }
            <Scroll scrollHeight='90vh' visibility={animationMap.titlePhoto[titlePhotoProps].opacity}>
                <TitlePhoto isDuplicate={isDuplicate} setTitlePhotoProceed={setTitlePhotoProceed} setIsImageHorizontal={setIsImageHorizontal} setMainImage={setMainImage} animationMap={animationMap} setTitlePhotoProps={setTitlePhotoProps} titlePhotoProps={titlePhotoProps}/>
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
            

            <Scroll scrollHeight='90vh' visibility={animationMap.createDescription[createDescriptionProps].opacity}>
                <PostDescription setNumberCharacters={setNumberCharacters} animationMap={animationMap} createDescriptionProps={createDescriptionProps} />
            </Scroll>


            {switchValue === 7 ? 
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
                            return <NextButton proceed={numberCharacters >= 0 ? true : false} width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Next</NextButton>
                        case 4: 
                            return <NextButton proceed={bodyProceed} width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Next</NextButton>
                        case 5: 
                            return <NextButton proceed={fontProceed} width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Preview</NextButton>
                        case 6:
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