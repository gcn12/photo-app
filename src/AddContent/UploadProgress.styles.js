import styled from 'styled-components'
import { motion } from 'framer-motion'

export const UploadingTitle = styled.div`
    font-size: 30px;
`

export const ProgressContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    visibility: ${props=> props.visibility ? 'null' : 'hidden'};
    display: ${props=> props.visibility ? 'null' : 'none'};
`