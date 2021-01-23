import styled from 'styled-components'

export const CenterContainer = styled.div`
    margin-top: 24px;
    position: absolute;
    left: ${props=>props.styles.left};
    transform: translate(-50%, -50%);
    top: 45%;
    margin: 30px 0;
    display: ${props=>props.styles.display};
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
    opacity: ${props=> props.styles.opacity}; 
    visibility: ${props=> props.styles.visibility}; 
    overflow-y: scroll;
    max-height: calc(100vh - 150px);
    max-height: calc(-webkit-fill-available - 150px);
    /* margin-top: 18px; */
    /* display: ${props=> props.styles.visibility}; */
    /* @media(max-height: 800px) {
        max-height: 60vh;
    } */
`

export const Container = styled.div`
    display: flex;
    /* flex-wrap: wrap; */
    flex-direction: column; 
    align-items: center;
    justify-content: center;
`

export const FileUpload = styled.label`
    margin: 10px 0 0 0;
    border: 1px solid black;
    padding: 5px;
    color: black;
    cursor: pointer;
    font-size: 20px;
`

export const PreviewImage = styled.img`
    /* height: 450px; */
    max-height: 45vh;
    max-width: 90vw;
    width: auto;
    display: ${props => props.display};
    opacity: ${props => props.opacity};
    transition: 500ms ease-in-out;
    object-fit: contain;
    @media(max-height: 700px) {
        max-height: 30vh;
    }
    @media(max-height: 450px) {
        max-height: 20vh;
    }
`

export const TextInput = styled.input`
    width: 60vw;
    height: 40px;
    font-size: 20px;
    margin-bottom: 20px;
`

export const Label = styled.label`
    font-size: 30px;
    color: #242424;
    @media(max-width: 900px) {
        font-size: 24px;
    }
    @media(max-width: 720px) {
        font-size: 20px;
    }
`