import styled from 'styled-components'

export const Scroll = styled.div`
    -webkit-overflow-scrolling: touch;
    height: ${props => props.scrollHeight};
    max-height: ${props => props.maxHeight};
    overflow-Y: scroll;
    -webkit-overflow-scrolling: touch;
`