import styled from 'styled-components'
import { motion } from 'framer-motion'

export const ButtonContainer = styled.div`
    background-color: yellow;
    border-top: 1px solid black;
    position: fixed;
    padding: 15px;
    bottom: 0px;
    width: 100%;
    /* position:absolute;
    bottom:30px;
    width:100%; */
    display: flex;
    justify-content: space-evenly;
`

export const NextButton = styled.button`
    /* position: absolute; */
    /* right: 150px; */
    justify-content: flex-end;
    cursor: pointer;
    color: white;
    background-color: #141414;
    border: none;
    width: ${props => props.width};
    /* width: 120px; */
    height: 50px;
    cursor: pointer;
    transition: background-color 400ms;

    &:hover {
        background-color: #212121;
    }
`

export const Container = styled(motion.div)`
    /* height: 110vh; */
    visibility: ${props=> props.visibility ? 'null' : 'hidden'};
    display: ${props=> props.visibility ? 'flex' : 'none'};
    /* left: 20%;
    top: 40%;
    position: absolute;  */
    /* display: flex; */
    flex-wrap: wrap;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
`

export const CategoryLocationContainer = styled(motion.div)`
    /* height: 110vh; */
    /* position: relative;  */
    visibility: ${props=> props.visibility ? 'null' : 'hidden'};
    display: ${props=> props.visibility ? 'flex' : 'none'};
    /* top: 3%;
    left: 20%;
    position: absolute; */
    /* display: flex; */
    flex-wrap: wrap;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
`

export const FileUpload = styled.input`
    margin: 20px 0;
`

export const PreviewContainer = styled.div`

`

export const PreviewImage = styled.img`
    /* height: 450px; */
    height: 55vh;
    width: auto;
`

export const SubmitButton = styled.button`
    cursor: pointer;
    color: white;
    background-color: #141414;
    border: none;
    width: 120px;
    height: 50px;
    cursor: pointer;
    transition: background-color 400ms;

    &:hover {
        background-color: #212121;
    }
`

export const NewItemButton = styled.button`
    color: white;
    background-color: #141414;
    border: none;
    width: ${props=> props.long ? '60vw ': '40vw'};
    /* width: 40vw; */
    height: 50px;
    cursor: pointer;
    transition: background-color 400ms;

    &:hover {
        background-color: #212121;
    }
`

export const RemoveLastElement = styled.button`
    color: white;
    background-color: #ff6257;
    border: none;
    width: 20vw;
    height: 50px;
    cursor: pointer;
    transition: background-color 400ms;
    margin: 20px 0;

    &:hover {
        /* background-color: #212121; */
    }
`

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const TextInput = styled.input`
    width: 60vw;
    height: 40px;
    font-size: 20px;
    margin-bottom: 20px;
`

export const DescriptionInput = styled.textarea`
    width: 60vw;
    height: 150px;
    font-size: 20px;
`

export const SelectInput = styled.select`
    width: 60vw;
    height: 40px;
    font-size: 20px;
`

export const Label = styled.label`
    font-size: 30px;
`

export const BodyButtonContainer = styled.div`
    display: flex;
    align-items: center;
`