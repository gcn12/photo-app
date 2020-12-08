import styled from 'styled-components'

export const Container = styled.div`
    cursor: pointer;
`

export const Image = styled.img`
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    transition: box-shadow 400ms ease-in-out;
    &:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, .4);
    }
`

export const Title = styled.div`
    
`