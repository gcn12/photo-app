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
    justify-content: space-between;
    align-items: center;
`

export const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: ${props=> props.margin}
`

export const Title = styled.div`
    /* color: #242424; */
    font-size: 40px;
    font-family: ${props=> props.font};
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
    color: #242424;
    font-size: 20px;
    /* color: #242424; */
    cursor: pointer;
    font-family: ${props=> props.font};
`

export const DateStyle = styled.div`
    /* color: #242424; */
    font-family: ${props=> props.font};
    font-size: 20px;
`

export const Description = styled.div`
    font-family: ${props=> props.font};
    /* color: white; */
    width: 45vw;
    margin: 20px 0;
    font-size: 20px;
    white-space: pre-wrap;
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

export const BodyImage = styled.img`
    width: ${props=> `${props.width}`};
    margin: ${props=> props.margin};
    max-height: 90vh;
    max-width: 65vw;
    display: block;
    /* @media (max-width: 950px) {
        margin: 0;
    } */
`

export const BodyImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const AddCollectionHeartContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`