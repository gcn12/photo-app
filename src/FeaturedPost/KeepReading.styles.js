import styled from 'styled-components'

export const PostsContainer = styled.div`
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); */
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 32px;
    justify-items: center;
    justify-content: center;

    @media(max-width: 900px) {
        margin: 0px 12px;
        grid-template-columns: repeat(2, 1fr);
    }
`

export const MoreFromContainer = styled.div`
    display: flex;
    @media(max-width: 700px) {
        justify-content: center;
    }
`

export const ContentContainer = styled.div`
    margin: 0 5%;
    @media (max-width: 900px) {
        margin: 0 15%;
    }
    @media (max-width: 600px) {
        margin: 0 5%;
    }
`

export const Container = styled.div`
    @media(max-width: 720px) {
        margin-bottom: 40px;
    }
`