import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(400px,1fr));
    grid-auto-rows: 200px;
`

export const Image = styled.img`
    width: 400px;
`