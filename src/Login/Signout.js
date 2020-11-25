import firebase from 'firebase'

export const signout = () => {
    firebase.auth().signOut()
    .catch(error=>console.log(error))
}

export default signout