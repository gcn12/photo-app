import styled from 'styled-components'

export const Container = styled.div`
    /* z-index: 3;
    box-shadow: 0px 0px 1px 100vmax rgba(0,0,0,0.8);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
    position: relative;
`

export const Image = styled.img`
    /* opacity: ${props=>props.opacity}; */
    /* max-height: 92vh;
    max-width: 92vw; */
    overflow: visible;
    /* object-fit: contain; */
    height: auto;
    width: auto;
    max-height: 92vh;
    max-width: 92vw;
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