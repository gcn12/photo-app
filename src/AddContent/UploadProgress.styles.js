import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

export const UploadingTitle = styled.div`
    font-size: 30px;
    white-space: nowrap;
`

const dotty = keyframes`
    0%   { content: ''; }
    25%  { content: '.'; }
    50%  { content: '..'; }
    75%  { content: '...'; }
    100% { content: ''; }
`;

export const UploadingTitleAnimatedEllipses = styled.div`
    font-size: 30px;
    &::after{
        display: inline-block;
        animation: ${dotty} steps(1,end) 2.5s infinite;
        content: '';
    }
`

export const CenterUploadingProgress = styled.div`
    position: absolute;
    top: 120%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const ProgressContainer = styled(motion.div)`
    /* position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    position: relative;
    /* display: flex; */
    /* flex-direction: column;
    justify-content: center; */
    /* align-items: center; */
    visibility: ${props=> props.visibility ? 'visible' : 'hidden'};
    display: ${props=> props.visibility ? 'flex' : 'none'};
`

export const CircleContainer = styled.div`
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translate(-50%, -50%);
`