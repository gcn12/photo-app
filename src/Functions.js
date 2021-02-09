import { db } from './Firebase'
import firebase from 'firebase'

export const testFunction = async () => {
    // const data = await db.collection('testCollection')
    // .where('field', '==', 'hello')
    // .get()
    // if(data) {
    //     return data
    // }
    return db.collection('testCollection')
    .where('field', '==', 'hello')
    .get()
}

export const unadmirePost = (firestorePostID, postID, userID) => {
    const ref = db.collection('users').doc(userID)
    ref.collection('hearts')
    .doc('hearts')
    .set({
        hearts: firebase.firestore.FieldValue.arrayRemove(firestorePostID)
    }, {merge: true}).then(()=> {
        db.collection('preview-posts').where('id', '==', firestorePostID)
        .get()
        .then(ref=> {
            if(ref.docs) {
                decrementHeartCount(ref.docs[0].ref.id)
            }
        })
    })
    ref.collection('admired')
    .where('postID', '==', postID)
    .get()
    .then(data=> {
        data.docs[0].ref.delete()
        .catch(err=>console.log(err))
    })
}

export const bookmarkPost = async (data, userID) => {
    setTimeout(()=>console.log("hello"), 1000)
    db.collection('users')
    .doc(userID)
    .collection('bookmarked')
    .add({
        ...data,
        timestamp: Date.now(),
    })
}

export const unbookmarkPost = async (postID, userID) => {
    db.collection('users')
    .doc(userID)
    .collection('bookmarked')
    .where('postID', '==', postID)
    .get()
    .then(data=> {
        data.docs[0].ref.delete()
    })
}

export const convertToUrl = (string) => {
    let url = string.trim()
    url = url.split(' ')
    url = url.join('-')
    url = url.toLowerCase()
    return url
}

export const addEllipsisToText = (text, finalLength) => {
    text = text.slice(0, finalLength)
    text = text.trim()
    if(text[text.length - 1] === '.') {
        return text
    }else{
        text = text.slice(0, finalLength - 3) 
        if(text[text.length - 1]=== '.') {
            return text
        }else{
            text += '...'
            return text
        }
    }
}

export const incrementViewCount = (docID) => {
    db.collection('pending-tasks')
    .doc('increment-view')
    .collection('increment-view')
    .add({
        id: docID
    })
    .then(()=>null)
}

export const incrementHeartCount = (docID) => {
    db.collection('pending-tasks')
    .doc('increment-heart')
    .collection('increment-heart')
    .add({
        id: docID
    })
    .then(()=>null)
}

export const decrementHeartCount = (docID) => {
    db.collection('pending-tasks')
    .doc('decrement-heart')
    .collection('decrement-heart')
    .add({
        id: docID
    })
    .then(()=>null)
}