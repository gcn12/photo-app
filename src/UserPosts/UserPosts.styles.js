import styled from 'styled-components'

export const Title = styled.div`
    /* color: white; */
    font-size: 25px;
`

export const Photo = styled.img`
    object-fit: cover;
    height: 180px;
    width: 180px;
    border-radius: 50%;
`

export const PostsContainer = styled.div`
    /* display: flex;
    flex-wrap: wrap;
    justify-content: space-between; */
    /* margin: 0 5%; */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    grid-gap: 20px;
    align-items: stretch;
    justify-items: center;
`

export const PostContainer = styled.div`
    margin: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const PostTitle = styled.div`
    /* color: white; */
    font-size: 20px;
    justify-self: center;
`