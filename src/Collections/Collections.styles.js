import styled from 'styled-components'

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`

export const Ellipsis = styled.div`
    cursor: pointer;
`

export const Image = styled.img`
    height: ${props => props.height};
    width: ${props => props.width};
    object-fit: cover;
    float: left;
`

export const NoImage = styled.div`
    height: 268px;
    width: 268px;
    object-fit: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
`
 
export const ImagesContainer = styled.div`
    height: 270px;
    width: 270px;
    overflow: hidden;
    cursor: pointer;
`

export const Container = styled.div`
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* justify-content: space-between; */
    margin: 0 2%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
    align-items: stretch;
    justify-items: center;
`

export const ImageTitleContainer = styled.div`
    /* margin: 0 20px 20px 20px; */
    /* display: inline-block; */
    /* max-width: 100%; */
`







// import styled from 'styled-components'

// export const Header = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-end;
// `

// export const Ellipsis = styled.div`
//     cursor: pointer;
// `

// export const Image = styled.img`
//     height: ${props => props.height};
//     width: ${props => props.width};
//     object-fit: cover;
//     float: left;
// `

// export const NoImage = styled.div`
//     height: 268px;
//     width: 268px;
//     object-fit: cover;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border: 1px solid gray;
// `
 
// export const ImagesContainer = styled.div`
//     height: 270px;
//     width: 270px;
//     overflow: hidden;
//     cursor: pointer;
    
//     /* display: flex; */
//     /* flex-wrap: wrap; */
//     /* border-radius: 50%; */
// `

// export const Container = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     margin: 0 5%;
// `

// export const ImageTitleContainer = styled.div`
//     margin: 0 20px 20px 20px;
// `