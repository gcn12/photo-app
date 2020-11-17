import firebase from 'firebase/app'
import 'firebase/firestore'


const config = {
    apiKey: "AIzaSyDdoQaGgfQzmsXKHgytAROdzRjVaw_wE3M",
    authDomain: "photos-634e7.firebaseapp.com",
    databaseURL: "https://photos-634e7.firebaseio.com",
    projectId: "photos-634e7",
    storageBucket: "photos-634e7.appspot.com",
    messagingSenderId: "23335646481",
    appId: "1:23335646481:web:f6d39ff77620ebd80388b0",
    measurementId: "G-K4NLQYSDWM"
};

export const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore();
export { db };
export default firebase