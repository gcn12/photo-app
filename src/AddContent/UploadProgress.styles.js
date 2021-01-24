import styled from 'styled-components'

export const UploadingTitle = styled.div`
    font-size: 30px;
    white-space: nowrap;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 70%);
`

export const ProgressContainer = styled.div`
    visibility: ${props=>props.display};
`

export const CircleContainer = styled.div`
    position: fixed;
    top: -50%;
    left: 50%;
    transform: translate(-50%, -70%);
    z-index: 10;
`