import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
    visibility: ${props=> props.visibility ? 'null' : 'hidden'};
    /* visibility: hidden; */
    /* display: none; */
    position: absolute;
    /* z-index: -1; */
    height: 100vh;
    width: 100vw;
    background-color: white;
`