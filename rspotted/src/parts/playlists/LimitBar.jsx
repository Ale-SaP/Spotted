import { useState } from "react"

//Didnt consider it necesary to implement, if needed it can be added but routing must be changed.
export default function LimitBar( {limit} ) {
    const [pickedLimit, setPickedLimit] = useState( () => {
        if (limit) {
            return (limit)}
        else {
            return ("25")
        }
    } )

    // If there is a change in the selector, it redirects you to a new webpage, sorts and changes the disabled display (automatically)
    const onChange = e => {
        e.preventDefault();
        setPickedLimit(e.target.value)
    }

    return (
    <div className="form-control">
        <div className="input-group container distance">
        <select className="select select-bordered w-full max-w-xs" defaultValue={pickedLimit} onChange={e => onChange(e)} >
                <option disabled value={pickedLimit}>{pickedLimit}</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="1000">1000-All</option>
            </select>
        </div>
    </div> )
}