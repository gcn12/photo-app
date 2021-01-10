import styled from 'styled-components'

export const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    /* grid-template-columns: repeat(3, auto); */
    grid-column-gap: 30px;
    /* margin: 0 10% 20px 10%; */
    justify-items: center;
    justify-content: center;

    @media(max-width: 700px) {
        margin: 100px 50px 0 50px;
    }
`

export const Text = styled.div`
    font-size: ${props=>props.size};
    font-weight: ${props=>props.weight};
`