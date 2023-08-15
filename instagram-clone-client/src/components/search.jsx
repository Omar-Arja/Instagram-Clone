import React, { useState, useEffect } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import SearchResults from './search-results';



const Search = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (debouncedSearch) {
            handleSearch();
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearch]);
    
    const handleSearch = async (e) => {

        try {
            const res = await axios.get(`http://localhost:8000/api/user/search/${search}`, { headers: {Authorization: localStorage.getItem('headers')} });
            setSearchResults(res.data.users);
        } catch (err) {
        }
    }


    return (
        <div className="search-container">
            <div className="search-bar">
                <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                {/* <button onClick={handleSearch}>Search</button>   */}
            </div>
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((user) => (<SearchResults key={user.id} {...user} />))}
                </div>
            )}
        </div>
    )
}

export default Search;