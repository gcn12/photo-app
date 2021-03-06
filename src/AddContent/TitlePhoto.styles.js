import styled from 'styled-components'

export const FileInput = styled.input`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap; /* 1 */
    clip-path: inset(50%);
    border: 0;
`

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
`

export const Container = styled.div`
    display: flex;
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