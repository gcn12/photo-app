import styled from 'styled-components'

export const Image = styled.img`
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 50%; 
    margin-top: 10px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, .2);
    border: 4px solid rgba(255, 255, 255, 1);
`

export const Container = styled.div`
    opacity: ${props=> props.opacity};
    transition: opacity 400ms ease-in-out;
    background-color: #fafafa;
    height: 350px;
    width: 270px;
    margin-bottom: 20px;
    position: relative;
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, .1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const BackgroundHeader = styled.div`
    height: 200px;
    width: 270px;
    background-color: #d5dfe6;
`

export const HeaderImage = styled.img`
    height: 140px;
    width: 300px;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
`

export const Username = styled.div`
    font-size: 24px;
    font-weight: 600;
    margin: 10px 0 5px 0;
`

export const Name = styled.div`
    font-size: 14px;
    font-weight: 300;
    margin: 0px 0 15px 0;
`

export const Bio = styled.div`
    font-size: 14px;
    padding: 0 14%;
    vertical-align: middle; 
    text-align: center; 
    margin: 0 0 20px 0;
`

export const Follow = styled.button`
    border: 1px solid black;
    padding: 5px 10px;
    background-color: #fafafa;
    font-size: 18px;
    cursor: pointer;
`