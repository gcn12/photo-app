import firebase from 'firebase'

export const signout = () => {
    firebase.auth().signOut()
    .then(()=>null)
    .catch(error=>console.log(error))
}

export default signout