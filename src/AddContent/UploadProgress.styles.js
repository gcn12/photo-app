import styled from 'styled-components'
import { motion } from 'framer-motion'

export const UploadingTitle = styled.div`
    font-size: 30px;
`

export const ProgressContainer = styled(motion.div)`
    /* position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    visibility: ${props=> props.visibility ? 'visible' : 'hidden'};
    display: ${props=> props.visibility ? 'flex' : 'none'};
`