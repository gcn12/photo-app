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
    ElementSpacings
} from '../FeaturedPost/FeaturedPost.styles'

const Preview = (props) => {
    return( 
        <PreviewContainer styles={props.styles}>
        {/* <div style={{margin: '10px 0 105px 0'}}> */}
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
                                <div>
                                    <Description font={props.font}>{Object.values(props.itemsToUploadData)[item][1]}</Description>
                                    {Object.values(props?.itemsToUploadData)[index+1]
                                    ?
                                    <PostSpacings element={Object.values(props?.itemsToUploadData)[index+1][0]} imagesSpacing='32px' captionSpacing='00px' headerSpacing='32px' paragraphSpacing='16px'  />
                                    :
                                    null
                                    }
                                </div>
                                :
                                null
                                }
                                {Object.values(props.itemsToUploadData)[item][0] === 'caption' && Object.values(props.itemsToUploadData)[item][1].length > 0 ? 
                                <div>
                                    <Caption font={props.font}>{Object.values(props.itemsToUploadData)[item][1]}</Caption>
                                    {Object.values(props?.itemsToUploadData)[index+1] &&
                                    <PostSpacings element={Object.values(props?.itemsToUploadData)[index+1][0]} imagesSpacing='32px' captionSpacing='00px' headerSpacing='32px' paragraphSpacing='32px'  />
                                    }
                                </div>
                                :
                                null
                                }
                                {Object.values(props.itemsToUploadData)[item][0] === 'header' && Object.values(props.itemsToUploadData)[item][1].length > 0 ? 
                                <div>
                                    <Header font={props.font}>{Object.values(props.itemsToUploadData)[item][1]}</Header>
                                    {Object.values(props?.itemsToUploadData)[index+1]
                                    ?
                                    <PostSpacings element={Object.values(props?.itemsToUploadData)[index+1][0]} imagesSpacing='0px' captionSpacing='00px' headerSpacing='0px' paragraphSpacing='8px'  />
                                    :
                                    null
                                    }
                                </div>
                                :
                                null
                                }
                                {Object.values(props.itemsToUploadData)[item][0] === 'images' ? 
                                <div>

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
                                    {Object.values(props?.itemsToUploadData)[index+1]
                                    ?
                                    Object.values(props?.itemsToUploadData)[index+1][1].length > 0 ?  
                                    <div style={{marginBottom: '4px'}}></div>
                                    :
                                    Object.values(props?.itemsToUploadData)[index+2] &&
                                    <div>
                                        {console.log('hello')}
                                        <PostSpacings element={Object.values(props?.itemsToUploadData)[index+2][0]} imagesSpacing='8px' captionSpacing='4px' headerSpacing='32px' paragraphSpacing='32px'  />
                                    </div>
                                    :
                                    null
                                    }
                                </div>
                                :
                                null
                                }
                        </BodyContainer>
                        )
                    })}
            {/* </PreviewContainer2> */}
        {/* </div> */}
        <div style={{marginBottom: '100px'}}></div>
        </PreviewContainer>
    )
}

const PostSpacings = (props) => {
    return(
        <div>
            {props.element==='images' && 
            <ElementSpacings spacing={props.imagesSpacing} />
            }
            {props.element==='caption' && 
            <ElementSpacings spacing={props.captionSpacing} />
            }
            {props.element==='header' && 
            <ElementSpacings spacing={props.headerSpacing} />
            }
            {props.element==='paragraph' && 
            <ElementSpacings spacing={props.paragraphSpacing} />
            }
        </div>
    )
}
 
export default Preview