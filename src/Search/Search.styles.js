import styled from 'styled-components'

export const ResultsContainer = styled.div`
    width: 320px;
    background-color: #ededed;
    position: absolute;
    left: -30%;
    z-index: 3;
    opacity: .96;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, .4);
`

export const Container = styled.div`
    position: relative;
`

export const SearchBox = styled.input`
    height: 20px;
    width: 200px;
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