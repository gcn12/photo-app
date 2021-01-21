import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import AdmiredPost from './AdmiredPost'
import { db } from '../Firebase'
import { ComponentContainer } from '../SavedPosts/SavedPost.styles'

const AdmiredPosts = (props) => {

    const [savedPostsData, setSavedPostsData] = useState([])

    useEffect(()=>{ 
        if(props.user) {
            db.collection('users')
            .doc(props.user)
            .collection('admired')
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
        <ComponentContainer>
            {savedPostsData.map((post, index) => {
                return(
                    <AdmiredPost index={index} savedPostsData={savedPostsData} setSavedPostsData={setSavedPostsData} post={post} key={index} />
                )
            })}
        </ComponentContainer>
    )
}

const mapStateToProps = state => ({
    user: state.app.user
})

export default connect(mapStateToProps)(AdmiredPosts)