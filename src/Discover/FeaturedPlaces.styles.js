import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    min-height: 800px;
    position: relative;
    @media(max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
        min-height: 1400px;
    }
`

export const Image = styled.img`
    box-shadow: 0px 3px 4px 0 rgba(0,0,0,.3);
    height: 25vw;
    width: 20vw; 
    object-fit: cover;
    @media(max-width: 950px) {
        height: 250px;
        width: 40vw; 
    }
    @media(max-width: 600px) {
        height: 200px;
        min-width: 70vw; 
    }
    transition: filter 300ms ease-in-out;
`

export const Arrow = styled.div`
    position: absolute;
    top: 50%;
    left: 46%;
    transform: translate(-50%, -50%);
    transform: scale(2);
    opacity: 0;
`

export const ImageArrowContainer = styled.div`
    position: relative;
    &:hover ${Image} {
        filter: brightness(.5)
    }
    &:hover ${Arrow} {
        opacity: 1;
        transition: opacity 400ms ease-in-out;
    }
    z-index: 3;
`

export const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 50px;
    grid-row-gap: 50px;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media(max-width: 950px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media(max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

export const PostContainer = styled.div`
    position: relative;
    cursor: pointer;
`

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start
`

export const Header = styled.div`
    font-size: 20px;
    font-weight: 500px;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media(max-width: 950px) {
        top: 7%;
    }
    @media(max-width: 600px) {
        top: 6%;
    }
`