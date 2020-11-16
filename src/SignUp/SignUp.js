import React, { useState } from 'react'
import firebase from 'firebase'
import { db } from '../Firebase'
import { 
    TextField, 
    SubmitButton,
    Text,
    Container,
    Container2,
} from '../Login/Login.styles'

const Signup = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const submit = () => {
        if(email?.length>0 && password?.length>0) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user=> {
                console.log(user.user.uid)
                db.collection('users').set({
                    username: user.user.uid
                })
            })
            .catch(err=>console.log(err))
        }
    }

    return(
        <Container2>
            <Container>
                <Text>Email</Text>
                <TextField onChange={e => setEmail(e.target.value)}></TextField>
                <Text>Password</Text>
                <TextField onChange={e=> setPassword(e.target.value)} type='password'></TextField>
                <SubmitButton onClick={submit}>Signup</SubmitButton>
            </Container>
        </Container2>
    )
}

export default Signup