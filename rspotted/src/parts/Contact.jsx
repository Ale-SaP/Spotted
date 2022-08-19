//Main imports
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'

//Components
import MainArtist from "./MainArtist"
import RelatedArtist from "./RelatedArtists";

const callApi = async (call) => {
    const dataFromApi = await axios.get(`http://127.0.0.1:8000/api/artist/${call}`);
    return dataFromApi.data
}

function Contact() {

    console.log("Got here")
    const { id } = useParams();
    console.log("Got here too!")
    const { isLoading, error, data: webData } = useQuery(["webData"], callApi(id))

    //If the request was valid

    if (isLoading) {
        console.log("Loading!")
        return (
            <>
                <h4> Loading! </h4>
            </>
        )
    }

    if (error) {
        console.log(error)
        return (
            <>
                <h4> A </h4>
            </>
        )
    }
    
    if (webData) {
        console.log(webData)
        if (webData["success"]) {
            return (
                    <div className="center content">
                        <MainArtist artist={webData["original"]} />
                        {webData['related'].map(anyArtist => {
                            return (
                                <RelatedArtist artist={anyArtist} keyProp={anyArtist["id"]} />
                                )
                            })
                        }
                    </div>
            ) }
        else {
            return ( <div> <h3>{webData["error"]}</h3> </div> ) } }
    else {
        console.log("Something")
        return ( <div> <h3>No search has been made yet!</h3> </div> ) } }


export default Contact