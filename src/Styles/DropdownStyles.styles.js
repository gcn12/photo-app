import styled from 'styled-components'

export const Container = styled.div`
    height: auto;
    width: auto;
    position: absolute;
    background-color: white;
    font-size: ${props=>props.fontSize};
    transform: ${props=> props.translateContainer};
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    z-index: 1;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
    /* transition: max-width 600ms; */
`

export const Options = styled.div`
    display: flex;
    flex-direction: column;
`

export const OptionIcon = styled.div`
    white-space: nowrap;
    color: #242424;
    margin-right: 15px;
`

export const OptionText = styled.div`
    /* margin: 0px 0px 0 5px; */
    white-space: nowrap;
    color: #242424;
`

export const Triangle = styled.div`
    width: 0; 
    height: 0; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 4;
    transform: ${props=>props.shift};
    display: initial;
    /* &:hover {
        border-bottom: 10px solid #dedede;
    } */
`

export const OptionIconContainer = styled.div`
    padding: 5px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    border-radius: ${props=>props.radius};
    &:hover {
        background-color: #dedede;
    }
`

