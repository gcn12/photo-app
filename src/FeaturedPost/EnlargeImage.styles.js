import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
    position: relative;
`

const fadeIn = keyframes`
    from { opacity: .4; }
        to { opacity: 1; }
    }
`;

export const Image = styled.img`
    overflow: visible;
    animation: ${fadeIn} 300ms ease-in-out;
    height: auto;
    width: auto;
    max-height: 88vh;
    max-width: 88vw;
`

export const ImageContainer = styled.div`
    display: ${props=>props.display};
    z-index: 4;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

export const Placeholder = styled.div`
    z-index: 3;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    background-color: white;
`

export const Close = styled.div`
    z-index: 4;
    right: 1%;
    top: -1.5%;
    font-size: 60px;
    position: fixed;
    color: white;
    cursor: pointer;
`