import React from 'react'

const WithSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <div>Loading</div>
        )
            :
            (<WrappedComponent {...otherProps}/>)
    }
    return(
        Spinner
    )
}

export default WithSpinner