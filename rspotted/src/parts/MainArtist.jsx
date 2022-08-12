function MainArtist({artist}) {

    return (
        <div className= "any-artist card">
            <div className="card-body">
                <div className="artist-name card-title" style={{background:"green", color:"whitesmoke"}}>
                    <h2 href={artist["url"]}> 
                        {artist["artistName"]}
                    </h2>
                </div>
                    <img src={artist["profilePic"]} alt="Whoops, an error ocurred!"/>
            </div>
        </div>
    )
}

export default MainArtist 