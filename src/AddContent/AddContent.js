import TitlePhoto from './TitlePhoto'
import CategoryLocation from './CategoryLocation'
import Preview from './Preview'
import Body from './Body'
// import VerticalScroll from '../VeritcalScroll/VerticalScroll'
import React, { 
    useState 
} from 'react'
import {
    NextButton,
    ButtonContainer,
    PreviewButton,
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
            y: '10',
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
            y: '20vh',
        },
        transitionStart: {
            x: 0,
            opacity: 1,
            // y: '10',
        },
        transitionBack: {
            x: 2000,
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
    },
    preview: {
        initial: {
            y: '-200vh',
            opacity: 0,
        },
        transitionStart: {
            opacity: 1,
            y: 0,
        },
        transitionBack: {
            x: 2000,
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
    const [titlePhotoProps, setTitlePhotoProps] = useState('initial')
    const [categoryLocationProps, setCategoryLocationProps] = useState('initial')
    const [bodyProps, setBody] = useState('initial')
    const [previewProps, setPreviewProps] = useState(false)
    const [switchValue, setSwitchValue] = useState(1)

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
                setBody('transitionBack')
                setCategoryLocationProps('transitionStart')
                setSwitchValue(2)
                break
            default: 
                return null
        }
    }

    const preview = () => {
        setPreviewProps(!previewProps)
    }

    return(
        <div>
            <Preview previewProps={previewProps} animationMap={animationMap}></Preview>
            <PreviewButton onClick={preview}>Preview</PreviewButton>
            {previewProps ? 
            null
            :
            <div>
                <TitlePhoto animationMap={animationMap} setTitlePhotoProps={setTitlePhotoProps} transition={titlePhotoProps}/>
                <CategoryLocation animationMap={animationMap} categoryLocation={categoryLocationProps}/>
                {/* <VerticalScroll scrollHeight='60vh' maxHeight='65vh'> */}
                    <Body animationMap={animationMap} bodyProps={bodyProps}></Body>
                {/* </VerticalScroll> */}
            <ButtonContainer>
                <NextButton onClick={transitionSwitchBack}>Back</NextButton>
                <NextButton onClick={transitionSwitchNext}>Next</NextButton>
            </ButtonContainer>
            </div>
            }
        </div>
    )
}




export default AddContent