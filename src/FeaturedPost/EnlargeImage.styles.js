import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
    /* z-index: 3;
    box-shadow: 0px 0px 1px 100vmax rgba(0,0,0,0.8);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
    position: relative;
`

const scaleIn = keyframes`
    from { transform: scale(.9); }
        to { transform: scale(1); }
    }
`;

const fadeIn = keyframes`
    from { opacity: .4; }
        to { opacity: 1; }
    }
`;

export const Image = styled.img`
    /* opacity: ${props=>props.opacity}; */

    /* max-height: 92vh;
    max-width: 92vw; */
    /* transform: ${props=> props.scale};
    transition: transform 300ms ease-in-out; */
    overflow: visible;
    /* object-fit: contain; */
    /* animation: ${fadeIn} 2s, ${scaleIn} 700ms ease-in-out; */
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


    /* opacity: ${props=>props.opacity}; */
    width: 400px;
    height: 400px;
    background-color: white;
`

export const Close = styled.div`
    z-index: 4;
    right: 1%;
    top: -1.5%;
    /* transform: translate(50%, 50%); */
    font-size: 60px;
    position: fixed;
    color: white;
    cursor: pointer;
`