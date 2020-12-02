import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
`

export const MainImage = styled.img`
    /* height: 90vh; */
    height: ${props=> props.height};
    width: ${props=> props.width};
    max-height: 90vh;
    max-width: 90vw;
`

export const Author = styled.div`
    /* color: #242424; */
`

export const Description = styled.div`
    /* color: white; */
    width: 65vw;
    margin: 20px 0;
    font-size: 20px;
    white-space: pre-wrap;
    text-align: justify;
    text-justify: inter-word;
`

export const BodyImage = styled.img`
    width: ${props=> `${props.width}%`};
    /* width: calc(var(--vh, 1vh) * ${props=> `${props.width}`}); */
    height: auto;
    margin: 0 .5%;
`

export const BodyImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`