import React, { useState, useEffect } from 'react'
import algoliasearch from 'algoliasearch'
import SearchResults from './SearchResults'
// import { ReactComponent as SearchIcon } from '../Icons/Search.svg'
import { Link } from 'react-router-dom'
import {
    ResultsContainer,
    Container,
    SearchBox,
    MoreResults,
} from './Search.styles'

const Search = () => {
    const [query, setQuery] = useState('')
    const [hits, setHits] = useState([])
    const [showResults, setShowResults] = useState(false)
    
    
    useEffect(()=> {
        const searchClient = algoliasearch(
            'VNSU9OYWB2',
            '6478d10ccc9941fe49a73aeb6ba2e73f'
        )
        const search = (querySearch) => {
            // setQuery(querySearch)
            const index = searchClient.initIndex('test_PHOTOAPP')
            if(query.length > 0) {
                setShowResults(true)
                index.search(query, {
                    attributesToRetrieve: ['title', 'country', 'image', 'username', 'url', 'city'],
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

    window.onclick = (e) => {
        if (!e.target.matches('.search-results')) {
            setShowResults(false)
            if( document.getElementById('result-query-input')){
                document.getElementById('result-query-input').value = ''
            }
        }
    }

    const clearResults = () => {
        setShowResults(false)
        document.getElementById('result-query-input').value = ''
    }

    return(
        <Container>
            <div style={{position: 'relative'}} className='search-results'>
                {/* <SearchIcon style={{position: 'absolute', top: '0', transform: 'scale(.8)'}}></SearchIcon> */}
                {/* <div style={{position: 'absolute', left: '10%'}}>search</div> */}
                <SearchBox id='result-query-input' className='search-results' placeholder='search' onChange={(e)=> setQuery(e.target.value)}></SearchBox>
            </div>
            {query.length > 0 && showResults ?
            <ResultsContainer>
            {hits === 'No results' ? 
            <div style={{padding: '15px'}}>No results</div>
            :
            <div>
                {hits.map((hit, index) => {
                    return(
                        <Link onClick={clearResults} to={`/photo-app/post/${hit.username}/${hit.url}`} key={index} style={{ textDecoration: 'none' }}>
                            <SearchResults hit={hit}></SearchResults>
                        </Link>
                    )
                })}
                {hits.length > 3 ? 
                <MoreResults><div>More results</div></MoreResults>
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