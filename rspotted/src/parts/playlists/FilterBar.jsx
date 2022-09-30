import { useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'

function FilterBar () {
    const navigate = useNavigate()
    const { id, filter, term} = useParams()

    // If there is no filter selected, defaults to Index in the disabled option
    const [pickedFilter, setPickedFilter] = useState( () => {
        if (filter) {
            return (filter)}
        else {
            return ("Index")
        } })
    
    // If there is a change in the selector, it redirects you to a new webpage, sorts and changes the disabled display (automatically)
    const onChange = e => {
        e.preventDefault();
        setPickedFilter(e.target.value)
        const value = ((e.target.value).replace(" ", "-"))
        if (term) {
            navigate("/playlist/" + id + "/" + value + "/" + term) }
        else {navigate("/playlist/" + id + "/" + value)}
    }

    return (
    <div className="form-control">
        <div className="input-group container distance">
        <select className="select select-bordered w-full max-w-xs" defaultValue={pickedFilter} onChange={e => onChange(e)} >
                <option disabled value={pickedFilter}>{pickedFilter}</option>
                <option value="Index">Index</option>
                <option value="Inverse-Index">Inverse Index</option>
                <option value="Tracks-A-to-Z">Tracks A to Z</option>
                <option value="Tracks-Z-to-A">Tracks Z to A</option>
                <option value="Artist-A-to-Z">Artist A to Z</option>
                <option value="Artist-Z-to-A">Artist Z to A</option>
                <option value="Release-Date+">Release Date +</option>
                <option value="Release-Date-">Release Date -</option>
            </select>
            <button className="btn">Go</button>
        </div>
    </div> )
}

export default FilterBar