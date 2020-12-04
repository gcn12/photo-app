import styled from 'styled-components'

export const Container = styled.div`
    /* margin: 0 2%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
    align-items: stretch;
    justify-items: center; */
    display: flex;
`

export const Card = styled.div`
    /* padding: 20px; */
    /* background-color: #f0f0f0; */
    width: 400px;
    height: 600px;
    border-radius: 6%;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
`

export const Image = styled.img`
    margin-bottom: 15px;
    filter: brightness(1);
    transition: 800ms ease;
    transition-delay: 250ms;
    object-fit: cover;
    width: 300px;
    height: 250px;
`

export const Description = styled.div`
    text-align: justify;
`