import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SavedPost from './SavedPost'
import { db } from '../Firebase'

const SavedPosts = (props) => {

    const [savedPostsData, setSavedPostsData] = useState([])

    useEffect(()=>{ 
        if(props.user) {
            db.collection('users')
            .doc(props.user)
            .collection('bookmarked')
            .orderBy('timestamp', 'desc')
            .get()
            .then(data => {
                let dataArray = []
                data.forEach(item=> {
                    dataArray.push(item.data())
                })
                setSavedPostsData(dataArray)
            })
            .catch(err=>console.log(err))
        }
    }, [props.user])

    return(
        <div>
            {savedPostsData.map((post, index) => {
                return(
                    <SavedPost index={index} savedPostsData={savedPostsData} setSavedPostsData={setSavedPostsData} post={post} key={index}></SavedPost>
                )
            })}
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user
})

export default connect(mapStateToProps)(SavedPosts)