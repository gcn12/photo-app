import React from 'react'
import './App.css'
import {
    Container,
    Image,
} from './TestFile.styles'

const GetPhotos = () => {

    return(
        <div style={{width: '60vw'}}>
            <Container>

                <Image src='https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/jason_redfield%2Fbest-of-iceland%2Fc162773?alt=media&token=9d0acc37-b9d6-4875-ac75-8be49fb9a0fa' />

                <Image src='https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/jason_redfield%2Fbest-of-iceland%2Fe600998?alt=media&token=f4a97904-fe1e-4f00-b1e8-21b085fd2195' />
   
                <Image src='https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/jason_redfield%2Fbest-of-iceland%2Fl286306?alt=media&token=eb5c4cf0-1532-4cde-84af-0bdcea6f608a' />
            </Container>
        </div>
    )
}

export default GetPhotos