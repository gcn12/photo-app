import styled from 'styled-components'

export const Image = styled.img`
    height: 160px;
    width: 160px;
    object-fit: cover;
    border-radius: 50%; 
`

export const Container = styled.div`
    opacity: ${props=> props.opacity};
    transition: opacity 400ms ease-in-out;
`