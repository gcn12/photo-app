import styled from 'styled-components'

export const TextField = styled.input`
    width: 40vw;
    max-width: 300px;
    height: 35px;
    font-size: 20px;
    transition: height 500ms;
    margin-bottom: 20px;

    &:focus {
        height: 40px;
    }

    @media (max-width: 600px) {
        width: 75vw;
    }
`

export const SubmitButton = styled.button`
    text-decoration:none;
    font-weight:300;
    text-align:center;
    color: #fcfcfc;
    background-color: #242424;
    width: 40vw;
    max-width: 300px;
    border: none;
    height: 48px;
    font-size: 20px;
    cursor: pointer;
`

export const Text = styled.label`
    margin-bottom: 5px;
    color: #242424;
`

export const Container = styled.div`
    background-color: #fcfcfc;
    border-radius: 10px;
    /* padding: 40px;
    display: flex;
    flex-direction: column; */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 21;
    padding: 20px 40px 40px 40px;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
`