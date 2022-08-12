import { useEffect, useState } from "react";
import MainArtist from "./MainArtist"
import RelatedArtist from "./RelatedArtists";
import { useSelector } from 'react-redux'

function Contact() {

    const [webData, setWebdata] = useState(null);

    //This is basically getting the search term using redux
    const search = useSelector(state => state.search.value)

    //Each time there is a search submit, it replaces the old webdata for the new data.
    useEffect(() => {
        if ( typeof(search) !== String) {
            setWebdata(search) }
        }, [search])

    //If the request was valid
    if (webData) {
        if (webData["success"]) {
            return (    
                <>
                    <div className="">
                        <MainArtist artist={webData["original"]} />
                        {webData['related'].map(anyArtist => {
                            return (
                                <RelatedArtist artist={anyArtist} keyProp={anyArtist["id"]} />
                            )
                        })
                        }
                    </div>
                </>
            ) }
        else {
            return (
                <div>
                    <h3>{webData["error"]}</h3>
                </div>
            ) }
    }
    else {
        return (
            <div>
                <h3>No search has been made yet!</h3>
            </div>
        )
    }
}


export default Contact