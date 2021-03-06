import styled from 'styled-components'

export const Container = styled.div`
    min-width: 100px;
    height: auto;
    padding: 10px 20px;
    background-color: white;
    box-shadow: 2px 5px 5px 5px rgba(0, 0, 0, .1);
    position: absolute;
    top: 100%;
    right: 0%;
    border-radius: 5px;
    z-index: 3;
`

export const Item = styled.div`
    color: #242424;
    padding: 5px;
    cursor: pointer;
    transition: background-color 80ms ease-in-out;
    &:hover{
        background-color: #dedede;
    }
`