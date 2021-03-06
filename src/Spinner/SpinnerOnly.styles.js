import styled, { keyframes } from 'styled-components'

const ring = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
    &::after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #fff;
        border-color: ${props=>props.spinnerColor} transparent ${props=>props.spinnerColor} transparent;
        animation: ${ring} 2.5s linear infinite;
    }
`

export const CenterSpinner = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 21;
`