import TitlePhoto from './TitlePhoto'
import CategoryLocation from './CategoryLocation'
import Preview from './Preview'
import Body from './Body'
import Scroll from './Scroll'
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
            y: '10vh',
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
        // transitionEnd: {
        //     x: -1000,
        //     opacity: 0
        // },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    }
}


const AddContent = () => {
    const [mainImage, setMainImage] = useState(null)
    const [titlePhotoProps, setTitlePhotoProps] = useState('initial')
    const [categoryLocationProps, setCategoryLocationProps] = useState('initial')
    const [bodyProps, setBody] = useState('initial')
    const [previewProps, setPreviewProps] = useState('initial')
    const [switchValue, setSwitchValue] = useState(1)
    const [bodyContent, setBodyContent] = useState([])
    const [bodyImages, setBodyImages] = useState([])
    const [imageSizeRatio, setImageSizeRatio] = useState([])

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
        console.log(imagesArray)
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
            <button onClick={()=>console.log(imageSizeRatio)}>Click</button>
            <Scroll animate={previewProps} variants={animationMap.preview} scrollHeight='90vh' visibility={animationMap.preview[previewProps].opacity}>
                <Preview imageSizeRatio={imageSizeRatio} bodyImages={bodyImages} bodyContent={bodyContent} mainImage={mainImage} previewProps={previewProps} animationMap={animationMap}></Preview>
            </Scroll>
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