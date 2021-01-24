import styled from 'styled-components'

export const Title = styled.div`
    font-size: 36px;
    font-family: ${props=> props.font};
` 

export const AddCollectionHeartContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

export const Description = styled.div`
    width: 65vw;
    margin: 20px 0;
    font-size: 20px;
    white-space: pre-wrap;
    text-justify: inter-word;
    font-family: ${props=> props.font};
`

export const Author = styled.div`
    font-family: ${props=> props.font};
`

export const PreviewContainer = styled.div`
    margin: 200px 0px 0px 0px;
    visibility: ${props=> props?.styles?.visibility};
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
    display: ${props=>props.styles.display};
    opacity: ${props=> props?.styles?.opacity};
` 
 
export const PreviewContainer2 = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
`

export const BodyImagePreview = styled.img`
    width: ${props=> props.width};
    height: auto;
    margin: 0 1%;

    max-height: 85vh;
    max-width: 65vw;
    display: block;
`