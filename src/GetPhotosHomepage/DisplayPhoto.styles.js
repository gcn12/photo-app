import styled from 'styled-components'

export const PhotoTextContainer = styled.div`
    position: relative;
`

export const PhotoTitle = styled.div`
    color: white;
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 500ms;
    transition-delay: 250ms;
    font-size: 30px;
    white-space: nowrap;
`

export const PhotoLocation = styled.div`
    position: absolute;
    top: 57%;
    left: 50%;
    margin-left: -5px;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 500ms;
    transition-delay: 250ms;
    font-size: 20px;
    white-space: nowrap;
    color: white;
`

export const Image = styled.img`
    margin-bottom: 15px;
    filter: brightness(1);
    transition: 800ms ease;
    transition-delay: 250ms;

    @media(min-width: 1000px) {
        width: 22vw;
    }

    @media(max-width: 1000px) {
        width: 30vw;
    }

    @media(max-width: 700px) {
        width: 40vw;
    }

    animation: fadeIn ease 3s;
    -webkit-animation: fadeIn ease 3s;
    -moz-animation: fadeIn ease 3s;
    -o-animation: fadeIn ease 3s;
    -ms-animation: fadeIn ease 3s;
    
    @keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }

    @-moz-keyframes fadeIn {
        0% {opacity:0;} 
        100% {opacity:1;}
    }

    @-webkit-keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }

    @-o-keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }

    @-ms-keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
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
        filter: brightness(.3)
    }
`