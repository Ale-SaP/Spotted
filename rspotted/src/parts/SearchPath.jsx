import SimilarArtistsDisplay from "./artists/SimilarArtistsDisplay"
import NavBar from "./NavBar"
import {Route, Routes } from "react-router"
import TextScreen from "./TextScreen"
import PlaylistDisplay from "./playlists/PlaylistDisplay"

const SearchPath = () => { 
    return (
        <Routes>
            <Route>
                <Route path='/artist/' element={ <> <NavBar show={true} direction={"artist"} /> <TextScreen title="Make a search!"/></>}/>
                <Route path='/artist/:id' element={ <> <NavBar show={true} direction={"artist"} /> <SimilarArtistsDisplay/> </>} />
                <Route path='/playlist/' element={ <> <NavBar show={true} direction={"playlist"} /> <TextScreen title="Make a search!"/> </>} />
                <Route path='/playlist/:id' element={ <> <NavBar show={true} direction={"playlist"} /> <PlaylistDisplay/></>} />
            </Route>
            <Route path='*' element={ <> < NavBar />  <TextScreen title="404" text="Missing Page!"/> </>}  />
        </Routes> )}

export default SearchPath