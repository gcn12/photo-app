import styled from 'styled-components'

export const CenterContainer = styled.div`
    position: absolute;
    left: ${props=>props.styles.left};
    top: 50%;
    display: ${props=>props.styles.display};
    transform: translate(-50%, -50%);
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
    opacity: ${props=> props.styles.opacity}; 
    visibility: ${props=> props.styles.visibility}; 
    /* display: ${props=> props.styles.visibility}; */
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
    height: 45vh;
    width: auto;
    display: ${props => props.display};
    opacity: ${props => props.opacity};
    transition: 500ms ease-in-out;
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
`