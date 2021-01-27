import styled from 'styled-components'

export const LargeImage = styled.img`
    height: 35vw;
    width: calc(100vw / 3 * 2);
    object-fit: cover;
    display: block;
    transition: filter 300ms ease-in-out;
    @media(max-width: 800px) {
        height: 45vw;
    }
`

export const CategoryText = styled.div`
    visibility: hidden;
    color: white;
    font-size: 30px;
    font-weight: 600;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    opacity: 0;
    &:hover {
        visibility: visible;
        opacity: 1;
        transition: opacity 400ms ease-in-out;
    }
    @media(max-width: 800px) {
        font-size: 24px;
    }
    @media(max-width: 500px) {
        font-size: 18px;
    }
`

export const SmallImage = styled.img`
    height: 35vw;
    width: calc(100vw / 3);
    object-fit: cover;
    display: block;
    transition: filter 300ms ease-in-out;
    @media(max-width: 800px) {
        height: 45vw;
    }
`

export const ImagesContainer = styled.div`
    display: flex;
    height: auto;
`

export const PhotoTextContainer = styled.div`
    &:hover ${CategoryText}{
        visibility: visible;
        opacity: 1;
        transition: opacity 400ms ease-in-out;
    }
    &:hover ${SmallImage}{
        filter: brightness(.4);
    }
    &:hover ${LargeImage}{
        filter: brightness(.4);
    }
    z-index: 3;
    cursor: pointer;
`