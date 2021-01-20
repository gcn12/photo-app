import styled from 'styled-components'

export const Container = styled.div`
    opacity: ${props=> props.visibility};
    /* margin-top: 30px; */
    margin-top: ${props=>props.marginTop};
    position: relative;
`

export const Image = styled.img`
    cursor: pointer;
    /* width: 300px; */
    width: 100%;
    /* min-width: 200px; */
    height: 14vw;
    min-width: ${props=>props.minWidth};
    /* height: ${props=>props.height}; */
    object-fit: cover;
    border-radius: 3px;
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, .2);
    transition: box-shadow 400ms ease-in-out;
    &:hover {
        box-shadow: 0 4px 6px 0px rgba(0, 0, 0, .4);
    }
    @media (max-width: 900px) {
        height: 20vw;
    }
    @media (max-width: 600px) {
        height: 30vw;
    }
`

export const Title = styled.div`
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
    color: #242424;
    line-height: 25px;
    /* height: 24px; */
    /* margin-bottom: 4px; */
    @media(max-width: 600px) {
        font-size: 20px;
    }
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
