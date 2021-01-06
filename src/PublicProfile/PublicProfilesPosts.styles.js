import styled from 'styled-components'

export const Container = styled.div`
    margin-top: 30px;
    cursor: pointer;
`

export const Image = styled.img`
    /* width: 300px; */
    width: 100%;
    min-width: 200px;
    /* max-width: 350px; */
    height: 220px;
    object-fit: cover;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
    transition: box-shadow 400ms ease-in-out;
    &:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, .4);
    }
`

export const Title = styled.div`
    font-size: 25px;
    font-weight: 500;
    color: #242424;
`

export const Location = styled.div`
    font-size: 16px;
    color: #242424;
`
