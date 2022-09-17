import { useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'

function FilterBar () {
    const navigate = useNavigate()
    const { id, filter } = useParams()
    const [sort, setSort] = useState( () => {
        if (filter) {
            return (`${filter}`)}
        else {
            return ("Index")
        } })

    const onChange = e => {
        e.preventDefault();
        setSort(e.target.value);
        const value = ((e.target.value).replace(" ", "-"));
        navigate("/search/playlist/" + id + "/" + value)
    }

    return (
    <div className="form-control">
        <div className="input-group container distance">
            <select className="select select-bordered" defaultValue={sort} onChange={e => onChange(e)} >
                <option disabled value={sort}>{sort}</option>
                <option value="Index">Index</option>
                <option value="Inverse-Index">Inverse Index</option>
                <option value="A-to-Z">A to Z</option>
                <option value="Z-to-A">Z to A</option>
            </select>
            <button className="btn">Go</button>
        </div>
    </div> )
}

export default FilterBar