import React from 'react'
import {
    BackgroundImage,
    Card,
} from './SingleLocation.styles'

const SingleLocation = () => {
    return(
        <div style={{position: 'relative'}}>
            <Card>
                Hello
            </Card>
            <BackgroundImage src='https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1969&q=80' />
        </div>
    )
}

export default SingleLocation