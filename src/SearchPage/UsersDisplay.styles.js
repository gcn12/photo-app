import styled from 'styled-components'

export const Image = styled.img`
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 50%; 
    margin-top: 10px;
    border: 1px solid rgba(0, 0, 0, .3);
    /* position: absolute;
    top: 30%;
    left: 35%; */
`

export const Container = styled.div`
    opacity: ${props=> props.opacity};
    transition: opacity 400ms ease-in-out;
    background-color: #fafafa;
    height: 400px;
    width: 303px;
    margin-bottom: 20px;
    /* position: relative; */
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, .1);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const HeaderImage = styled.img`
    height: 90px;
    width: 90px;
    margin: 10px 3px;
    object-fit: cover;
    border-radius: 5px;
`

export const Name = styled.div`
    font-size: 22px;
`

export const Username = styled.div`
    font-size: 17px
`

export const Bio = styled.div`
    font-size: 14px;
    padding: 0 7%;
`

export const Follow = styled.button`
    border: 1px solid black;
    padding: 5px 10px;
    background-color: #fafafa;
    font-size: 17px;
    cursor: pointer;
`