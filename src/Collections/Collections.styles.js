import styled from 'styled-components'

export const Image = styled.img`
    height: ${props => props.height};
    width: ${props => props.width};
`

export const ImagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-height: 270px;
    max-width: 270px;
    overflow: hidden;
    cursor: pointer;
`

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`