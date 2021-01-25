import styled from 'styled-components'

export const BackgroundImage = styled.img`
    height: 100vh;
    width: 100vw;
    display: block;
    object-fit: cover;
`

export const Card = styled.div`
    height: 200px;
    width: 150px;
    background-color: green;
    position: absolute;
    top: 50%;
    left: 33%;
    transform: translate(-50%, -50%);

    color: #ecf0f1;
    border-radius: 8px;
    padding: 20px;
    background: rgba( 255, 255, 255, 0.2 );
    border: solid 1px rgba(255,255,255,0.1);
    backdrop-filter: blur(10px );
`