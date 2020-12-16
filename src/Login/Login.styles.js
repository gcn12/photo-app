import styled from 'styled-components'

export const TextField = styled.input`
    width: 40vw;
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
    border: 0.1em solid #242424;
    margin: 0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-weight:300;
    /* color:#FFFFFF; */
    text-align:center;
    transition: all 0.2s;
    background-color: transparent;
    width: 120px;
    font-size: 20px;
    transition: color 300ms;
    transition: background-color 350ms;

    &:hover{
        background-color: #242424;
        color: #FFFFFF;
        cursor: pointer;
    }
`

export const Text = styled.div`
    /* color: white; */
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const Container2 = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 55px;
`