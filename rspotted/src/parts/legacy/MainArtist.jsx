function MainArtist({artist}) {

    return (
    <div className="any-artist card">
        <div className="card-body">
        <h2 className="artist-name card-title" href={artist["url"]}> 
            {artist["artistName"]} 
        </h2>
        <figure>
            <img src={artist["profilePic"]} alt="Whoops, an error ocurred!" className=""/>
        </figure>
        </div>
    </div>
    )
}

export default MainArtist 