import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function SearchBar( { direction } ) {

    const [searchTerm, setSearch] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    };

    const handleSubmit = (e) => {
        navigate("/search/" + direction + "/" + searchTerm)
    }

    return (
        <div className="form-control">
            <div className="input-group">
                <form method="GET" onSubmit={handleSubmit} >
                    <input id="artist-search" type="text" name="" placeholder="search here..."
                        className='input input-bordered'
                        value={searchTerm} onChange={handleChange} />
                    <input className="btn btn-square" type="submit" value="OK" />
                </form>
            </div>
        </div>
    )
}

export default SearchBar