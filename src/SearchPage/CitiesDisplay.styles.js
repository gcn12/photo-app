import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    margin-bottom: 2%;
    max-width: 400px;
`

export const ImageContainer = styled.div`
    max-width: 400px;
    border-radius: 15px;
    &::after {
        border-radius: 15px;
        display: block;
        position: relative;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, .9) 100%);
        margin-top: -190px;
        height: 185px;
        width: 100%;
        content: '';
    }
    /* &::after {
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, .6)
          100%
        );
    } */
`

export const Image = styled.img`
    border-radius: 15px;
    /* height: 160px;
    width: 300px; */
    width: 100%;
    max-width: 400px;
    height: 190px;
    object-fit: cover;
    /* position: relative; */
`

export const Location = styled.div`
    color: white;
    position: absolute;
    bottom: 4%;
    right: 5%;
    font-size: 20px;
    text-shadow: 0 1px 0 black;
`