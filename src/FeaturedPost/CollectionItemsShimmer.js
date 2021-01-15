import React from 'react'
import { 
    CollectionShimmer, 
    CollectionNameShimmer,
    RemoveAddShimmer,
} from '../Dropdown/Dropdown.styles'

const CollectionItemsShimmer = () => {
    return(
        <CollectionShimmer>
            <CollectionNameShimmer className='shine' />
            <RemoveAddShimmer className='shine' />
        </CollectionShimmer>
    )
}

export default CollectionItemsShimmer