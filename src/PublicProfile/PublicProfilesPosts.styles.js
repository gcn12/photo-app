import styled from 'styled-components'

export const Container = styled.div`
    opacity: ${props=> props.visibility};
    margin-top: 30px;
`

export const Image = styled.img`
    cursor: pointer;
    /* width: 300px; */
    width: 100%;
    min-width: 200px;
    /* max-width: 350px; */
    height: 220px;
    object-fit: cover;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
    transition: box-shadow 400ms ease-in-out;
    &:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, .4);
    }
`

export const Title = styled.div`
    font-size: 25px;
    font-weight: 500;
    cursor: pointer;
    color: #242424;
`

export const Location = styled.div`
    font-size: 16px;
    color: #242424;
`

export const TitleGearContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    cursor: pointer;
    /* position: relative; */
`
