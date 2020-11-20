import React from 'react'
import { db } from '../Firebase'
import { 
    Title
} from '../UserPosts/UserPosts.styles'

const Collections = (props) => {

    const getCollections = () => {
        db.collection('users')
        .doc(props.user)
        .collection('collections')
        // .doc('S5FkOS56afORkrIPJBbG')
        // .collection('collection-name')
        .where('Title', '==', 'Rome')
        .get()
        .then(collections=> {
            console.log(collections.docs)
            collections.docs.forEach(collection=> {
                console.log(collection.data())
            })
        })
    }

    return(
        <div>
            <Title>Collections</Title>
            <button onClick={getCollections}>Data</button>
        </div>
    )
}

export default Collections