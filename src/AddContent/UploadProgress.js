import React from 'react'
import {
    ProgressContainer,
    UploadingTitle,
} from './UploadProgress.styles'

const UploadProgress = (props) => {

    const radius = 52
    const stroke = 4
    const normalizedRadius = radius - stroke * 2
    const circumference = Math.PI * normalizedRadius * 2
    // const strokeDashoffset = circumference - props.uploadProgress / 100 * circumference
    const strokeDashoffset = circumference - props.uploadProgress / props.uploadCount * circumference

    return(
        <ProgressContainer visibility={props.variants[props.animate].opacity} animate={props.animate} variants={props.variants} initial='initial' transition='transition'>
            {props.uploadProgressColor ? 
            <svg
            className="progress-ring"
            height={radius * 2}
            width={radius * 2}
            >
            <circle
                className="progress-ring__circle"
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
                    className="progress-ring__circle"
                    strokeWidth={stroke}
                    strokeDasharray = {circumference + ' ' + circumference}
                    style = {{strokeDashoffset}}
                    stroke='white'
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            }
            <UploadingTitle style={{color: props.uploadProgressColor ? 'green' : 'white'}}>{props.uploadProgressColor ? 'Upload succeeded' : 'Uploading...'}</UploadingTitle>
            {/* {props.uploadProgressColor ? 
            :
            <UploadingTitle>Uploading...</UploadingTitle>
            } */}
        </ProgressContainer>
    )
}

export default UploadProgress