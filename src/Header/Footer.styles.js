import styled from 'styled-components'

export const Container = styled.div`
    position: fixed;
    bottom: 0px;
    background-color: #f5f5f5;
    border-top: 1px solid #b3b3b3;
    padding: 4px 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    z-index: 1;
    align-items: center;

    @media (min-width: 550px) {
        display: 'none';
        visibility: hidden;
    }
`

export const ProfileImage = styled.img`
    height: 24px;
    width: 24px;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid black;
`