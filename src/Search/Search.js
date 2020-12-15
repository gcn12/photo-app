import React, { useState } from 'react'
import algoliasearch from 'algoliasearch'
import SearchResults from './SearchResults'
import { Link } from 'react-router-dom'
import {
    ResultsContainer,
    Container,
} from './Search.styles'

const Search = () => {
    const [query, setQuery] = useState('')
    const [hits, setHits] = useState([])
    
    const searchClient = algoliasearch(
        'VNSU9OYWB2',
        '6478d10ccc9941fe49a73aeb6ba2e73f'
    )

    const search = (querySearch) => {
        setQuery(querySearch)
        const index = searchClient.initIndex('test_PHOTOAPP')
        index.search(querySearch, {
            attributesToRetrieve: ['title', 'country', 'image', 'username', 'url'],
            hitsPerPage: 5,
          }).then(({ hits }) => {
            console.log(hits);
            setHits([...hits])
          });
    }

    return(
        <Container>
            <input onChange={(e)=> search(e.target.value)}></input>
            {query.length > 0 ?
            <ResultsContainer>
            {hits.map((hit, index) => {
                return(
                    <Link to={`/photo-app/post/${hit.username}/${hit.url}`} key={index} style={{ textDecoration: 'none' }}>
                        <SearchResults hit={hit}></SearchResults>
                    </Link>
                )
            })}
            </ResultsContainer>
            :
            null
            }
        </Container>
    )
}

export default Search