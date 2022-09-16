import { Navigate } from "react-router"
import SearchBar from "./SearchBar"

const NavBar = ( { show, direction } ) => {

    if (show) {
    return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl" style={{color:"green"}}  href={"http://localhost:3000/home"} 
            onClick={() => {return <Navigate to={"home/"}/>}}>
                Spotted!
            </a>
            <a style={{ color:"whitesmoke"}}>- Discover Music</a>
        </div>

        <div className="flex-2">
            <a className="btn btn-ghost normal-case text-x" style={{color:"whitesmoke"}} 
            onClick={() => {return <Navigate to={"search/artist"}/>}} href={"http://localhost:3000/search/artist"}>
                Related Artists
            </a>
            <a className="btn btn-ghost normal-case text-x" style={{color:"whitesmoke"}} 
            onClick={() => {return <Navigate to={"search/artist"}/>}} href={"http://localhost:3000/search/playlist"}>
                Playlists
            </a>
        </div>
        
        <div className="flex-3"><SearchBar show={show} direction={direction}/></div>
    </div>
) } }

export default NavBar

NavBar.defaultProps = {show: true}