import styled from 'styled-components'

export const Container = styled.div`
    width: auto;
    /* min-width: 220px; */
    min-height: 80px;
    position: absolute;
    background-color: white;
    font-size: 20px;
    /* transform: translate(-95%, 31%); */
    transform: ${props=> props.translateContainer};
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
`

export const Options = styled.div`
    display: flex;
    flex-direction: column;
`

export const Option = styled.div`
    padding: 10px 10px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
        background-color: #dedede;
    }
`