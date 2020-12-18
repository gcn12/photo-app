import styled from 'styled-components'

export const Container = styled.div`
    cursor: pointer;
    /* border-radius: 6%; */
    overflow: none;
    /* box-shadow: 0 1px 2px rgba(0, 0, 0, .4); */
    transition: box-shadow 400ms ease-in-out;
    margin-bottom: 15px;
    /* &:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, .4);
    } */
`
 
 export const Card = styled.div`
    width: 350px;
    height: 425px;
    /* background-color: #f5f5f5; */
    display: flex;
    flex-direction: column;
    /* align-items: center; */
`

export const Image = styled.img`
    /* border-radius: 5px 5px 0 0; */
    margin-bottom: 10px;
    object-fit: cover;
    width: 350px;
    height: 250px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    transition: box-shadow 400ms ease-in-out;
    &:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, .4);
    }
`

export const Description = styled.div`
    text-align: justify;
    font-size: 17px;
    /* padding: 0 5%; */
    color: #3d3d3d;
    width: 350px;
    height: 100px;
    /* overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */
`

export const Location = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
    /* padding: 0 5%; */
`

export const Name = styled.div`
    font-size: 15px;
    margin-top: 5px;
    /* padding: 0 5%; */
`

export const Title = styled.div`
    font-size: 30px;
    /* padding: 0 5%; */
`

export const LocationNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`