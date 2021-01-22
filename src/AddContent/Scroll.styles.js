import styled from 'styled-components'
// import { motion } from 'framer-motion'


export const ScrollContainer = styled.div`
    width: 100%;
    -webkit-overflow-scrolling: touch;
    height: calc(40vh - 80px);
    /* height: ${props => props.scrollHeight}; */
    /* max-height: ${props => props.maxHeight}; */
    overflow-Y: scroll;
`
// export const ScrollContainer = styled(motion.div)`
//     /* position: absolute;
//     left: 20%; */
//     /* visibility: hidden; */
//     /* display: none; */
//     visibility: ${props=> props.visibility ? 'null' : 'hidden'};
//     display: ${props=> props.visibility ? 'null' : 'none'};
//     width: 100%;
//     -webkit-overflow-scrolling: touch;
//     height: calc(100vh - 80px);
//     /* height: ${props => props.scrollHeight}; */
//     /* max-height: ${props => props.maxHeight}; */
//     overflow-Y: scroll;
// `