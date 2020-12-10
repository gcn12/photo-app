import styled from 'styled-components'

export const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow:  0 0 5px 5px  rgba(40, 40, 40, .07);
`

export const Container = styled.div`
    width: 250px;
    height: 600px;
    background-color: #fcfcfc;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: justify;
    padding: 10px 20px;
    border-radius: 3px;
    box-shadow: 0 0 5px 3px rgba(10, 10, 10, .1);
    margin: 30px;
`

export const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    /* grid-template-columns: repeat(3, auto); */
    grid-column-gap: 30px;
    margin: 0 50px 0 400px;
    justify-items: end;
    justify-content: end;
`