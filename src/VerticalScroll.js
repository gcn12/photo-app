import React from 'react'

const VerticalScroll = (props) => {
    return(
        <div style={{overflowY: 'scroll', height: '90vh'}}>
            {props.children}
        </div>
    )
}

export default VerticalScroll