import React, { useState } from 'react'
import firebase from 'firebase'
// import signout from './Signout'
import { 
    TextField, 
    SubmitButton,
    Text,
    Container,
    Container2,
} from './Login.styles'

const Login = (props) => {


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const submit = () => {
        if(email?.length > 0 && password?.length > 0){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                props.setUser(user.user.uid)
                props.setPageRoute('GetPhotos')
            })
            .catch(error=>console.log(error))
        }
    }

    return(
        <Container2>
            <Container>
                <Text>Email</Text>
                <TextField onChange={e => setEmail(e.target.value)}></TextField>
                <Text>Password</Text>
                <TextField onChange={e => setPassword(e.target.value)} type='password'></TextField>
                <SubmitButton onClick={submit}>Login</SubmitButton>
                <br></br>
                {/* <SubmitButton onClick={signout}>Signout</SubmitButton> */}
            </Container>
        </Container2>
    )
}

export default Login