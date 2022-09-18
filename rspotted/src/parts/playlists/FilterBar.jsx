import { useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import FilterSearchBar from './FilterSearchBar'

function FilterBar () {
    const navigate = useNavigate()
    const { id, filter, term} = useParams()

    // If there is no filter selected, defaults to Index in the disabled option
    const [pickedFilter, setPickedFilter] = useState( () => {
        if (filter) {
            return (`${filter}`)}
        else {
            return ("Index")
        } })
    
    // If there is a change in the selector, it redirects you to a new webpage, sorts and changes the disabled display (automatically)
    const onChange = e => {
        e.preventDefault();
        setPickedFilter(e.target.value)
        const value = ((e.target.value).replace(" ", "-"))
        if (term) {
            navigate("/search/playlist/" + id + "/" + value + "/Search/" + term) }
        else {navigate("/search/playlist/" + id + "/" + value)}
    }

    return (
    <div className="form-control">
        <div className="input-group container distance">
            <select className="select select-bordered" defaultValue={pickedFilter} onChange={e => onChange(e)} >
                <option disabled value={pickedFilter}>{pickedFilter}</option>
                <option value="Index">Index</option>
                <option value="Inverse-Index">Inverse Index</option>
                <option value="A-to-Z">A to Z</option>
                <option value="Z-to-A">Z to A</option>
            </select>
            <button className="btn">Go</button>
        </div>
        <FilterSearchBar />
    </div> )
}

export default FilterBar