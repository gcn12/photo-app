import styled from 'styled-components'

export const SubmitButton = styled.button`
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
    width: 60vw;
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
    width: 60vw;
    height: 50px;
    cursor: pointer;
    transition: background-color 400ms;

    &:hover {
        /* background-color: #212121; */
    }
`

export const Container = styled.div`
    display: flex;
    justify-content: center;
`

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const TextInput = styled.input`
    width: 60vw;
    height: 40px;
    font-size: 20px;
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

export const PreviewImage = styled.img`
    height: 500px;
    width: auto;
    position: relative;
`