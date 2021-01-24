import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    object-fit: contain;

`

export const Image = styled.img`
    max-width: 200px;
    max-height: 400px;
`