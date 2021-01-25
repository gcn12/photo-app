import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    position: relative;
`

export const Image = styled.img`
    height: 300px;
    width: 250px; 
    object-fit: cover;
`

export const PostsContainer = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const PostContainer = styled.div`
    position: relative;
    margin-right: 50px;
`

export const TextContainer = styled.div`
    box-shadow: 0px 5px 5px rgba(0, 0, 0, .3);
    width: 150px;
    height: 50px;
    background-color: #fcfcfc;
    position: absolute;
    bottom: -10%;
    left: 50%;
    transform: translate(-50%, -0%);
`

export const Header = styled.div`
    font-size: 20px;
    font-weight: 500px;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
`