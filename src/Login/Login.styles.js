import styled from 'styled-components'

export const TextField = styled.input`
    width: 400px;
    height: 30px;
    font-size: 20px;
    transition: height 500ms;

    &:focus {
        height: 40px;
    }
`

export const SubmitButton = styled.button`
    display:inline-block;
    padding: 0.35em 1.2em;
    border: 0.1em solid #FFFFFF;
    margin: 0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-weight:300;
    color:#FFFFFF;
    text-align:center;
    transition: all 0.2s;
    background-color: transparent;
    width: 120px;
    font-size: 20px;
    transition: color 300ms;
    transition: background-color 350ms;

    &:hover{
        background-color: white;
        color: black;
        cursor: pointer;
    }
`

export const Text = styled.div`
    color: white;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const Container2 = styled.div`
    display: flex;
    justify-content: center;
`