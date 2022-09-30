import SimilarArtistsDisplay from "./artists/SimilarArtistsDisplay"
import NavBar from "./NavBar"
import {Route, Routes } from "react-router"
import TextScreen from "./TextScreen"
import PlaylistDisplay from "./playlists/PlaylistDisplay"
import SearchBar from "./SearchBar"

const Paths = () => { 
    return (
        <Routes>
            <Route path="/">
                <Route path="/artist">
                    <Route path='' element={ <> <NavBar direction={"artist"} /> <TextScreen title="Make a search!"/></>}/>
                    <Route path=':id' element={ <> <NavBar direction={"artist"} /> <SimilarArtistsDisplay/> </>} />
                </Route>

                <Route path="/playlist">

                    <Route path='' element={ 
                        <> 
                            <NavBar direction={"playlist"} /> 
                            <TextScreen title="Make a search!"/>  
                            <div className="container"><SearchBar direction="playlist"/></div> 
                        </>} />

                    <Route path=':id' element={ 
                    <> 
                        <NavBar direction={"playlist"} /> 
                        <PlaylistDisplay/>
                    </>} />

                    <Route path=':id/:filter' element={ 
                    <> 
                        <NavBar direction={"playlist"} /> 
                        <PlaylistDisplay/>
                    </>} />

                    <Route path=':id/:filter/:term' element={ 
                    <> 
                        <NavBar direction={"playlist"} /> 
                        <PlaylistDisplay/>
                    </>} />

                </Route>
            </Route>


            <Route path='*' element={ <> < NavBar />  <TextScreen title="404" text="Missing Page!"/> </>}  />
        </Routes> )}

export default Paths