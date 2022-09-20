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
        if (filter) { navigate("/playlist/" + id + "/" + filter + "/" + e.target.value) }
        else { navigate("/playlist/" + id + "/Index/" + e.target.value) }
    }

    return (
        <div className="">
            <div className="container">
                <form method="GET" >
                    <input id="artist-search" type="text" name="" placeholder="Filter the songs!"
                        className="input input-bordered input-md w-full max-w-xs"  
                        value={searchTerm} onChange={ e => handleChange(e)} onSubmit={ e => handleChange(e)} />
                </form>
            </div>
        </div>
    )
}

export default FilterSearchBar
