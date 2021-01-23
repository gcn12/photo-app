import styled from 'styled-components'

export const Photo = styled.img`
    height: 60px;
    width: 60px;
    object-fit: cover;
    border-radius: 50%;
`

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

export const Container2 = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    &:hover{
        background-color: #d1d1d1;
    }
`