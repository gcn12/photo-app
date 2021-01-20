import React from 'react'
import {
    ProgressContainer,
    UploadingTitle,
    CircleContainer,
} from './UploadProgress.styles'

const UploadProgress = (props) => {

    const radius = 52
    const stroke = 4
    const normalizedRadius = radius - stroke * 2
    const circumference = Math.PI * normalizedRadius * 2
    const strokeDashoffset = circumference - props.uploadProgress / props.uploadCount * circumference

    return(
        // <ProgressContainer visibility={props.variants[props.animate].opacity} animate={props.animate} variants={props.variants} initial='initial' transition='transition'>
        <ProgressContainer display={props.display}>
            <CircleContainer>
                {props.uploadProgressColor ? 
                <svg
                className="progress-ring"
                height={radius * 2}
                width={radius * 2}
                >
                <circle
                    className="progress-ring__circle progress-ring-circle-color"
                    strokeWidth={stroke}
                    strokeDasharray = {circumference + ' ' + circumference}
                    style = {{strokeDashoffset}}
                    stroke='green'
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                </svg>
                :
                <svg
                    className="progress-ring"
                    height={radius * 2}
                    width={radius * 2}
                    >
                    <circle
                        className="progress-ring__circle progress-ring-circle-color"
                        strokeWidth={stroke}
                        strokeDasharray = {circumference + ' ' + circumference}
                        style = {{strokeDashoffset}}
                        stroke='#242424'
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                }
            </CircleContainer>
                {props.uploadProgressColor ? 
                <UploadingTitle style={{color: 'green'}}>Upload succeeded</UploadingTitle>
                :
                <UploadingTitle className='shine'>Uploading...</UploadingTitle>
                }
        </ProgressContainer>
    )
}

export default UploadProgress