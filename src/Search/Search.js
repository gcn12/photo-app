import React, { useState, useEffect } from 'react'
import algoliasearch from 'algoliasearch'
import SearchResults from './SearchResults'
// import { ReactComponent as SearchIcon } from '../Icons/Search.svg'
import { Link } from 'react-router-dom'
import {
    ResultsContainer,
    Container,
    SearchBox,
} from './Search.styles'

const Search = () => {
    const [query, setQuery] = useState('')
    const [hits, setHits] = useState([])
    
    
    useEffect(()=> {
        const searchClient = algoliasearch(
            'VNSU9OYWB2',
            '6478d10ccc9941fe49a73aeb6ba2e73f'
        )
        const search = (querySearch) => {
            // setQuery(querySearch)
            const index = searchClient.initIndex('test_PHOTOAPP')
            if(query.length > 0) {
                index.search(query, {
                    attributesToRetrieve: ['title', 'country', 'image', 'username', 'url'],
                    hitsPerPage: 5,
                }).then(({ hits }) => {
                    console.log(hits);
                    if(hits.length>0) {
                        setHits([...hits])
                    }else{
                        setHits('No results')
                    }
                });
            }else{
                setHits([])
            }
        }
        const timeout = setTimeout(()=> search(query), 300)
        return ()=> clearTimeout(timeout)
    }, [query])


    return(
        <Container>
            <div style={{position: 'relative'}}>
                {/* <SearchIcon style={{position: 'absolute', top: '0', transform: 'scale(.8)'}}></SearchIcon> */}
                {/* <div style={{position: 'absolute', left: '10%'}}>search</div> */}
                <SearchBox placeholder='search' onChange={(e)=> setQuery(e.target.value)}></SearchBox>
            </div>
            {query.length > 0 ?
            <ResultsContainer>
            {hits === 'No results' ? 
            <div style={{padding: '15px'}}>No results</div>
            :
            <div>
                {hits.map((hit, index) => {
                    return(
                        <Link to={`/photo-app/post/${hit.username}/${hit.url}`} key={index} style={{ textDecoration: 'none' }}>
                            <SearchResults hit={hit}></SearchResults>
                        </Link>
                    )
                })}
                {hits.length > 3 ? 
                <div>More results</div>
                :
                null
                }
            </div>
            }
            </ResultsContainer>
            :
            null
            }
        </Container>
    )
}

export default Search