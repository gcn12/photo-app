import styled from 'styled-components'

export const Container = styled.div`
    overflow: none;
    opacity: ${props=> props.opacity ? 1 : 0};
    transition: opacity 700ms ease-in-out;
    margin-bottom: 25px;
`
 
 export const Card = styled.div`
    /* width: 350px; */
    width: 100%;
    min-height: 420px;
    /* background-color: #f5f5f5; */
    display: flex;
    flex-direction: column;
`

export const Image = styled.img`
    /* border-radius: 5px 5px 0 0; */
    cursor: pointer;
    margin-bottom: 10px;
    object-fit: cover;
    /* overflow:hidden; */
    /* width: 350px; */
    width: 100%;
    min-width: 320px;
    max-width: 400px;
    height: 250px;
    /* max-height: 230px; */
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    transition: box-shadow 300ms ease-in-out;
    &:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    }
`

export const Description = styled.div`
    text-align: justify;
    font-size: 17px;
    /* padding: 0 5%; */
    color: #3d3d3d;
    /* width: 350px; */
    width: 100%;
    min-width: 300px;
    max-width: 400px;
    /* height: 100px; */
`

export const Location = styled.div`
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 5px;
    /* padding: 0 5%; */
`

export const Name = styled.div`
    cursor: pointer;
    font-size: 15px;
    margin-top: 5px;
    /* padding: 0 5%; */
`

export const Title = styled.div`
    cursor: pointer;
    font-size: 30px;
    /* width: 120px; */
    /* padding: 0 5%; */
    &:hover{
        color: #4a4a4a;
    }
`

export const LocationNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`