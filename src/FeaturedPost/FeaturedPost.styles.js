import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const InfoContainer = styled.div`
    /* width: 80%; */
    display: flex;
    justify-content: ${props=> props.justify};
    align-items: center;
`

export const Title = styled.div`
    /* color: #242424; */
    font-size: 60px;
    font-family: ${props=> props.font};
    font-weight: 400;
    margin-top: 20px;
    @media (max-width: 1000px) {
        /* width: 85vw; */
        font-size: 50px;
    }
    @media (max-width: 500px) {
        /* width: 90vw; */
        font-size: 40px;
    }
    
`

export const MainImage = styled.img`
    /* height: 90vh; */
    /* height: ${props=> props.height};
    width: ${props=> props.width}; */
    height: auto;
    width: auto;
    max-height: 90vh;
    max-width: 90vw;
    display: block;
`

export const Author = styled.div`
    color: #595959;
    font-size: 25px;
    /* color: #242424; */
    cursor: pointer;
    font-weight: 300;
    font-family: ${props=> props.font};
    margin: 15px 0 40px 0;
`

export const DateStyle = styled.div`
    /* color: #242424; */
    font-family: ${props=> props.font};
    font-size: 20px;
`

export const Description = styled.div`
    font-family: ${props=> props.font};
    /* color: white; */
    width: 50vw;
    margin: 10px 0 20px 0;
    font-size: 20px;
    white-space: pre-wrap;
    line-height: 35px;
    /* text-align: justify; */
    text-justify: inter-word;
    @media (max-width: 1300px) {
        width: 60vw;
        margin: 0px;
    }
    @media (max-width: 1000px) {
        width: 85vw;
        margin: 0px;
    }
    @media (max-width: 500px) {
        width: 90vw;
        margin: 0px;
    }
`

export const AddCollectionHeartContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

export const BodyImage = styled.img`
    /* width: ${props=> `${props.width}`}; */
    width: ${props=> props.imageQuantity > 1 ? `calc(${props.width} * 65vw - ${props.imageGap} * ${props.width})` : 'auto'};
    /* width: calc(5 * 65)vw; */
    margin:  ${props=>  props.margin};
    max-height: 90vh;
    max-width: 65vw;
    display: block;
    cursor: pointer;
    @media (max-width: 1000px) {
        /* margin: 0; */
        /* width: ${props=> props.imageQuantity > 1 ? `calc(${props.width} * 90vw)` : 'auto'}; */
        width: ${props=> props.imageQuantity > 1 ? `calc(${props.width} * 90vw - ${props.imageGap} * ${props.width})` : 'auto'};
        max-width: 90vw;
    }
`

export const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: ${props=> props.margin};
`

export const BodyImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0 5px 0;
`

export const Header = styled.div`
    font-size: 42px;
    font-family: ${props=> props.font};
    font-weight: 400;
    width: 50vw;
    @media (max-width: 1000px) {
        width: 85vw;
        font-size: 35px;
    }
    @media (max-width: 500px) {
        width: 90vw;
    }
`

export const Caption = styled.div`
    font-size: 20px;
    font-weight: 300;
    font-family: ${props=> props.font};
    margin: 0 0 30px 0;
    @media (max-width: 1000px) {
        width: 85vw;
    }
    @media (max-width: 500px) {
        width: 90vw;
    }
`

export const PostFooterContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 100px 0;
`

export const ButtonLabelContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ButtonLabel = styled.div`
    margin-top: 10px;
    font-size: 17px;
    font-weight: 300;
`