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
    margin-top: 20px;
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
    font-size: 20px;
    /* color: #242424; */
    cursor: pointer;
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
    margin: 20px 0;
    font-size: 20px;
    white-space: pre-wrap;
    line-height: 35px;
    /* text-align: justify; */
    text-justify: inter-word;
    @media (max-width: 950px) {
        width: 60vw;
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
    width: ${props=> `${props.width}`};
    margin:  ${props=>  props.margin};
    max-height: 90vh;
    max-width: 65vw;
    display: block;
    /* @media (max-width: 950px) {
        margin: 0;
    } */
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
    margin: 35px 0;
`

