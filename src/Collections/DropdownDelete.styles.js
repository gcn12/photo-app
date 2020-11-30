import styled from 'styled-components'

export const Container = styled.div`
    width: 100px;
    height: 40px;
    position: absolute;
    background-color: white;
    font-size: 20px;
    transform: translate(-93%, 0%);
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: black;
    border: 1px black solid;

    &:hover {
        background-color: #525252;
        color: white;
    }
`