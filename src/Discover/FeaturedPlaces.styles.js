import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    position: relative;
`

export const Image = styled.img`
    height: 25vw;
    width: 20vw; 
    object-fit: cover;
    @media(max-width: 950px) {
        height: 250px;
        width: 30vw; 
    }
    @media(max-width: 500px) {
        height: 200px;
        max-width: 50vw; 
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
    @media(max-width: 500px) {
        top: 10%;
    }
`