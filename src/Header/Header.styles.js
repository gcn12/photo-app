import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 30px 0;
`

export const UL = styled.ul`
    width: 90%;
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    font-size: 25px;
    &:hover{
        color: #4a4a4a
    }
`

export const LI = styled.li`
    cursor: pointer;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
`

export const Border = styled.div`
    border-bottom: 2px solid #c2c2c2;
`

export const Navigation = styled.div`
    cursor: pointer;
    font-size: 22px;
    margin: 0 5px;
    &:hover{
        color: #4a4a4a
    }
`


// .test {
//     display: flex;
//     justify-content: center;
//   }
  
// ul {
//     width: 90%;
//     padding: 0;
//     margin: 0;
//     list-style-type: none;
//     color: whitesmoke;
//     display: flex;
//     justify-content: space-between;
//     font-size: 25px;
//   }