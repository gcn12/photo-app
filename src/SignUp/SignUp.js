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

const Signup = (props) => {

    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()

    const submit = () => {
        if(email?.length>0 && password?.length>0) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user=> {
                console.log(user.user.uid)
                db.collection('users').doc(user.user.uid).set({
                    id: user.user.uid,
                    username,
                    name,
                    profileImage: null,
                    bio: null,
                }, {merge: true})
                .then(()=> {
                    console.log('sign up complete')
                    props.setPageRoute('GetPhotos')
                    props.setUser(user.user.id)
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        }
    }

    return(
        <Container2>
            <Container>
                <Text>Name</Text>
                <TextField onChange={e=> setName(e.target.value)}></TextField>
                <Text>Email</Text>
                <TextField onChange={e => setEmail(e.target.value)}></TextField>
                <Text>Username</Text>
                <TextField onChange={e=> setUsername(e.target.value)}></TextField>
                <Text>Password</Text>
                <TextField onChange={e=> setPassword(e.target.value)} type='password'></TextField>
                <SubmitButton onClick={submit}>Signup</SubmitButton>
            </Container>
        </Container2>
    )
}

export default Signup