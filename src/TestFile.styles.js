import styled from 'styled-components'

export const Container = styled.div`
    /* max-height: 90vh; */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    object-fit: contain;

`

export const Image = styled.img`
    /* width: auto;
    height: auto; */
    max-width: 200px;
    max-height: 400px;
`