import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
`

export const BackgroundImage = styled.img`
    height: 100vh;
    min-height: 800px;
    width: 100vw;
    display: block;
    object-fit: cover;
`

export const ImageContainer = styled.div`
    &::before{
        content: '';
        position:absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${props=>props.background};
        z-index: 1;
    }
`

export const ParagraphContainer = styled.div`
    position: absolute;
    top: ${props=>props.top};
    left: ${props=>props.left};
    transform: translate(-50%, -50%);
    width: 500px;
    z-index: 2;

    @media(max-width: 1300px) {
        /* top: ${props=>props.topSmall}; */
        left: ${props=>props.leftSmall};
    }

    @media(max-width: 900px) {
        top: ${props=>props.topSmall};
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

export const Title = styled.div`
    font-size: 48px;
    font-weight: 600;
    margin-bottom: 18px;
    color: #fcfcfc;
    @media(max-width: 900px) {
        font-size: 36px;
        margin-bottom: 14px;
    }
`

export const Paragraph = styled.div`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 36px;
    color: #fcfcfc;
    @media(max-width: 900px) {
        text-align: center;
        max-width: 350px;
        font-size: 14px;
        margin-bottom: 24px;
    }
`

export const ReadMoreButton = styled.button`
    background-color: white;
    /* border: 1px solid #242424; */
    border: none;
    border-radius: 2px; 
    color: #7a7a7a;
    font-size: 24px;
    padding: 8px 20px;
    cursor: pointer;
    @media(max-width: 900px) {
        font-size: 14px;
    }
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
    backdrop-filter: blur(10px);
`