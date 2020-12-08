import styled from 'styled-components'

export const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow:  0 0 5px 5px  rgba(40, 40, 40, .1);
`

export const Container = styled.div`
    /* max-width: 30%; */
    /* min-width: 200px; */
    width: 600px;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: justify;
    padding: 10px 20px;
    border-radius: 5%;
    box-shadow: 10px 5px 5px rgba(10, 10, 10, .2);
`

export const PostsContainer = styled.div`
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); */
    grid-template-columns: repeat(4, auto);
    grid-column-gap: 10px;
    /* align-items: stretch; */
    justify-items: center;
    justify-content: center;
`