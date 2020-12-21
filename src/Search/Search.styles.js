import styled from 'styled-components'

export const ResultsContainer = styled.div`
    width: 320px;
    background-color: #ededed;
    position: absolute;
    left: -30%;
    z-index: 3;
    opacity: .96;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, .4);
    @media (max-width: 690px) {
        left: -70%;
    }
`

export const Container = styled.div`
    position: relative;
`

export const SearchBox = styled.input`
    text-indent: 30px;
    border: 0;
    padding: 3px;
    /* border: 1px solid black; */
    background-color: #ededed;
    border-radius: 15px;
    height: 28px;
    font-size: 20px;
    width: 300px;
    /* float: right; 
    clear: both;  */
    /* box-shadow: 0px 5px 6px rgba(0, 0, 0, .1); */
    &::-webkit-input-placeholder {
        text-indent: 30px;
    }

    &:-moz-placeholder { /* Firefox 18- */
        text-indent: 30px;
    }

    &::-moz-placeholder {  /* Firefox 19+ */
        text-indent: 30px;
    }

    &:-ms-input-placeholder {  
        text-indent: 30px;
    }

    @media (max-width: 690px) {
        width: 130px;
    }
    @media (max-width: 550px) {
        visibility: hidden;
        display: none;
    }
`

export const MoreResults = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px 15px;
    cursor: pointer;
    &:hover{
        /* background-color: gainsboro; */
        background-color: #d1d1d1;
    }
`

export const IconContainer = styled.div`
    cursor: pointer;
    @media (max-width: 550px) {
        visibility: hidden;
        display: none;
    }
`