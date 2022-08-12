import SearchBar from "./SearchBar"

const NavBar = ( props) => {
    return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl" style={{color:"green"}} href={"http://localhost:3000/"}>Spotted!</a>
            <a style={{ color:"whitesmoke"}} href={"http://localhost:3000/"} >- Discover Music</a>
        </div>
        <SearchBar/>
    </div>
) }

export default NavBar