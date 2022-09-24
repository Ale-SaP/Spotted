import { Navigate } from "react-router"

const NavBar = ( { show } ) => {

    if (show) {
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
            <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a className="text-[#FFFFFF]" onClick={() => {return <Navigate to={"/home"}/>}} href={"http://localhost:3000/home"}>Home</a></li>
                <li><a className="text-[#FFFFFF]" onClick={() => {return <Navigate to={"/artist"}/>}} href={"http://localhost:3000/artist"}>Related Artists</a></li>
                <li><a className="text-[#FFFFFF]" onClick={() => {return <Navigate to={"/playlist"}/>}} href={"http://localhost:3000/playlist"}>Playlists</a></li>
            </ul>
            </div>
        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-xl bg-green-500 text-[#000000]"
            onClick={() => {return <Navigate to={"/home"}/>}} href={"http://localhost:3000/home"} >Spotted</a>
        </div>
        <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            <button className="btn btn-ghost btn-circle">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/80/80/tech" href={"http://localhost:3000/your_profile"} alt={"Error"}/>
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between" href={"http://localhost:3000/your_profile"}>
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                    <li>
                        <a href={"http://localhost:3000/your_profile"} >Logout</a>
                    </li>
                    </ul>
                </div>
            </button>
        </div>
    </div>
) } }

export default NavBar

NavBar.defaultProps = {show: true}