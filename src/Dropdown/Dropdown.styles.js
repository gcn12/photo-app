import styled from 'styled-components'

export const Container = styled.div`
    width: 250px;
    background-color: black;
    position: absolute;
`

export const Collection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    height: 30px;
    &:hover {
        background-color: gray;
    }
`

export const Warning = styled.div`
    color: red;
`

export const CreateNewButton = styled.button`
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
    width: 200px;
    font-size: 15px;
    transition: background-color 350ms;
    cursor: pointer;
`

export const CreateNewInput = styled.input`
    display:inline-block;
    border: 0.1em solid #FFFFFF;
    margin: 0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    color: white;
    background-color: black;
    height: 30px;
    font-size: 17px;
`

export const CreateNewSubmit = styled.button`
    height: 35px;
`