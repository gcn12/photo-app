import React, { useState, useEffect } from 'react'
import algoliasearch from 'algoliasearch'
import SearchResults from './SearchResults'
import UserResults from './UserResults'
import { Link } from 'react-router-dom'
import { ReactComponent as SearchIcon } from '../Icons/Search.svg'
import {
    ResultsContainer,
    Container,
    SearchBox,
    MoreResults,
    IconContainer,
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

        const search = () => {
            
            const queries = [{
                indexName: 'users',
                query: query,
                params: {
                    hitsPerPage: 2,
                    attributesToRetrieve: ['name', 'image', 'username', 'profileImage'],
                }
            }, {
                indexName: 'posts',
                query: query,
                params: {
                    hitsPerPage: 2,
                    attributesToRetrieve: ['title', 'country', 'image', 'username', 'url', 'city'],
                }
            }]

            if(query.length > 0) {
                setShowResults(true)

                searchClient.multipleQueries(queries).then(({ results }) => {
                    if(hits.length>0) {
                        let resultsArray = [...results[1].hits, ...results[0].hits]
                        console.log(results);
                        setHits(resultsArray)
                    }else{
                        setHits('No results')
                    }
                });
                
            }else{
                setHits([])
            }
        }
        const timeout = setTimeout(()=> search(), 300)
        return ()=> clearTimeout(timeout)
        // eslint-disable-next-line 
    }, [query])
    
    // useEffect(()=> {
    //     const searchClient = algoliasearch(
    //         'VNSU9OYWB2',
    //         '6478d10ccc9941fe49a73aeb6ba2e73f'
    //     )
    //     const search = (querySearch) => {
    //         // setQuery(querySearch)
    //         const index = searchClient.initIndex('posts')
    //         if(query.length > 0) {
    //             setShowResults(true)
    //             index.search(query, {
    //                 attributesToRetrieve: ['title', 'country', 'image', 'username', 'url', 'city'],
    //                 hitsPerPage: 5,
    //             }).then(({ hits }) => {
    //                 console.log(hits);
    //                 if(hits.length>0) {
    //                     setHits([...hits])
    //                 }else{
    //                     setHits('No results')
    //                 }
    //             });
    //         }else{
    //             setHits([])
    //         }
    //     }
    //     const timeout = setTimeout(()=> search(query), 300)
    //     return ()=> clearTimeout(timeout)
    // }, [query])

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

    document.addEventListener('keypress', e=> {
        const searchBox = document.getElementById('result-query-input')
        const isFocus = document.activeElement === searchBox
        console.log(isFocus)
        if(e.code==='Enter') {
            console.log('hello')
        }
    })

    return(
        <Container>
            <div style={{position: 'relative'}} className='search-results'>
            <IconContainer>
                <SearchIcon style={{position: 'absolute', top: '5', left: '5', transform: 'scale(.8)'}}></SearchIcon>
                {/* <SearchIcon style={{transform: 'scale(1)'}}></SearchIcon> */}
            </IconContainer>
                <div style={{position: 'absolute', left: '10%'}}></div>
                <SearchBox id='result-query-input' className='search-results' placeholder='search' onChange={(e)=> setQuery(e.target.value)}></SearchBox>
            </div>


            {query.length > 1 && showResults ?
            <ResultsContainer>
            {hits === 'No results' ? 
            <div style={{padding: '15px'}}>No results</div>
            :
            <div>
                {hits.map((hit, index) => {
                    return !hit.name ?(
                        <Link onClick={clearResults} to={`/photo-app/post/${hit.username}/${hit.url}`} key={index} style={{ textDecoration: 'none' }}>
                            <SearchResults hit={hit}></SearchResults>
                        </Link>
                    ) 
                    :
                    (
                    <Link onClick={clearResults} to={`/photo-app/profiles/${hit.username}`} key={index} style={{ textDecoration: 'none' }}>
                        <UserResults hit={hit}></UserResults>
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