import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logSearch } from '../redux/searchRedux/searchSlice';
import { callApiId } from '../utils/methods';



function SearchBar() {
    //Basically, search term is updated every time it changes, but only on submit it is parsed through handleSubmit

    const [searchTerm, setSearch] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e)=> {
        e.preventDefault();

        //This makes the request to the api with the search term
        const a = await callApiId(searchTerm);

        //Dispatch is almost like the set function of a useState, in the way that we set a constant only by passing an argument through a function
        dispatch(logSearch(a));  
    }

    return (
        <div className="form-control">
            <div className="input-group">
                <form action="" method="GET" className="center" onSubmit={handleSubmit} >
                    <input id="artist-search" type="text" name="artist" placeholder="search here..." 
                    className='input input-bordered'
                    value={searchTerm} onChange={(e) => setSearch(e.target.value)} />
                    <input className = "btn btn-square" type="submit" value="OK" />
                </form>
            </div>
        </div>
    )
}

export default SearchBar