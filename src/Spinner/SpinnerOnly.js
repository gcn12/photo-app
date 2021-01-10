import React from 'react'
import {
    Spinner,
    CenterSpinner,
} from './SpinnerOnly.styles'

const SpinnerOnly = (props) => {
    return(
        <CenterSpinner>
            <Spinner spinnerColor={props.spinnerColor} />
        </CenterSpinner>
    )
}

export default SpinnerOnly