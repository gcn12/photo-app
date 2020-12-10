import styled from 'styled-components'

export const Title = styled.div`
    /* color: white; */
    font-size: 25px;
`

export const Photo = styled.img`
    object-fit: cover;
    height: 180px;
    width: 180px;
    border-radius: 50%;
`

export const GearIcon = styled.img`
    position: absolute;
    left: 300;
    top: 100;
    transform: translate(270%, 10%);
    z-index: 0;
    visibility: ${props=> props.visibility};
    display: ${props=> props.display};
`

export const PostsContainer = styled.div`
    /* display: flex;
    flex-wrap: wrap;
    justify-content: space-between; */
    /* margin: 0 5%; */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    grid-gap: 20px;
    align-items: stretch;
    justify-items: center;
`

export const PostContainer = styled.div`
    height: 100%;
    width: 100%;
    margin: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* &:hover ${GearIcon} {
        visibility: visible;
        display: initial;
    } */
    ${props => props.shouldHover 
        ? `&:hover ${GearIcon} {
            visibility: visible;
            display: initial;
        }` 
        : ''
    }
`

export const PostTitle = styled.div`
    /* color: white; */
    font-size: 20px;
    justify-self: center;
`