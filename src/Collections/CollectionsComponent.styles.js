import styled from 'styled-components'

export const Container = styled.div`
    margin: 75px 200px 0 200px;
    @media(max-width: 700px) {
        margin: 75px 10px 0px 10px;
    }
`

export const CollectionName = styled.div`
    font-size: 30px;
`

export const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* grid-template-columns: repeat(3, auto); */
    grid-column-gap: 30px;
    
    justify-items: center;
    justify-content: center;
`

export const Title = styled.div`
    font-size: 40px;
    font-weight: 500;
`