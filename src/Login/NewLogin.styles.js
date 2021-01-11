import styled from 'styled-components'

export const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    width: 100vmax;
    height: 100vmax;
    background-color: rgba(0, 0, 0, .6);
`

export const BackgroundImage = styled.img`
    height: 80vh;
    width: 80vw;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    /* backdrop-filter: blur(5px); */
`

export const Login = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 80vh;
    filter: blur(10px);
    z-index: 9;
`
