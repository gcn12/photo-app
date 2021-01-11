import React from 'react'
import {
    Container,
    BackgroundImage,
    Login,
} from './NewLogin.styles'

const NewLogin = () => {
    return(
        <Container>
            <div>
                <Login>
                    Helloooirvo
                </Login>
                <BackgroundImage src='https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/daniel_johnson%2Fbest-of-iceland%2Fl730305?alt=media&token=c167b663-0679-4e35-b6b3-aa829b362a72' />
            </div>
            {/* <Blur /> */}
        </Container>
    )
}

export default NewLogin