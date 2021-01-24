import { db } from "./Firebase"

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

export const calculateLikeRatio = (docID) => {
    const collectionRef = db.collection('preview-posts').doc(docID)
    collectionRef.get()
    .then(info=> {
        const data = info.data()
        let ratio
        if(data.hearts > 0 && data.views > 0) {
            ratio = data.hearts / data.views
        }else{
            ratio = 0
        }
        collectionRef.update({
            ratio
        })
    })
}