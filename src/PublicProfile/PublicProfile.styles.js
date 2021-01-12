import styled from 'styled-components'

export const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow:  0 5px 5px 0px  rgba(0, 0, 0, .2);
    @media(max-width: 700px) {
        margin-top: 10px;
    }
`

export const Container = styled.div`
    width: 250px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 20px 0 20px;
    border-radius: 3px;
    margin: 20px 30px 0px 30px;
`

export const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    /* grid-template-columns: repeat(3, auto); */
    grid-column-gap: 20px;
    margin: 0 50px 20px 340px;
    justify-items: end;
    justify-content: end;

    @media(max-width: 700px) {
        margin: 30px 50px 0 50px;
    }
`

export const UserContainer = styled.div`
    opacity: ${props=>props.visibility};
    margin-top: 30px;
    /* width: 250px; */
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;

    @media(max-width: 700px) {
        position: initial;
    }
`

export const Username = styled.div`
    /* font-family: montserrat; */
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 10px;

    white-space: pre-wrap;    
    white-space: -moz-pre-wrap;    
    white-space: -pre-wrap;       
    white-space: -o-pre-wrap;     
    word-wrap: break-word; 
`

export const Name = styled.div`
    /* font-family: montserrat; */
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 30px;
    display: inline-block;
    white-space: nowrap;
    /* white-space: pre-wrap;    
    white-space: -moz-pre-wrap;    
    white-space: -pre-wrap;       
    white-space: -o-pre-wrap;     
    word-wrap: break-word;  */
`


export const Bio = styled.div`
    /* font-family: montserrat; */
    font-weight: 500;
    font-size: 17px;
    line-height: 25px;
    vertical-align: middle; 
    text-align: center;
    margin-bottom: 20px;
`

export const EditButton = styled.button`
    height: auto;
    width: auto;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid black;
    padding: 5px 10px;
    cursor: pointer; 
    /* height: 140px;
    width: 180px;
    font-size: 20px;
    border-radius: 5px;
    background-color: transparent; */
`