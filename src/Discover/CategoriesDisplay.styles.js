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
    @media(max-width: 720px) {
        width: calc(100vw * 3 / 5 );
    }
`

export const GradientDarken = styled.div`
    &::before {
        @media(max-width: 720px) {
            content: '';
            position:absolute;
            top:0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0) 20%,rgba(0,0,0,.6) 100%);
            z-index: 1;
        }
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
    @media(max-width: 720px) {
        visibility: visible;
        opacity: 1;
        bottom: -100%;
        left: ${props=>props.smallImage === '1' ? '50%' : '2%'};
        transform: ${props=>props.smallImage === '1' ? 'translate(-50%, 24%)' : 'translate(0%, 24%)'};
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
    @media(max-width: 720px) {
        width: calc(100vw * 2 / 5 );
    }
`

export const ImagesContainer = styled.div`
    display: flex;
    height: auto;
`

export const PhotoTextContainer = styled.div`
    &:hover ${CategoryText}{
        @media(min-width: 720px) {
            visibility: visible;
            opacity: 1;
            transition: opacity 400ms ease-in-out;
        }
    }
    &:hover ${SmallImage}{
        @media(min-width: 720px) {
            filter: brightness(.4);
        }
    }
    &:hover ${LargeImage}{
        @media(min-width: 720px) {
            filter: brightness(.4);
        }
    }
    z-index: 3;
    cursor: pointer;
`