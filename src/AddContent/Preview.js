import React from 'react'
import { ReactComponent as Compass } from '../Icons/Compass.svg'
import {
    PreviewContainer,
} from './Preview.styles'
import {
    Author,
    Title,
    Description,
    MainImage,
    Container,
    BodyContainer,
    BodyImageContainer,
    Header, 
    Caption,
    InfoContainer,
    BodyImage,
} from '../FeaturedPost/FeaturedPost.styles'

const Preview = (props) => {
    return( 
        <PreviewContainer initial='initial' visibility={props.animationMap.preview[props.previewProps].opacity} transition='transition' animate={props.previewProps} variants={props.animationMap.preview}>
        <div style={{margin: '10px 0 65px 0'}}>
            <Container>
            {/* <PreviewContainer2> */}
                <div>
                    {props?.filesLarge[0] ? 
                    <MainImage id='test'  width={props.isImageHorizontal ? '80vw' : 'auto'} height={props.isImageHorizontal ? 'auto' : '80vh'} alt='display' src={props?.filesLarge[0][0]}></MainImage>
                    :
                    null
                    }

                </div>
                {document.getElementById('add-content-title') ? 
                <Title font={props.font}>{document.getElementById('add-content-title').value}</Title>
                :
                null 
                }
                <InfoContainer justify='center'>
                    {/* <Link to={`/photo-app/profiles/${props?.photoInformation?.username}`} style={{textDecoration: 'none'}}>
                        <Author font={props?.photoInformation?.font}>{props?.photoInformation?.author} | {props?.photoInformation?.username}</Author>
                    </Link> */}
                    <Compass style={{transform: 'scale(0.8)'}} />
                    <div style={{marginRight: '4px'}}></div>
                    {document.getElementById('autocomplete') ? 
                    <Author font={props.font}>{document.getElementById('autocomplete').value}</Author>
                    :
                    null
                    }
                </InfoContainer>
                </Container>
                {Object.keys(props.itemsToUploadData).map((item, index)=> {
                    return(
                            <BodyContainer margin='0px' key={index}>

                                {Object.values(props.itemsToUploadData)[item][0] === 'paragraph' ? 
                                <Description font={props.font}>{Object.values(props.itemsToUploadData)[item][1]}</Description>
                                :
                                null
                                }
                                {Object.values(props.itemsToUploadData)[item][0] === 'caption' ? 
                                <Caption font={props.font}>{Object.values(props.itemsToUploadData)[item][1]}</Caption>
                                :
                                null
                                }
                                {Object.values(props.itemsToUploadData)[item][0] === 'header' ? 
                                <Header font={props.font}>{Object.values(props.itemsToUploadData)[item][1]}</Header>
                                :
                                null
                                }
                                {Object.values(props.itemsToUploadData)[item][0] === 'images' ? 
                                <BodyImageContainer> 
                                {props.previewImages[item].map((image, i)=> {
                                    return(
                                        // <img src={} key={index}></img>
                                        // <BodyImage imageSizeRatioLength={props.previewImageSizeRatio[item].length} imageSizeRatio={props.previewImageSizeRatio[item][index]} bodyImages={props.bodyImages} i={index} image={image} index={index} key={index}></BodyImage>
                                        <div key={i}>
                                            {/* <BodyImage length={props?.photoInformation?.photoBodyMap[item].length} margin={props?.photoInformation?.photoBodyMap[item].length > 1 ? '0 .5%' : '0%'} width={props?.photoInformation?.photoBodyMap[item].length > 1 ? `${65 * props?.photoInformation?.photoBodyMap[item][i]}vw` : 'auto'} src={image} key={i}></BodyImage> */}
                                            {props.previewImageSizeRatio[item].length === 1 ? 
                                            <div>
                                                <BodyImage 
                                                imageQuantity={props.previewImageSizeRatio[item].length} 
                                                margin={props.previewImageSizeRatio[item].length > 1 ? '0 4px' : '0%'} 
                                                imageSize={`${65 * props.previewImageSizeRatio[item][i]}vw`} 
                                                // width={props?.photoInformation?.photoBodyMap[item].length > 1 ? `${65 * props?.photoInformation?.photoBodyMap[item][i]}vw` : 'auto'} 
                                                width={props.previewImageSizeRatio[item][i]} 
                                                imageGap='0px'
                                                src={image} key={i} 
                                                />
                                            </div>
                                            :
                                            null}
        
                                            {props.previewImageSizeRatio[item].length === 2 ? 
                                            <div>
                                                <BodyImage 
                                                imageQuantity={props.previewImageSizeRatio[item].length} 
                                                margin={props.previewImageSizeRatio[item].length > 1 ? '0 4px' : '0%'} 
                                                imageSize={`${65 * props.previewImageSizeRatio[item][i]}vw`} 
                                                // width={props?.photoInformation?.photoBodyMap[item].length > 1 ? `${65 * props?.photoInformation?.photoBodyMap[item][i]}vw` : 'auto'} 
                                                width={props.previewImageSizeRatio[item][i]} 
                                                imageGap='8px'
                                                src={image} key={i} 
                                                />
                                            </div>
                                            :
                                            null}
        
                                            {props.previewImageSizeRatio[item].length === 3 ? 
                                            <div>
                                                <BodyImage 
                                                imageQuantity={props.previewImageSizeRatio[item].length} 
                                                margin={props.previewImageSizeRatio[item].length > 1 ? '0 4px' : '0%'} 
                                                imageSize={`${65 * props.previewImageSizeRatio[item][i]}vw`} 
                                                // width={props?.photoInformation?.photoBodyMap[item].length > 1 ? `${65 * props?.photoInformation?.photoBodyMap[item][i]}vw` : 'auto'} 
                                                width={props.previewImageSizeRatio[item][i]} 
                                                imageGap='16px'
                                                src={image} key={i} 
                                                />
                                            </div>
                                            :
                                            null}
                                        </div>
                                        )
                                    })}
                                </BodyImageContainer>
                                :
                                null
                                }
                        </BodyContainer>
                        )
                    })}
            {/* </PreviewContainer2> */}
        </div>
        </PreviewContainer>
    )
}
 
export default Preview