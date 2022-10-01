//Main imports
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from "@tanstack/react-query"

//Components
import AnyArtist from './AnyArtist';
import TextScreen from '../TextScreen';
import { callArtist } from '../../utils/methods';

function SimilarArtistsDisplay() {

    const queryClient = useQueryClient()

    const { id } = useParams();
    const {isLoading, isError, data, error} = useQuery(["webData", id], async () => {return (await callArtist(id))} )

    //If the request was valid

    if (isLoading) {
        return (
            <> <h4> Loading! </h4> </> ) }

    if (isError) {
        return ( 
            <> <h4> {error.message} </h4> </> ) }
    
    if (data["success"] === true) {
        return (
            <div className=''>
                <AnyArtist artist={data["original"]}/>

                {data['related'].map(anyArtist => {
                    return ( <AnyArtist artist={anyArtist} keyProp={anyArtist["id"]} />) } 
                    ) 
                }
            </div>
            ) }
    else {
        return ( <TextScreen title={"Whoops! The request was not valid."}
         text={"Perhaps the id was not valid or the playlist was not public."}/> )
    }
}



export default SimilarArtistsDisplay