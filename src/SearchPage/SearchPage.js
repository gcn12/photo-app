import React from 'react'
import {

} from './SearchPage.styles'

const SearchPage = (props) => {
    return(
        <div style={{marginTop: '55px', marginLeft: '15px'}}>
            {props?.searchResults !== 'No results' ? 
            props?.searchResults?.map((item, index)=> {
                return(
                    item.name ? 
                    <div key={index}>{item.name}</div>
                    :
                    <div key={index}>{item.title}</div>
                )
            })
            :
            <div>
                <div>No results</div>
            </div>
            }
        </div>
    )
}

export default SearchPage