//Main imports
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from "@tanstack/react-query"

//Components
import AnyArtist from './AnyArtist';

const callApi = async (call) => {
    const dataFromApi = await axios.get(`http://127.0.0.1:8000/api/artist/${call}`);
    return dataFromApi.data
}

function Contact() {

    const queryClient = useQueryClient()

    const { id } = useParams();
    const {isLoading, isError, data, error} = useQuery(["webData", id], async () => {
        return (await callApi(id))} )

    //If the request was valid

    if (isLoading) {
        return (
            <> <h4> Loading! </h4> </> ) }

    if (isError) {
        return ( 
            <> <h4> {error.message} </h4> </> ) }
    
    if (data["success"] === true) {
        return (
            <div>
                <AnyArtist artist={data["original"]}/>

                {data['related'].map(anyArtist => {
                    return ( <AnyArtist artist={anyArtist} keyProp={anyArtist["id"]} />) } 
                    ) 
                }
            </div>
            ) }
}



export default Contact