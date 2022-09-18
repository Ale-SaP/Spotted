import { useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'

const FilterSearchBar = () => {
    const navigate = useNavigate()
    const { id, filter, term } = useParams()

    const [searchTerm, setSearch] = useState( () => {
        if (term) {return term}
        else {return ("")}
    });

    const handleChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
        if (filter) { navigate("/search/playlist/" + id + "/" + filter + "/Search/" + e.target.value) }
        else { navigate("/search/playlist/" + id + "/Index/Search/" + e.target.value) }
    }

    return (
        <div className="form-control">
            <div className="input-group container">
                <form method="GET" >
                    <input id="artist-search" type="text" name="" placeholder="Filter the songs!"
                        className='input input-bordered'
                        value={searchTerm} onChange={ e => handleChange(e)} onSubmit={ e => handleChange(e)} />
                </form>
            </div>
        </div>
    )
}

export default FilterSearchBar
