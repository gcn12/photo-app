import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    position: relative;
`

export const UsersDisplayContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 50px;
    grid-row-gap: 50px;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const PhotoLeftContainer = styled.div`
    display: flex;
`

export const Image = styled.img`
    height: 200px;
    width: 250px;
    object-fit: cover;
`

export const Username = styled.div`
    font-size: 24px;
`