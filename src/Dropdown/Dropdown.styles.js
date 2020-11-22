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
    cursor: pointer;
    height: 30px;
    &:hover {
        background-color: gray;
    }
`

export const Warning = styled.div`
    color: red;
`