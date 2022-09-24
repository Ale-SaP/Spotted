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
        navigate("/" + direction + "/" + searchTerm)
    }

    return (
        <div className="form-control">
            <div className="input-group input-group-lg container distance">
                <form method="GET" onSubmit={handleSubmit} >
                    <input id="artist-search" type="text" name="" placeholder="Search here..."
                        className='input input-bordered input-lg primary-content'
                        value={searchTerm} onChange={handleChange} />
                    <input className="btn input-lg" type="submit" value="OK" />
                </form>
            </div>
        </div>
    )
}

export default SearchBar