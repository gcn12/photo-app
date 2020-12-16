import styled from 'styled-components'

export const PhotoTextContainer = styled.div`
    position: relative;
`

export const PhotoTitle = styled.div`
    color: white;
    /* position: absolute;
    top: 50%;
    left: 50%; */
    /* transform: translate(-50%, -50%); */
    opacity: 0;
    transition: opacity 500ms;
    transition-delay: 250ms;
    font-size: 30px;
    white-space: nowrap;
`

export const PhotoLocation = styled.div`
    /* position: absolute;
    top: 55%;
    left: 50%; */
    /* margin-left: -5px; */
    /* transform: translate(-50%, -50%); */
    opacity: 0;
    transition: opacity 500ms;
    transition-delay: 250ms;
    font-size: 20px;
    white-space: nowrap;
    color: white;
`

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const Image = styled.img`
    filter: brightness(1);
    transition: filter 2000ms ease;
    transition: 800ms ease;
    transition-delay: 250ms;

    @media(min-width: 1100px) {
        width: 24vw;
    }

    @media(max-width: 900px) {
        width: 30vw;
    }

    @media(max-width: 500px) {
        width: 48vw;
    }
`

export const PhotoContainer = styled.div`
    cursor: pointer;

    &:hover ${PhotoTitle}{
        opacity: 1;
    }

    &:hover ${PhotoLocation}{
        opacity: 1;
    }

    &:hover ${Image} {
        filter: brightness(.3);
    }
`