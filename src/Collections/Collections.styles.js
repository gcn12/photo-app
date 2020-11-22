import styled from 'styled-components'

export const Image = styled.img`
    height: ${props => props.height};
    width: ${props => props.width};
    object-fit: cover;
`

export const NoImage = styled.div`
    height: 268px;
    width: 270px;
    object-fit: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
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