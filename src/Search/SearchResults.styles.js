import styled from 'styled-components'

export const Photo = styled.img`
    height: 60px;
    width: 60px;
    object-fit: cover;
    border-radius: 3px;
`

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    &:hover{
        /* background-color: gainsboro; */
        background-color: #d1d1d1;
    }
`

export const Text = styled.div`
    color: #242424;
`

