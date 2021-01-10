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
    /* display: inline-block; */
    /* width: 80px;
    height: 80px; */
    /* position: fixed;
    top: 0%;
    left: 0%;
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%); */
    &::after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #fff;
        border-color: #4D4D4D transparent #4D4D4D transparent;
        animation: ${ring} 2s linear infinite;
    }
`