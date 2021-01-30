import React, { useState } from 'react'
import firebase from 'firebase'
import { db } from '../Firebase'
import { 
    TextField, 
    SubmitButton,
    Text,
    Container,
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
                    // props.history.push('/photo-app/posts/popular/all')
                    props.setUser(user.user.id)
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        }
    }

    return(
        <Container>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button style={{fontSize: '48px', backgroundColor: 'transparent', border: 'none'}}>&times;</button>
            </div>
            <Text for='signup-name'>Name</Text>
            <TextField autoComplete='off' name='name' id='signup-name' onChange={e=> setName(e.target.value)}></TextField>
            <Text for='signup-email'>Email</Text>
            <TextField autoComplete='off' name='email' id='signup-email' onChange={e => setEmail(e.target.value)}></TextField>
            <Text for='signup-username'>Username</Text>
            <TextField autoComplete='off' name='username' id='signup-username' onChange={e=> setUsername(e.target.value)}></TextField>
            <Text for='signup-password'>Password</Text>
            <TextField autoComplete='off' name='password' id='signup-password' onChange={e=> setPassword(e.target.value)} type='password'></TextField>
            <br></br>
            <SubmitButton onClick={submit}>Signup</SubmitButton>
        </Container>
    )
}

export default Signup