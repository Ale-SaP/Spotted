import SimilarArtistsDisplay from "./artists/SimilarArtistsDisplay"
import NavBar from "./NavBar"
import {Route, Routes } from "react-router"
import TextScreen from "./TextScreen"
import PlaylistDisplay from "./playlists/PlaylistDisplay"

const SearchPath = () => { 
    return (
        <Routes>
            <Route>
                <Route path='/artist/' element={ <> <NavBar direction={"artist"} /> <TextScreen title="Make a search!"/></>}/>
                <Route path='/artist/:id' element={ <> <NavBar direction={"artist"} /> <SimilarArtistsDisplay/> </>} />
                
                <Route path='/playlist/' element={ <> <NavBar direction={"playlist"} /> <TextScreen title="Make a search!"/> </>} />
                <Route path='/playlist/:id' element={ <> <NavBar direction={"playlist"} /> <PlaylistDisplay/></>} />
                <Route path='/playlist/:id/:filter' element={ <> <NavBar direction={"playlist"} /> <PlaylistDisplay/></>} />
                <Route path='/playlist/:id/:filter/search/' element={ <> <NavBar direction={"playlist"} /> <PlaylistDisplay/></>} />
                <Route path='/playlist/:id/:filter/search/:term' element={ <> <NavBar direction={"playlist"} /> <PlaylistDisplay/></>} />
            </Route>
            <Route path='*' element={ <> < NavBar />  <TextScreen title="404" text="Missing Page!"/> </>}  />
        </Routes> )}

export default SearchPath