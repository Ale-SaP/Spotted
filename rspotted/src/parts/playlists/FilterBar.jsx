import { useState } from "react"

function FilterBar () {

    const [filter, setFilter] = useState("Index")

    const sortComponents = () => {
        console.log(filter)
    }

    return (
    <div className="form-control">
        <div className="input-group container distance">
            <select className="select select-bordered" onSelect={(e) => setFilter(e.value)} >
                <option disabled selected>{filter}</option>
                <option value="A to Z">A to Z</option>
                <option value="Z to A">Z to A</option>
                <option value="Index">Index</option>
                <option value="Inverse Index">Inverse Index</option>
            </select>
            <button className="btn" onSubmit={sortComponents()} >Go</button>
        </div>
    </div> )
}

export default FilterBar