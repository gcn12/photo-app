import styled from 'styled-components'

export const Container = styled.div`
    overflow: none;
    opacity: ${props=> props.opacity ? 1 : 0};
    transition: opacity 350ms ease-in-out;
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
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .3);
    transition: box-shadow 300ms ease-in-out;
    &:hover {
        box-shadow: 0 7px 7px 0 rgba(0, 0, 0, .5);
    }
`

export const Description = styled.div`
    /* text-align: justify; */
    font-size: 17px;
    line-height: 30px;
    font-weight: 400;
    /* padding: 0 5%; */
    color: #4D4D4D;
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
    /* border: 1px solid black; */
    border-radius: 1px;
    padding: 2px 7px;
    color: #f2f2f2;
    background-color: #242424;
    /* padding: 0 5%; */
`

export const Category = styled.div`
    text-transform: capitalize;
    margin-left: 10px;
    margin-bottom: 5px;
    font-size: 14px;
    border-radius: 1px;
    border: 1px solid black;
    padding: 2px 7px;
    color: black;
    /* background-color: #b6bdcf; */
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
    font-weight: 500;
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

export const BookmarkLocationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Ellipsis = styled.div`
    font-weight: 800;
    font-size: 20px;
`